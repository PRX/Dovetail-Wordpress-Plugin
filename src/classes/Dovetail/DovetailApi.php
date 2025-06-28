<?php
/**
 * The DovetailPodcasts Dovetail API class.
 *
 * @package DovetailPodcasts\Dovetail
 */

namespace DovetailPodcasts\Dovetail;

use Defuse\Crypto\Crypto;
use Defuse\Crypto\Key;
use DovetailPodcasts\Utils\Utils;

/**
 * Dovetail API class
 *
 * @package DovetailPodcasts\Dovetail\DovetailApi
 */
class DovetailApi {

	/**
	 * Encryption key.
	 *
	 * @var \Defuse\Crypto\Key
	 */
	private $key;

	/**
	 * Dovetail Id domain.
	 *
	 * @var string
	 */
	private $id_domain;

	/**
	 * Dovetail Feeder domain.
	 *
	 * @var string
	 */
	private $feeder_domain;

	/**
	 * Client key.
	 *
	 * @var string
	 */
	private $client_key;

	/**
	 * Client secret.
	 *
	 * @var string
	 */
	private $client_secret;

	/**
	 * Current API access token.
	 *
	 * @var string
	 */
	private $access_token;

	/**
	 * Flag for presence of client credentials.
	 *
	 * @var bool
	 */
	public $has_client_credentials = false;

	/**
	 * Class construct.
	 */
	public function __construct() {
		$wp_environment_type = 'production';
		if ( function_exists( 'wp_get_environment_type' ) ) {
			$wp_environment_type = wp_get_environment_type();
		}

		$this->id_domain     = 'production' === $wp_environment_type ? 'id.prx.org' : 'id.staging.prx.tech';
		$this->feeder_domain = 'production' === $wp_environment_type ? 'feeder.prx.org' : 'feeder.staging.prx.tech';

		$key_ascii          = get_option( 'dovetail_podcasts_key' );
		$client_credentials = get_option( DTPODCASTS_SETTINGS_SECTION_PREFIX . 'authentication' );

		if ( is_array( $client_credentials ) && ! empty( $key_ascii ) ) {
			$this->key                    = Key::loadFromAsciiSafeString( $key_ascii );
			$this->client_key             = Crypto::decrypt( $client_credentials['client_key'], $this->key );
			$this->client_secret          = Crypto::decrypt( $client_credentials['client_secret'], $this->key );
			$this->access_token           = $this->get_access_token();
			$this->has_client_credentials = true;
		}

		$this->init();
	}

	/**
	 * Initialize actions and filters.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'rest_api_init', [ $this, 'rest_api_init' ] );
	}

	/**
	 * Initialize REST API routes.
	 *
	 * @return void
	 */
	public function rest_api_init() {

		register_rest_route(
			DTPODCASTS_API_ROUTE_BASE,
			'episodes/(?P<id>[a-f0-9-]+)',
			[
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'rest_get_episode' ],
				'permission_callback' => '__return_true',
				'args'                => [],
			]
		);
	}

	/**
	 * REST API callback to get episode by id.
	 *
	 * @param \WP_REST_Request $request REST request object with `id` parameter.
	 * @return \WP_REST_Response
	 */
	public function rest_get_episode( \WP_REST_Request $request ) {

		$id                  = $request->get_param( 'id' );
		list( $data, $resp ) = $this->get_episode( $id );
		$return              = false;

		if ( is_array( $data ) && ! empty( $data ) ) {
			$return = [
				'id'              => $data['id'],
				'enclosure'       => $data['_links']['enclosure'],
				'uncut'           => isset( $data['uncut'] ) ? $data['uncut'] : null,
				'media'           => $data['media'],
				'itunesType'      => $data['itunesType'],
				'explicitContent' => $data['explicitContent'],
				'explicit'        => isset( $data['explicit'] ) ? 'true' === $data['explicit'] : $data['explicitContent'],
				'seasonNumber'    => isset( $data['seasonNumber'] ) ? $data['seasonNumber'] : null,
				'episodeNumber'   => isset( $data['episodeNumber'] ) ? $data['episodeNumber'] : null,
				'cleanTitle'      => isset( $data['cleanTitle'] ) ? $data['cleanTitle'] : null,
				'author'          => isset( $data['author'] ) && ! empty( $data['author'] ) ? $data['author'] : null,
			];
		}

		return $this->rest_response( $return, $resp );
	}

	/**
	 * Create REST response.
	 *
	 * @param array<string,mixed>|false $data REST response data.
	 * @param array<string,mixed>       $api_response Response array from WP_Http methods.
	 * @return \WP_REST_Response|\WP_Error
	 */
	private function rest_response( $data, $api_response ) {
		$status = wp_remote_retrieve_response_code( $api_response );

		if ( $data ) {
			return new \WP_REST_Response( $data, $status );
		}

		return new \WP_Error( 'rest_no_route', __( 'Not Found.', 'dovetail-podcasts' ), $api_response );
	}

	/**
	 * Get access token from Dovetail API.
	 *
	 * @return string
	 */
	private function get_access_token() {

		if ( ! $this->key ) {
			return false;
		}

		$transient_key = DTPODCASTS_CACHE_GROUP . '_access_token';
		$access_token  = get_transient( $transient_key );

		if ( empty( $access_token ) ) {
			$api_url      = "https://{$this->id_domain}/token";
			$api_url      = add_query_arg(
				[
					'grant_type'    => 'client_credentials',
					'client_id'     => $this->client_key,
					'client_secret' => $this->client_secret,
				],
				$api_url
			);
			list( $data ) = $this->post( $api_url );

			if ( is_array( $data ) && isset( $data['access_token'] ) ) {
				$access_token = $data['access_token'];
				set_transient( $transient_key, Crypto::encrypt( $access_token, $this->key ), HOUR_IN_SECONDS - MINUTE_IN_SECONDS );
			}
		} else {
			$access_token = Crypto::decrypt( $access_token, $this->key );
		}

		return $access_token;
	}

	/**
	 * Determine if client credentials in settings are valid.
	 *
	 * @return bool
	 */
	public function has_valid_client_credentials() {
		$access_token = $this->access_token;

		if ( ! $access_token ) {
			$access_token = $this->get_access_token();
		}

		return $this->has_client_credentials && ! empty( $access_token );
	}

	/**
	 * Get information about user the client application belongs to.
	 *
	 * @return array<int,array<string,mixed>|false>
	 */
	public function get_user_info() {
		$api_url = "https://{$this->id_domain}/userinfo";
		return $this->get( $api_url );
	}

	/**
	 * Get collection of podcasts user has access to.
	 *
	 * @return array<int,array<string,mixed>|false>
	 */
	public function get_podcasts() {
		$api_url = "https://{$this->feeder_domain}/api/v1/authorization/podcasts";
		$api_url = add_query_arg(
			[
				'per' => 999,
			],
			$api_url
		);
		return $this->get( $api_url );
	}

	/**
	 * Get a specific podcast by id.
	 *
	 * @param int $id Dovetail podcast id.
	 * @return array<int,array<string,mixed>|false>
	 */
	public function get_podcast( int $id ) {
		$api_url = "https://{$this->feeder_domain}/api/v1/authorization/podcasts/{$id}";
		return $this->get( $api_url );
	}

	/**
	 * Get collection of episodes belonging to a podcast.
	 *
	 * @param int $id Dovetail podcast id.
	 * @return array<int,array<string,mixed>|false>
	 */
	public function get_podcast_episodes( int $id ) {
		$api_url = "https://{$this->feeder_domain}/api/v1/authorization/podcasts/{$id}/episodes";
		return $this->get( $api_url );
	}

	/**
	 * Get collection of episodes belonging to a podcast, published on a specific date.
	 *
	 * @param int    $id Dovetail podcast id.
	 * @param string $publish_date Date episodes are published on.
	 * @return array<int,array<string,mixed>|false>
	 */
	public function get_podcast_episodes_by_publish_date( int $id, string $publish_date = null ) {
		$api_url = "https://{$this->feeder_domain}/api/v1/authorization/podcasts/{$id}/episodes";
		$on_date = $publish_date ? new \DateTime( $publish_date, new \DateTimeZone( 'GMT' ) ) : new \DateTime( 'now', new \DateTimeZone( 'GMT' ) );
		$one_day = new \DateInterval( 'P1D' );
		$after   = $on_date->format( 'Y-m-d' );
		$before  = $on_date->add( $one_day )->format( 'Y-m-d' );

		$api_url = add_query_arg(
			[
				'after'  => $after,
				'before' => $before,
			],
			$api_url
		);

		return $this->get( $api_url );
	}

	/**
	 * Get collection of episodes belonging to a podcast, published on a specific date, with a specific title.
	 *
	 * @param int    $id Dovetail podcast id.
	 * @param string $publish_date Date episodes are published on.
	 * @param string $title Title of episode.
	 * @return array<int,array<string,mixed>|false>
	 */
	public function get_podcast_episodes_by_publish_date_and_title( int $id, string $publish_date, string $title ) {
		$episode_api = false;

		// Dovetail API only has publish date filtering for podcast episodes.
		// Fetch episodes published on post's publish data,...
		list( $episodes_api, $api_response ) = $this->get_podcast_episodes_by_publish_date( $id, $publish_date );

		if (
			$episodes_api &&
			is_array( $episodes_api ) &&
			isset( $episodes_api['_embedded']['prx:items'] ) &&
			! empty( $episodes_api['_embedded']['prx:items'] )
		) {
			// ...then filter them by title.
			$matches = array_filter(
				$episodes_api['_embedded']['prx:items'],
				static function ( $episode ) use ( $title ) {
					// ????: Filter title by whole value match, contains, or starts-with. 🤔?
					return $episode['title'] === $title;
				}
			);

			// Only consider single match an accurate result.
			if ( 1 === count( $matches ) ) {
				$episode_api = $matches[0];
			}
		}

		return [ $episode_api, $api_response ];
	}

	/**
	 * Get a specific episode by id.
	 *
	 * @param string $id Dovetail episode id.
	 * @return array<int,array<string,mixed>|false>
	 */
	public function get_episode( string $id ) {
		$api_url = "https://{$this->feeder_domain}/api/v1/authorization/episodes/{$id}";
		return $this->get( $api_url );
	}

	/**
	 * Delete a specific episode by id.
	 *
	 * @param string $id Dovetail episode id.
	 * @return array<string,mixed>
	 */
	public function delete_episode( string $id ) {
		$api_url = "https://{$this->feeder_domain}/api/v1/authorization/episodes/{$id}";
		return $this->delete( $api_url );
	}

	/**
	 * Update a specific episode by id.
	 *
	 * @param string              $id Dovetail episode id.
	 * @param array<string,mixed> $data Dovetail episode data.
	 * @return array<int,array<string,mixed>|false>
	 */
	public function update_episode( string $id, array $data ) {
		$api_url = "https://{$this->feeder_domain}/api/v1/authorization/episodes/{$id}";

		// Strip props we don't want to risk overriding.
		// Dovetail API should already protect from this, but things have been know to happen.
		unset( $data['guid'] );
		unset( $data['id'] );
		unset( $data['enclosure'] );

		return $this->put( $api_url, $data );
	}

	/**
	 * Create a episode.
	 *
	 * @param string              $id Dovetail podcast id.
	 * @param array<string,mixed> $data Dovetail episode data.
	 * @return array<int,array<string,mixed>|false>
	 */
	public function create_podcast_episode( string $id, array $data ) {
		$api_url = "https://{$this->feeder_domain}/api/v1/authorization/podcasts/{$id}/episodes";

		// Make sure episode is created with a sanitized guid.
		$data['guid'] = $this->sanitize_guid( $data['guid'] );

		// Strip props we don't want to risk overriding.
		// Dovetail API should already protect from this, but things have been know to happen.
		unset( $data['id'] );
		unset( $data['enclosure'] );

		// TODO: Set `medium = 'uncut'`.
		$data['segmentCount'] = 1;

		return $this->post( $api_url, $data );
	}

	/**
	 * Get a specific episode by guid.
	 *
	 * @param int    $id Dovetail podcast id.
	 * @param string $guid Dovetail episode guid.
	 * @return array<int,array<string,mixed>|false>
	 */
	public function get_podcast_episode_by_guid( int $id, string $guid ) {
		// Query for episode using sanitized and url encoded guid.
		$guid    = rawurlencode( $this->sanitize_guid( $guid ) );
		$api_url = "https://{$this->feeder_domain}/api/v1/authorization/podcasts/{$id}/guids/{$guid}";

		return $this->get( $api_url );
	}

	/**
	 * Saves episode data to Dovetail.
	 *
	 * @param int                 $podcast_id Id of podcast new episode should be added to.
	 * @param array<string,mixed> $data Episode data to save.
	 * @return array<string,mixed>|false
	 */
	public function save_episode( int $podcast_id, array $data ) {
		if ( ! $data || empty( $data ) ) {
			return $data;
		}

		// Store id before it is stripped from request data.
		$id = isset( $data['id'] ) ? $data['id'] : null;

		// Strip props we don't want to risk overriding.
		// Dovetail API should already protect from this, but things have been know to happen.
		unset( $data['id'] );
		unset( $data['enclosure'] );

		if ( ! $id ) {
			return $this->create_podcast_episode( $podcast_id, $data );
		} else {
			return $this->update_episode( $id, $data );
		}
	}

	/**
	 * WordPress stores the guid as a html encoded string (`&` is stored as `&#038;`).
	 * API behavior should mimic the Dovetail RSS importer, using the decoded string when working with GUIDs.
	 *
	 * @param string $guid Raw guid string from database.
	 * @return string
	 */
	public function sanitize_guid( string $guid ) {
		return html_entity_decode( $guid, ENT_QUOTES | ENT_XML1, 'UTF-8' );
	}

	/**
	 * Internal method to send API GET requests.
	 *
	 * @param string $api_url API URL to request.
	 * @return array<int,array<string,mixed>|false>
	 */
	private function get( string $api_url ) {

		$api_response = wp_remote_get( $api_url, $this->get_http_args() );

		return $this->parse_body( $api_response );
	}

	/**
	 * Internal method to send API POST requests.
	 *
	 * @param string              $api_url API URL to request.
	 * @param array<string,mixed> $body Body to send with the request. Default null.
	 * @return array<int,array<string,mixed>|false>
	 */
	private function post( string $api_url, array $body = null ) {
		$args         = [
			'body' => wp_json_encode( $body ),
		];
		$api_response = wp_remote_post( $api_url, $this->get_http_args( $args ) );

		return $this->parse_body( $api_response );
	}

	/**
	 * Internal method to send API PUT requests.
	 *
	 * @param string              $api_url API URL to request.
	 * @param array<string,mixed> $body Body to send with the request. Default null.
	 * @return array<int,array<string,mixed>|false>
	 */
	private function put( string $api_url, array $body = null ) {
		$args         = [
			'method' => 'PUT',
			'body'   => wp_json_encode( $body ),
		];
		$api_response = wp_remote_request( $api_url, $this->get_http_args( $args ) );

		return $this->parse_body( $api_response );
	}

	/**
	 * Internal method to send API DELETE requests.
	 *
	 * @param string $api_url API URL to request.
	 * @return bool True on success. False on failure.
	 */
	private function delete( string $api_url ) {
		$args         = [
			'method' => 'DELETE',
		];
		$api_response = wp_remote_request( $api_url, $this->get_http_args( $args ) );
		$status       = wp_remote_retrieve_response_code( $api_response );

		return 204 === $status;
	}

	/**
	 * Get arguments array that should be passed to WP_Http methods.
	 *
	 * @param array<mixed,mixed> $args Array to be merged.
	 * @return array<string,mixed>
	 */
	private function get_http_args( array $args = [] ) {
		$new_args = [];

		if ( $this->access_token ) {
			$new_args['headers'] = [
				'Authorization' => "Bearer: {$this->access_token}",
				'Content-Type'  => 'application/json',
				'User-Agent'    => 'Dovetail Podcasts/' . DTPODCASTS_VERSION,
			];
		}

		return Utils::recursive_array_merge( $new_args, $args );
	}

	/**
	 * Parse body from API response.
	 *
	 * @param array<string,mixed> $api_response Response array from WP_Http methods.
	 * @return array<int,array<string,mixed>|false>
	 */
	private function parse_body( $api_response ) {
		if ( is_wp_error( $api_response ) ) {
			return [ false, $api_response ];
		}

		$status   = wp_remote_retrieve_response_code( $api_response );
		$api_body = false;

		if ( 200 <= $status && 300 > $status ) {
			$api_body = json_decode( wp_remote_retrieve_body( $api_response ), true );
		}

		return [ $api_body, $api_response ];
	}
}
