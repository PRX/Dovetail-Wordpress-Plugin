<?php
/**
 * Plugin constants definitions and helpers.
 *
 * @package DovetailPodcasts
 */

/**
 * Sets up constants for use throughout the plugin and by other extending plugins.
 *
 * This is in its own file so that it can be used via the autoloaded classes, but also
 * can be pulled in when composer dependencies have not been installed.
 *
 * @return void
 */
function dovetail_podcasts_setup_constants() {

	// Whether to autoload the files or not.
	// This must be defined here and not within the DovetailPodcasts.php because this constant
	// determines whether to autoload classes or not.
	if ( ! defined( 'DTPODCASTS_AUTOLOAD' ) ) {
		define( 'DTPODCASTS_AUTOLOAD', true );
	}

	// Plugin version.
	if ( ! defined( 'DTPODCASTS_VERSION' ) ) {
		define( 'DTPODCASTS_VERSION', '0.3.2' );
	}

	// Plugin Folder Path.
	if ( ! defined( 'DTPODCASTS_PLUGIN_DIR' ) ) {
		define( 'DTPODCASTS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
	}

	// Plugin Folder URL.
	if ( ! defined( 'DTPODCASTS_PLUGIN_URL' ) ) {
		define( 'DTPODCASTS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
	}

	// Plugin Root File.
	if ( ! defined( 'DTPODCASTS_PLUGIN_FILE' ) ) {
		define( 'DTPODCASTS_PLUGIN_FILE', DTPODCASTS_PLUGIN_DIR . '/dovetail-podcasts.php' );
	}

	// The minimum version of PHP this plugin requires to work properly.
	if ( ! defined( 'DTPODCASTS_MIN_PHP_VERSION' ) ) {
		define( 'DTPODCASTS_MIN_PHP_VERSION', '7.1' );
	}

	// Prefix to use add to cache keys.
	if ( ! defined( 'DTPODCASTS_CACHE_GROUP' ) ) {
		define( 'DTPODCASTS_CACHE_GROUP', 'dovetail_podcasts' );
	}

	// Prefix to use add to settings sections.
	if ( ! defined( 'DTPODCASTS_SETTINGS_SECTION_PREFIX' ) ) {
		define( 'DTPODCASTS_SETTINGS_SECTION_PREFIX', 'dovetail_podcasts_settings-' );
	}

	// Post meta data key.
	if ( ! defined( 'DTPODCASTS_POST_META_KEY' ) ) {
		define( 'DTPODCASTS_POST_META_KEY', '_dovetail_podcasts_episode' );
	}

	// REST API base route.
	if ( ! defined( 'DTPODCASTS_API_ROUTE_BASE' ) ) {
		define( 'DTPODCASTS_API_ROUTE_BASE', 'dovetail/v1' );
	}

	// Priority of actions and filters that add players to content.
	if ( ! defined( 'DTPODCASTS_PLAYER_CONTENT_PRIORITY' ) ) {
		define( 'DTPODCASTS_PLAYER_CONTENT_PRIORITY', 10 );
	}

	// Prefix for player shortcodes.
	if ( ! defined( 'DTPODCASTS_SHORTCODE_PREFIX' ) ) {
		define( 'DTPODCASTS_SHORTCODE_PREFIX', 'dovetail-podcasts-' );
	}

	define( 'DT_LOGO_DATA_SVG', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIxIiBoZWlnaHQ9IjEyMSIgdmlld0JveD0iMCAwIDEyMSAxMjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik05MS4wMjY4IDYwLjQ2MzFMMTE5Ljc2NyAzMS43MjMyQzEyMC4yMzMgMzEuMjU3IDEyMC40OTYgMzAuNjIzNCAxMjAuNDk2IDI5Ljk2MzdDMTIwLjQ5NiAyOS4zMDQgMTIwLjIzMyAyOC42NzA0IDExOS43NjcgMjguMjA0Mkw5Mi43ODY0IDEuMjIzODlDOTIuMzIwMSAwLjc1NzA2OSA5MS42ODY1IDAuNDk0NTc0IDkxLjAyNjggMC40OTQ1NzRDOTAuMzY3MiAwLjQ5NDU3NCA4OS43MzM2IDAuNzU3MDY5IDg5LjI2NzMgMS4yMjM4OUw2MC41Mjc1IDI5Ljk2MzdMNjAuNDY0NCAyOS45MDA3TDMxLjcyNDYgMS4xNjM3MUMzMS4yNTg0IDAuNjk2ODkgMzAuNjI0OCAwLjQzNDM5NSAyOS45NjUxIDAuNDM0Mzk1QzI5LjMwNTQgMC40MzQzOTUgMjguNjcxOCAwLjY5Njg5IDI4LjIwNTYgMS4xNjM3MUwxLjIyNTI5IDI4LjE0NEMwLjc1ODQ2NyAyOC42MTAzIDAuNDk1OTcyIDI5LjI0MzkgMC40OTU5NzIgMjkuOTAzNUMwLjQ5NTk3MiAzMC41NjMyIDAuNzU4NDY3IDMxLjE5NjggMS4yMjUyOSAzMS42NjMxTDMwLjAyNTMgNjAuNDYzMUwxLjIyNTI5IDg5LjI2MzFDMC43NTg0NjcgODkuNzI5MyAwLjQ5NTk3MiA5MC4zNjI5IDAuNDk1OTcyIDkxLjAyMjZDMC40OTU5NzIgOTEuNjgyMyAwLjc1ODQ2NyA5Mi4zMTU4IDEuMjI1MjkgOTIuNzgyMUwyOC4yMDU2IDExOS43NTdDMjguNjcxOCAxMjAuMjIzIDI5LjMwNTQgMTIwLjQ4NiAyOS45NjUxIDEyMC40ODZDMzAuNjI0OCAxMjAuNDg2IDMxLjI1ODQgMTIwLjIyMyAzMS43MjQ2IDExOS43NTdMNTIuMDUzNyA5OS40Mjc2QzUyLjA1MzcgOTkuNDI3NiA1Mi43MDk5IDg2Ljk1NjIgMzguMDY2NCA2OC41MDdMNjAuNTIxOCA5MC45NTk1TDg5LjI2NzMgMTE5LjcwMkM4OS43MzM2IDEyMC4xNjkgOTAuMzY3MiAxMjAuNDMyIDkxLjAyNjggMTIwLjQzMkM5MS42ODY1IDEyMC40MzIgOTIuMzIwMSAxMjAuMTY5IDkyLjc4NjQgMTE5LjcwMkwxMTkuNzY3IDkyLjcyMTlDMTIwLjIzMyA5Mi4yNTU3IDEyMC40OTYgOTEuNjIyMSAxMjAuNDk2IDkwLjk2MjRDMTIwLjQ5NiA5MC4zMDI3IDEyMC4yMzMgODkuNjY5MSAxMTkuNzY3IDg5LjIwMjlMOTEuMDI2OCA2MC40NjMxWiIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo=' );
}
