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
	public $dovetail_api;

	/**
	 * Initialize settings.
	 *
	 * @return void
	 */
	public function init() {
		$this->settings_api = new SettingsApi( [ 'page_slugs' => self::PAGE_SLUG ] );
		$this->dovetail_api = new DovetailApi();

		add_action( 'admin_menu', [ $this, 'add_options_page' ] );
		add_action( 'init', [ $this, 'register_settings' ], 999 );
		add_action( 'admin_init', [ $this, 'initialize_settings_page' ], 998 );
		add_action( 'admin_init', [ $this, 'generate_customized_player_style' ], 999 );
		add_action( 'rest_api_init', [ $this, 'rest_api_init' ], 999 );
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
		$have_valid_credentials = $this->dovetail_api->has_valid_client_credentials();

		if ( ! $have_valid_credentials ) {
			// Dovetail authentication fields.
			$authentication_settings = dtpc_config( 'settings/authentication' );

			$this->settings_api->register_section(
				$authentication_settings['id'],
				$authentication_settings
			);

			$this->settings_api->register_fields(
				$authentication_settings['id'],
				$authentication_settings['fields']
			);
		} else {

			// Get post types that support the features we need.
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
			$post_types_options = array_map(
				static function ( $pt ) {
					return $pt->label;
				},
				$post_types
			);

			$offload_plugins = $this->get_installed_offload_plugins();

			$post_types = $this->settings_api->get_option( 'post_types', 'general' );

			// General settings.
			$section_callback = [ $this, 'render_user_profile' ];
			$general_settings = dtpc_config( 'settings/general', compact( 'post_types_options', 'post_types', 'offload_plugins', 'section_callback' ) );

			$this->settings_api->register_section(
				$general_settings['id'],
				$general_settings
			);

			$this->settings_api->register_fields(
				$general_settings['id'],
				$general_settings['fields']
			);

			// Player settings.
			$section_callback = [ $this, 'render_player_preview' ];
			$player_settings  = dtpc_config( 'settings/player', compact( 'section_callback' ) );

			$this->settings_api->register_section(
				$player_settings['id'],
				$player_settings
			);

			$this->settings_api->register_fields(
				$player_settings['id'],
				$player_settings['fields']
			);

			// Player styles settings.
			$player_styles = dtpc_config( 'settings/player-styles/index' );

			foreach ( $player_styles as $player_styles_settings ) {
				// Make a subsection for these settings.
				$player_styles_settings['parent'] = $player_settings['id'];

				$this->settings_api->register_section(
					$player_styles_settings['id'],
					$player_styles_settings
				);

				$this->settings_api->register_fields(
					$player_styles_settings['id'],
					$player_styles_settings['fields']
				);
			}

			// Add section for removing API credentials.
			$manage_settings = dtpc_config( 'settings/manage' );
			$this->settings_api->register_section(
				$manage_settings['id'],
				$manage_settings
			);

			$this->settings_api->register_fields(
				$manage_settings['id'],
				$manage_settings['fields']
			);
		}
	}

	/**
	 * Rest API init callback.
	 *
	 * @return void
	 */
	public function rest_api_init() {
		$this->settings_api->register_settings();
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

		$have_valid_credentials = $this->dovetail_api->has_valid_client_credentials();
		if ( ! $have_valid_credentials && $this->dovetail_api->has_client_credentials ) {
			add_settings_error( DTPODCASTS_SETTINGS_SECTION_PREFIX . 'authentication', 'invalid-credentials', 'Provided client credentials are invalid.', 'error' );
		}

		$post_types = $this->settings_api->get_option( 'post_types', 'general' );
		if ( $this->dovetail_api->has_client_credentials && ( ! $post_types || ! is_array( $post_types ) || empty( $post_types ) ) ) {
			add_settings_error( DTPODCASTS_SETTINGS_SECTION_PREFIX . 'general', 'missing-post-types', 'Select at least one <em>Podcast Post Type</em>.', 'error' );
		}
	}

	/**
	 * Add update actions for player style options.
	 *
	 * @return void
	 */
	public function generate_customized_player_style() {
		add_action(
			sprintf( 'update_option_%1$s', DTPODCASTS_SETTINGS_SECTION_PREFIX . 'player' ),
			function () {
				$player_style_path = $this->get_player_style_path();

				wp_mkdir_p( dirname( $player_style_path ) );

				// Since we are putting the file in the uploads directory, it is safe to use file_put_contents.
				// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
				file_put_contents( $player_style_path, $this->generate_player_style_css() );

				update_option( 'dovetail_player_style_version', wp_generate_password( 6, false ) );
			},
			10,
			2
		);
	}

	/**
	 * Get player styles settings fields.
	 *
	 * @return array<int,array<string,mixed>>
	 */
	protected function get_player_styles_settings_fields() {
		$return = [];

		$player_styles = dtpc_config( 'settings/player-styles/index' );

		foreach ( $player_styles as $player_styles_settings ) {
			foreach ( $player_styles_settings['fields'] as $field ) {
				$return[] = $field;
			}
		}

		return $return;
	}

	/**
	 * Get path to player styles css file location in upload directory.
	 *
	 * @return string
	 */
	public static function get_player_style_path() {
		$upload_dir = wp_upload_dir()['basedir'];
		return $upload_dir . '/dtpc/css/dtpc-player-style.css';
	}

	/**
	 * Generate CSS for player styles.
	 *
	 * @return string
	 */
	protected function generate_player_style_css() {
		$css = '';

		$player_styles_settings_fields = $this->get_player_styles_settings_fields();

		foreach ( $player_styles_settings_fields as $field ) {
			$field_names = $this->settings_api->get_field_names( $field );

			foreach ( $field_names as $field_name ) {
				$css_prop = sprintf( '--dtpc-%1$s', $field_name );
				$value    = $this->settings_api->get_option( $field_name, 'player' );

				if ( ! empty( $value ) ) {
					$css .= sprintf( '%1$s:%2$s;', $css_prop, $value );
				}
			}
		}

		return sprintf( ':root{%1$s}', $css );
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
	 * Render profile block for authenticated Dovetail user.
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
							<?php
							$image = false;
							if ( isset( $podcast['itunesImage'] ) ) {
								$image = $podcast['itunesImage'];
							} elseif ( isset( $podcast['feedImage'] ) ) {
								$image = $podcast['feedImage'];
							}
							?>
						<span class="dovetail-podcast">
							<?php if ( $image ) : ?>
							<img class="dovetail-podcast-thumbnail" src="<?php echo esc_url( $image['href'] ); ?>" width="32" height="32" alt="Thumbnail"/>
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
		$src = DTPODCASTS_PLUGIN_URL . 'assets/audio/Dovetail Podcasts Player Implementation Guide.m4a';
		?>
		<svg style="display: none;" version="2.0">
			<defs>
				<symbol id="dark_mode" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></symbol>

				<symbol id="light_mode" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></symbol>

				<symbol id="routine" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M396-396q-32-32-58.5-67T289-537q-5 14-6.5 28.5T281-480q0 83 58 141t141 58q14 0 28.5-2t28.5-6q-39-22-74-48.5T396-396Zm57-56q51 51 114 87.5T702-308q-40 51-98 79.5T481-200q-117 0-198.5-81.5T201-480q0-65 28.5-123t79.5-98q20 72 56.5 135T453-452Zm290 72q-20-5-39.5-11T665-405q8-18 11.5-36.5T680-480q0-83-58.5-141.5T480-680q-20 0-38.5 3.5T405-665q-8-19-13.5-38T381-742q24-9 49-13.5t51-4.5q117 0 198.5 81.5T761-480q0 26-4.5 51T743-380ZM440-840v-120h80v120h-80Zm0 840v-120h80V0h-80Zm323-706-57-57 85-84 57 56-85 85ZM169-113l-57-56 85-85 57 57-85 84Zm671-327v-80h120v80H840ZM0-440v-80h120v80H0Zm791 328-85-85 57-57 84 85-56 57ZM197-706l-84-85 56-57 85 85-57 57Zm199 310Z"/></symbol>

				<symbol id="texture" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M176-120q-19-4-35.5-20.5T120-176l664-664q21 5 36 20.5t21 35.5L176-120Zm-56-252v-112l356-356h112L120-372Zm0-308v-80q0-33 23.5-56.5T200-840h80L120-680Zm560 560 160-160v80q0 33-23.5 56.5T760-120h-80Zm-308 0 468-468v112L484-120H372Z"/></symbol>
			</defs>
		</svg>
		<div class="dovetail-settings-player-header">
			<aside id="dovetail-player-preview" data-theme="auto">
				<div class="dtpc-toolbar">
					<h3>Default Player Preview</h3>
					<div class="dtpc-control-group dtpc-backdrop">
						<button type="button" title="Toggle Player Backdrop">
							<svg width="24" height="24" version="2.0">
								<use href="#texture" />
							</svg>
						</button>
					</div>
					<div class="dtpc-control-group dtpc-color-mode">
						<button type="button" data-theme-color="dark" title="Dark Theme Preview">
							<svg width="24" height="24" version="2.0">
								<use href="#dark_mode" />
							</svg>
						</button>
						<button type="button" data-theme-color="auto" title="Default Preview">
							<svg width="24" height="24" version="2.0">
								<use href="#routine" />
							</svg>
						</button>
						<button type="button" data-theme-color="light" title="Light Theme Preview">
							<svg width="24" height="24" version="2.0">
								<use href="#light_mode" />
							</svg>
						</button>
					</div>
				</div>
				<dtpc-player src="<?php echo esc_attr( $src ); ?>" duration="342.95873" layout="default"></dtpc-player>
			</aside>
			<nav class="dovetail-settings-player-menu" title="Player Preview Menu">
				<?php submit_button(); ?>
				<div class="dovetail-divider"></div>
				<button type="button" name="restore_defaults" id="restore_defaults" class="button button-secondary">
					<?php echo esc_html__( 'Restore Defaults', 'dovetail-podcasts' ); ?>
				</button>
			</nav>
		</div>
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
				array_map(
					static function ( $v ) {
						return "({$v})"; },
					$keywords
				)
			),
			'~{patterns}~im'
		);
	}
}
