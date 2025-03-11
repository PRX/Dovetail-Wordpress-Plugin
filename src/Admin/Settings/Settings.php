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
		$this->dovetail_api = new DovetailApi();

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
			DT_LOGO_DATA_SVG
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

		$have_valid_creds = $this->dovetail_api->has_valid_client_credentials();

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

			$offload_plugins = $this->get_installed_offload_plugins();

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
						'desc'    => '<p>' . esc_html__( "Uploaded audio will be added to the Media Library. When the podcast episode post is published, Dovetail will fetch the file from Wordpress to process for distribution. Dovetail will then host the audio URL's used in podcast feeds and any Dovetail Podcast Players used in this site.", 'dovetail-podcasts' ) . '</p>' .
						'<p>' . esc_html__( 'Enable this if you do not want to keep the audio in the Media Library after it has been published to Dovetail. Only do this if storage on your Wordpress host is too limited or cost prohobitive for the amount of audio your podcasts produce.', 'dovetail-podcasts' ) . '</p>' . (
							empty( $offload_plugins ) ? (
								// TRANSLATORS: %1$s is a URL path to the admin plugin search page with query parameters for relavant plugins.
								'<p>' . sprintf( __( 'We recommend installing a <a href="%1$s" target="_blank">Media Library offloading plugin</a> to address media storage issues.', 'dovetail-podcasts' ), '/wp-admin/plugin-install.php?s=aws%2520s3%2520offload%2520media%2520library&tab=search&type=term' ) . '</p>'
							) : (
								! empty( $offload_plugins['active'] ) ? (
									'<details class="plugins-info success"><summary>' . esc_html__( 'Great work! It looks like your Media Library files are being offloaded to remote storage. You should NOT need to enable this option.', 'dovetail-podcasts' ) . '</summary><dl>' . (
										implode(
											'',
											array_map(
												static fn( $p ) => (
													'<dt>' . esc_html( $p['details']['Title'] ) . '</dt>' .
													'<dd>' . esc_html( $p['details']['Description'] ) . '</dd>' .
													'<dd><ul class="keywords">' . implode(
														'',
														array_map(
															static fn( $v ) => (
															'<li>' . esc_html( $v ) . '</li>'
															),
															$p['keywords']
														)
													) . '</ul></dd>'
												),
												$offload_plugins['active']
											)
										)
									) . '</dl></details>'
								) : (
									'<details class="plugins-info warn" open><summary>' . esc_html__( 'Do NOT enable this yet! It looks like you have plugins installed that could offload your Media Library files to remote storage. We recomend activating one of these plugins before choosing to delete published media.', 'dovetail-podcasts' ) . '</summary><dl>' . (
										implode(
											'',
											array_map(
												static fn( $p ) => (
													'<dt>' . esc_html( $p['details']['Title'] ) . '</dt>' .
													'<dd>' . esc_html( $p['details']['Description'] ) . '</dd>' .
													'<dd><ul class="keywords">' . implode(
														'',
														array_map(
															static fn( $v ) => (
															'<li>' . esc_html( $v ) . '</li>'
															),
															$p['keywords']
														)
													) . '</ul></dd>'
												),
												$offload_plugins['disabled']
											)
										)
									) . '</dl></details>'
								)
							)
						),
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

		$have_valid_creds = $this->dovetail_api->has_valid_client_credentials();
		if ( ! $have_valid_creds && $this->dovetail_api->has_client_credentials ) {
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
		list( $user_info ) = $this->dovetail_api->get_user_info();
		list( $podcasts )  = $this->dovetail_api->get_podcasts();
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


	/**
	 * Get list of installed media library file offloading plugins.
	 *
	 * @return array<string,mixed>
	 */
	public function get_installed_offload_plugins() {
		// The `get_plugins` function may not be available depending on what
		// hook this method is called in. Let's make sure it is loaded.
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$plugins = get_plugins();

		// Regex ready list of keywords to qualify a plugin.
		$include_keywords = [
			'media library',
			'offload',
			'cloud storage',
			'AWS S3',
			'Amazon S3',
			'Google Cloud',
			'DigitalOcean',
			'Cloudflare R2',
			'Mini\.?io',
			'Wasabi',
			'Linode',
			'Backblaze',
			'DreamHost',
		];
		$include_regex    = $this->create_keyword_regex( $include_keywords );
		// Regex ready list of keywords to disqualify a plugin.
		$exclude_keywords = [
			'image optimization',
			'image optimizer',
		];
		$exclude_regex    = $this->create_keyword_regex( $exclude_keywords );

		$found = [];

		foreach ( $plugins as $plugin => $details ) {
			$plugin_text = $details['Description'] . $details['Name'] . $details['Title'];
			if ( preg_match_all( $include_regex, $plugin_text, $matches ) ) {
				if ( ! preg_match( $exclude_regex, $plugin_text ) ) {
					$status = is_plugin_active( $plugin ) ? 'active' : 'disabled';

					$found[ $status ][ $plugin ] = [
						'keywords' => array_unique( array_filter( $matches[0] ) ),
						'details'  => $details,
					];
				}
			}
		}

		return $found;
	}

	/**
	 * Create a regular expression string to match and capture a set of keywords.
	 *
	 * @param array<int,string> $keywords Array of keywords.
	 * @return string
	 */
	private function create_keyword_regex( array $keywords ) {
		return str_replace(
			'{patterns}',
			implode(
				'|',
				array_map( static fn( $v ) => "({$v})", $keywords )
			),
			'~{patterns}~im'
		);
	}
}
