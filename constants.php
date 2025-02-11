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
		define( 'DTPODCASTS_VERSION', '0.0.0' );
	}

	// Plugin Folder Path.
	if ( ! defined( 'DTPODCASTS_PLUGIN_DIR' ) ) {
		define( 'DTPODCASTS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
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
}
