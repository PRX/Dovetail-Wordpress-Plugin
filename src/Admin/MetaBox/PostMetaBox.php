<?php
/**
 * The DovetailPodcasts PostMetaBox class.
 *
 * @package DovetailPodcasts\Admin\MetaBox
 */

namespace DovetailPodcasts\Admin\MetaBox;

use DovetailPodcasts\Admin\Settings\SettingsApi;
use DovetailPodcasts\Dovetail\DovetailApi;

/**
 * PostMetaBox class
 *
 * @package DovetailPodcasts\Admin\MetaBox
 */
class PostMetaBox {

	/**
	 * Id of element metabox app will be rendered into.
	 */
	public const APP_CONTAINER_ID = 'dovetail-podcast--podcast-episode-metabox';

	/**
	 * Settings API instance.
	 *
	 * @var \DovetailPodcasts\Admin\Settings\SettingsApi
	 */
	public $settings_api;

	/**
	 * Dovetail Api instance.
	 *
	 * @var \DovetailPodcasts\Dovetail\DovetailApi
	 */
	public $api;

	/**
	 * Configured post types the metabox should be shown on.
	 *
	 * @var array<string,string>
	 */
	public $post_types;

	/**
	 * Current post object.
	 *
	 * @var \WP_Post
	 */
	public $post;

	/**
	 * Initialize settings.
	 *
	 * @return void
	 */
	public function init() {
		$this->settings_api = new SettingsApi();
		$this->api          = new DovetailApi();

		$this->post_types = $this->settings_api->get_option( 'post_types', 'general' );

		add_action( 'add_meta_boxes', [ $this, 'initialize_meta_box' ], 999, 2 );
	}

	/**
	 * Enqueue scripts and styles.
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts() {
		$meta         = get_post_meta( DTPODCASTS_POST_META_KEY, $this->post->post_id );
		$podcasts_api = $this->api->get_podcasts();
		$podcasts     = array_map(
			static fn( $p ) => [
				'id'          => $p['id'],
				'title'       => $p['title'],
				'itunesImage' => $p['itunesImage'],
				'feedImage'   => $p['feedImage'],
			],
			$podcasts_api['_embedded']['prx:items']
		);
		$options      = [
			'podcasts' => $podcasts,
		];

		wp_enqueue_media();
		wp_enqueue_script( DTPODCASTS_SETTINGS_SECTION_PREFIX, DTPODCASTS_PLUGIN_URL . 'scripts/podcast-episode-metabox.js', [ 'jquery' ], DTPODCASTS_VERSION, [ 'strategy' => 'defer' ] );

		wp_localize_script(
			DTPODCASTS_SETTINGS_SECTION_PREFIX,
			'appLocalizer',
			[
				'appContainerId'         => self::APP_CONTAINER_ID,
				'episodeMetaDataJson'    => wp_json_encode( $meta ),
				'postMetaboxOptionsJson' => wp_json_encode( $options ),
				'nonce'                  => wp_create_nonce( 'wp_rest' ),
			]
		);

		// Action to enqueue scripts on the Dovetail Podcasts Settings page.
		do_action( 'dovetail_podcasts_post_metabox_enqueue_scripts' );
	}

	/**
	 * Initialize Dovetail podcast episode meta box on configured post types.
	 *
	 * @param string   $post_type Post type name.
	 * @param \WP_Post $post Post object.
	 * @return void
	 */
	public function initialize_meta_box( string $post_type, \WP_Post $post ) {
		$this->post = $post;

		if ( is_array( $this->post_types ) && in_array( $post_type, $this->post_types, true ) ) {
			add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
		}
		add_meta_box( 'dovetail-podcasts-episode', 'Podcast Episode', [ $this, 'render_meta_box' ], $this->post_types, 'normal' );
	}

	/**
	 * Render meta box UI container element.
	 *
	 * @return void
	 */
	public function render_meta_box() {
		?>
		<div id="<?php echo esc_attr( self::APP_CONTAINER_ID ); ?>" class="tailwind"></div>
		<?php
	}

	/**
	 * Post save hook
	 *
	 * Should save meta box data, and sync post data with Dovetail.
	 *
	 * @param int      $id Post ID.
	 * @param \WP_Post $post Post object.
	 * @param bool     $update Whether this is an existing post being updated.
	 * @return void
	 */
	public function save_post( int $id, WP_Post $post, bool $update ) {

		if ( ! current_user_can( 'edit_post', $post_ID ) ) {
			return;
		}

		// Check if post type matches settings.
		$post_types = $this->settings_api->get_option( 'post_types', 'general' );
		$post_types = ! is_array( $post_types ) ?? [];
		if ( ! in_array( $post->post_type, $post_types, true ) ) {
			return;
		}

		// Get current meta box data.
		$meta     = get_post_meta( $id, DTPODCASTS_POST_META_KEY, true );
		$has_meta = ! empty( $meta );

		$is_new_episode = ! isset( $meta['dovetail']['episode_id'] );

		// Gather meta box fields values.

		if ( 'published' === $post->post_status ) {
			if ( $is_new_episode ) {
				// Create new Dovetail episode.
				$this->api->create_episode( $post, $meta );
			} else {
				// Update Dovetail episode.
				$this->api->update_episode( $post, $meta );
			}

			// Update meta box data with Dovetail data.
		}

		if ( $has_meta ) {
			update_post_meta( $post_ID, DTPODCASTS_POST_META_KEY, $meta );
		} else {
			add_post_meta( $post_ID, DTPODCASTS_POST_META_KEY, $meta, true );
		}
	}
}
