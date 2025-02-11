<?php
/**
 * The DovetailPodcasts Dovetail API class.
 *
 * @package DovetailPodcasts\Dovetail
 */

namespace DovetailPodcasts\Dovetail;

use Defuse\Crypto\Crypto;
use Defuse\Crypto\Key;

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

		$access_token = wp_cache_get( 'access_token', DTPODCASTS_CACHE_GROUP );

		if ( empty( $access_token ) ) {
			$api_url = "https://{$this->id_domain}/token";
			$api_url = add_query_arg(
				[
					'grant_type'    => 'client_credentials',
					'client_id'     => $this->client_key,
					'client_secret' => $this->client_secret,
				],
				$api_url
			);
			$data    = $this->post( $api_url );

			if ( is_array( $data ) && isset( $data['access_token'] ) ) {
				$access_token = $data['access_token'];
				wp_cache_set( 'access_token', Crypto::encrypt( $access_token, $this->key ), DTPODCASTS_CACHE_GROUP, 60 * 60 - 10 );
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
	 * @return array<string,mixed>
	 */
	public function get_user_info() {
		$api_url = "https://{$this->id_domain}/userinfo";
		return $this->get( $api_url );
	}

	/**
	 * Get information about user the client application belongs to.
	 *
	 * @return array<string,mixed>
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
	 * Internal method to send API requests.
	 *
	 * @param string $api_url API URL to request.
	 * @return mixed
	 */
	private function get( string $api_url ) {

		$api_response = wp_remote_get( $api_url, $this->get_http_args() );

		return $this->parse_body( $api_response );
	}

	/**
	 * Internal method to send API requests.
	 *
	 * @param string $api_url API URL to request.
	 * @return mixed
	 */
	private function post( string $api_url ) {

		$api_response = wp_remote_post( $api_url, $this->get_http_args() );

		return $this->parse_body( $api_response );
	}

	/**
	 * Get arguments array that should be passed to WP_Http methods.
	 *
	 * @return array<string,mixed>
	 */
	private function get_http_args() {
		$args = [];

		if ( $this->access_token ) {
			$args['headers'] = [
				'Authorization' => "Bearer: {$this->access_token}",
				'Content-Type'  => 'application/json',
				'User-Agent'    => 'Dovetail Podcasts/' . DTPODCASTS_VERSION,
			];
		}

		return $args;
	}

	/**
	 * Parse body from API response.
	 *
	 * @param array<string,mixed> $api_response Response array from WP_Http methods.
	 * @return mixed
	 */
	private function parse_body( $api_response ) {
		if ( is_wp_error( $api_response ) ) {
			return false;
		}

		$status   = wp_remote_retrieve_response_code( $api_response );
		$api_body = false;

		if ( 200 === $status ) {
			$api_body = json_decode( wp_remote_retrieve_body( $api_response ), true );
		}

		return $api_body;
	}
}
