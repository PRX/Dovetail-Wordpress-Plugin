<?php
/**
 * The DovetailPodcasts Settings class.
 *
 * @package DovetailPodcasts\Admin\Settings
 */

namespace DovetailPodcasts\Admin\Settings;

use DovetailPodcasts\Admin\Settings\SettingsApi;
use DovetailPodcasts\Dovetail\DovetailApi;

/**
 * Settings class
 *
 * @package DovetailPodcasts\Admin\Settings
 */
class Settings {

	/**
	 * Settings page slug.
	 */
	public const PAGE_SLUG = 'dovetail-podcasts-settings';

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
	 * Initialize settings.
	 *
	 * @return void
	 */
	public function init() {
		$this->settings_api = new SettingsApi( [ 'page_slugs' => self::PAGE_SLUG ] );
		$this->api          = new DovetailApi();

		add_action( 'admin_menu', [ $this, 'add_options_page' ] );
		add_action( 'init', [ $this, 'register_settings' ] );
		add_action( 'admin_init', [ $this, 'initialize_settings_page' ] );
	}

	/**
	 * Add settings pages to menu.
	 *
	 * @return void
	 */
	public function add_options_page() {

		add_menu_page(
			__( 'Dovetail Podcasts', 'dovetail-podcasts' ),
			__( 'Dovetail', 'dovetail-podcasts' ),
			'manage_options',
			self::PAGE_SLUG,
			[ $this, 'render_settings_page' ],
			'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIxIiBoZWlnaHQ9IjEyMSIgdmlld0JveD0iMCAwIDEyMSAxMjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik05MS4wMjY4IDYwLjQ2MzFMMTE5Ljc2NyAzMS43MjMyQzEyMC4yMzMgMzEuMjU3IDEyMC40OTYgMzAuNjIzNCAxMjAuNDk2IDI5Ljk2MzdDMTIwLjQ5NiAyOS4zMDQgMTIwLjIzMyAyOC42NzA0IDExOS43NjcgMjguMjA0Mkw5Mi43ODY0IDEuMjIzODlDOTIuMzIwMSAwLjc1NzA2OSA5MS42ODY1IDAuNDk0NTc0IDkxLjAyNjggMC40OTQ1NzRDOTAuMzY3MiAwLjQ5NDU3NCA4OS43MzM2IDAuNzU3MDY5IDg5LjI2NzMgMS4yMjM4OUw2MC41Mjc1IDI5Ljk2MzdMNjAuNDY0NCAyOS45MDA3TDMxLjcyNDYgMS4xNjM3MUMzMS4yNTg0IDAuNjk2ODkgMzAuNjI0OCAwLjQzNDM5NSAyOS45NjUxIDAuNDM0Mzk1QzI5LjMwNTQgMC40MzQzOTUgMjguNjcxOCAwLjY5Njg5IDI4LjIwNTYgMS4xNjM3MUwxLjIyNTI5IDI4LjE0NEMwLjc1ODQ2NyAyOC42MTAzIDAuNDk1OTcyIDI5LjI0MzkgMC40OTU5NzIgMjkuOTAzNUMwLjQ5NTk3MiAzMC41NjMyIDAuNzU4NDY3IDMxLjE5NjggMS4yMjUyOSAzMS42NjMxTDMwLjAyNTMgNjAuNDYzMUwxLjIyNTI5IDg5LjI2MzFDMC43NTg0NjcgODkuNzI5MyAwLjQ5NTk3MiA5MC4zNjI5IDAuNDk1OTcyIDkxLjAyMjZDMC40OTU5NzIgOTEuNjgyMyAwLjc1ODQ2NyA5Mi4zMTU4IDEuMjI1MjkgOTIuNzgyMUwyOC4yMDU2IDExOS43NTdDMjguNjcxOCAxMjAuMjIzIDI5LjMwNTQgMTIwLjQ4NiAyOS45NjUxIDEyMC40ODZDMzAuNjI0OCAxMjAuNDg2IDMxLjI1ODQgMTIwLjIyMyAzMS43MjQ2IDExOS43NTdMNTIuMDUzNyA5OS40Mjc2QzUyLjA1MzcgOTkuNDI3NiA1Mi43MDk5IDg2Ljk1NjIgMzguMDY2NCA2OC41MDdMNjAuNTIxOCA5MC45NTk1TDg5LjI2NzMgMTE5LjcwMkM4OS43MzM2IDEyMC4xNjkgOTAuMzY3MiAxMjAuNDMyIDkxLjAyNjggMTIwLjQzMkM5MS42ODY1IDEyMC40MzIgOTIuMzIwMSAxMjAuMTY5IDkyLjc4NjQgMTE5LjcwMkwxMTkuNzY3IDkyLjcyMTlDMTIwLjIzMyA5Mi4yNTU3IDEyMC40OTYgOTEuNjIyMSAxMjAuNDk2IDkwLjk2MjRDMTIwLjQ5NiA5MC4zMDI3IDEyMC4yMzMgODkuNjY5MSAxMTkuNzY3IDg5LjIwMjlMOTEuMDI2OCA2MC40NjMxWiIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo='
		);

		// Ensure first submenu link is labeled as "Settings" instead of repeating "Dovetail" from top-level menu.
		add_submenu_page(
			'dovetail-podcasts-settings',
			__( 'Dovetail Podcasts Settings', 'dovetail-podcasts' ),
			__( 'Settings', 'dovetail-podcasts' ),
			'manage_options',
			self::PAGE_SLUG,
			[ $this, 'render_settings_page' ]
		);

		// TODO: Add submenu pages for new features here.
	}

	/**
	 * Registers the initial settings for Dovetail Podcasts.
	 *
	 * @return void
	 */
	public function register_settings() {

		$have_valid_creds = $this->api->has_valid_client_credentials();

		if ( ! $have_valid_creds ) {
			// Dovetail authenication fields.
			$this->settings_api->register_section(
				'authentication',
				[
					'title' => __( 'Dovetail Client Application Setup', 'dovetail-podcasts' ),
					'desc'  => __( 'Before you can start publishing posts as podcast episodes in Dovetail, we need to authenticate your Wordpress site as a Dovetail Client Application. Talk to your PRX Dovetail onboarding specialist to get your Client Application setup.', 'dovetail-podcasts' ),
				]
			);

			$this->settings_api->register_fields(
				'authentication',
				[
					[
						'name'  => 'client_key',
						'label' => __( 'Client Key', 'dovetail-podcasts' ),
						'type'  => 'password',
					],
					[
						'name'  => 'client_secret',
						'label' => __( 'Client Secret', 'dovetail-podcasts' ),
						'type'  => 'password',
					],
				]
			);
		} else {
			// General settings.
			$this->settings_api->register_section(
				'general',
				[
					'title'    => __( 'Dovetail Podcasts Settings', 'dovetail-podcasts' ),
					'callback' => [ $this, 'render_user_profile' ],
				]
			);

			// Get posttypes that support the features we need.
			$post_types_by_supports = get_post_types_by_support(
				[
					'title',
					'editor',
					'thumbnail',
					'custom-fields',
				],
				'and'
			);
			$post_types             = [];
			foreach ( $post_types_by_supports as $name ) {
				$post_types[ $name ] = get_post_type_object( $name );
			}
			$post_types_options = array_map( static fn( $pt ) => $pt->label, $post_types );

			$this->settings_api->register_fields(
				'general',
				[
					[
						'name'    => 'post_types',
						'label'   => __( 'Podcast Post Types', 'dovetail-podcasts' ),
						'desc'    => __( 'Select which post types to publish as podcast episodes in Dovetail.', 'dovetail-podcasts' ),
						'type'    => 'multicheck',
						'options' => $post_types_options,
						'default' => [ 'post' => 'post' ],
					],
					[
						'name'    => 'delete_media_after_publish',
						'label'   => __( 'Delete Uploaded Media After Publishing', 'dovetail-podcasts' ),
						'desc'    => __( "<p>Uploaded audio will be added to the Media Library. When the podcast episode post is published, Dovetail will fetch the file from Wordpress to process for distribution. Dovetail will then host the audio URL's used in podcast feeds and any Dovetail Podcast Players used in this site.</p><p>Check this box if you do not want to keep the audio in the Media Library after it has been published to Dovetail. Only do this if storage on your Wordpress host is too limited or cost prohobitive for the amount of audio your podcasts produce.</p>", 'dovetail-podcasts' ),
						'type'    => 'checkbox',
						'default' => false,
					],
				]
			);

			// TODO: Add section for player customization fields.
			$this->settings_api->register_section(
				'player',
				[
					'title'    => __( 'Customize Player', 'dovetail-podcasts' ),
					'callback' => [ $this, 'render_player_preview' ],
				]
			);

			// TODO: Add section for removing API credentials.
			$this->settings_api->register_section(
				'manage',
				[
					'title' => __( 'Mangage Client Application', 'dovetail-podcasts' ),
				]
			);

			$this->settings_api->register_fields(
				'manage',
				[
					[
						'name'              => 'delete_client_app_credentials',
						'label'             => __( 'Delete Client App Credentials', 'dovetail-podcasts' ),
						'desc'              => __( 'Enter <strong>DELETE</strong> to remove the current Client Application credentials. Only do this if a new Client Application needs to be used. Posts that were published to a podcasts not owned by the new Client Application user will no longer have updates synced to Doevtail.', 'dovetail-podcasts' ),
						'type'              => 'text',
						'sanitize_callback' => static function ( string $value ) {
							if ( 'DELETE' === $value ) {
								delete_option( DTPODCASTS_SETTINGS_SECTION_PREFIX . 'authentication' );
								wp_cache_flush( 'access_token', DTPODCASTS_CACHE_GROUP );
							}
						},
					],
				]
			);
		}
	}

	/**
	 * Initialize the settings admin page.
	 *
	 * @return void
	 */
	public function initialize_settings_page() {
		// Bail on AJAX requests.
		if ( wp_doing_ajax() ) {
			return;
		}

		$this->settings_api->admin_init();

		// Make sure anything after this check doesn't run on POST requests.
		// Prevents showing multiple copies of settings errors.
		if ( isset( $_SERVER['REQUEST_METHOD'] ) && 'POST' === $_SERVER['REQUEST_METHOD'] ) {
			return;
		}

		$have_valid_creds = $this->api->has_valid_client_credentials();
		if ( ! $have_valid_creds && $this->api->has_client_credentials ) {
			add_settings_error( DTPODCASTS_SETTINGS_SECTION_PREFIX . 'authentication', 'invalid-credentials', 'Provided client credetials are invalid.', 'error' );
		}

		$post_types = $this->settings_api->get_option( 'post_types', 'general' );
		if ( ! $post_types || ! is_array( $post_types ) || empty( $post_types ) ) {
			add_settings_error( DTPODCASTS_SETTINGS_SECTION_PREFIX . 'general', 'missing-post-types', 'Select at least one <em>Podcast Post Type</em>.', 'error' );
		}
	}

	/**
	 * Render Settings UI.
	 *
	 * @return void
	 */
	public function render_settings_page() {
		?>
		<div class="wrap">
			<?php
			settings_errors();
			$this->settings_api->show_navigation();
			$this->settings_api->show_forms();
			?>
		</div>
		<?php
	}

	/**
	 * Render profile block for aunthenticated Dovetail user.
	 *
	 * @return void
	 */
	public function render_user_profile() {
		$user_info = $this->api->get_user_info();
		$podcasts  = $this->api->get_podcasts();
		?>
		<section id="dovetail-app-summary">
			<header>
				<h2><span class="dashicons-before dashicons-yes-alt"></span>Dovetail Connected</h2>
				<div class="dovetail-user">
					<img src="<?php echo esc_url( $user_info['image_href'] ); ?>" width="54" height="54" alt="Profile Image"/>
					<span class="dovetail-user-info">
						<span class="dovetail-user-name"><?php echo esc_html( $user_info['name'] ); ?></span>
						<span class="dovetail-user-email"><?php echo esc_html( $user_info['email'] ); ?></span>
					</span>
				</div>
			</header>
			<div class="dovetail-divider"></div>
			<div class="dovetail-summary">
				<div class="dovetail-summary-content">
					<div class="dovetail-info-card">
						<strong><?php echo esc_html( $podcasts['total'] ); ?></strong>
						<span>Podcasts</span>
					</div>
					<div class="dovetail-podcasts">
						<?php foreach ( $podcasts['_embedded']['prx:items'] as $podcast ) : ?>
						<span class="dovetail-podcast">
							<?php if ( isset( $podcast['feedImage'] ) ) : ?>
							<img class="dovetail-podcast-thumbnail" src="<?php echo esc_url( $podcast['feedImage']['href'] ); ?>" width="32" height="32" alt="Thumbnail"/>
							<?php else : ?>
							<span class="dovetail-podcast-thumbnail dashicons-before dashicons-microphone"></span>
							<?php endif ?>
							<span class="dovetail-podcast-info">
								<span class="dovetail-podcast-title"><?php echo esc_html( $podcast['title'] ); ?></span>
							</span>
						</span>
						<?php endforeach ?>
					</div>
				</div>
			</div>
		</section>
		<?php
	}

	/**
	 * Render player to preview customizations.
	 *
	 * @return void
	 */
	public function render_player_preview() {
		?>
		<section id="dovetail-player-preview">
			<audio controls></audio>
		</section>
		<?php
	}
}
