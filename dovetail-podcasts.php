<?php
/**
 * Plugin Name: Dovetail Podcasts
 * Plugin URI: https://github.com/PRX/Dovetail-Wordpress-Plugin
 * GitHub Plugin URI: https://github.com/PRX/Dovetail-Wordpress-Plugin
 * Description: Easily integrate with Dovetail from PRX's podcasting publishing platform to streamline your podcast production workflow.
 * Author: PRX
 * Author URI: http://prx.org
 * Version: 0.3.0
 * Text Domain: dovetail-podcasts
 * License: GPL-3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package DovetailPodcasts
 * @author PRX
 * @version  0.3.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load files that are required even if the composer autoloader isn't installed
 */
function dovetail_podcasts_require_bootstrap_files(): void {
	if ( file_exists( __DIR__ . '/constants.php' ) ) {
		require_once __DIR__ . '/constants.php';
	}
	if ( file_exists( __DIR__ . '/activation.php' ) ) {
		require_once __DIR__ . '/activation.php';
	}
	if ( file_exists( __DIR__ . '/deactivation.php' ) ) {
		require_once __DIR__ . '/deactivation.php';
	}
	if ( file_exists( __DIR__ . '/src/includes/dtpc-functions.php' ) ) {
		require_once __DIR__ . '/src/includes/dtpc-functions.php';
	}
	if ( file_exists( __DIR__ . '/src/classes/DovetailPodcasts.php' ) ) {
		require_once __DIR__ . '/src/classes/DovetailPodcasts.php';
	}
}

/**
 * Determines if the plugin can load.
 *
 * Test env:
 *  - DTPODCASTS_AUTOLOAD: false
 *  - autoload installed and manually added in test env
 *
 * Bedrock
 *  - DTPODCASTS_AUTOLOAD: not defined
 *  - composer deps installed outside of the plugin
 *
 * Normal (.org repo install)
 * - DTPODCASTS_AUTOLOAD: not defined
 * - composer deps installed INSIDE the plugin
 */
function dovetail_podcasts_can_load_plugin(): bool {

	// Load the bootstrap files (needed before autoloader is configured).
	dovetail_podcasts_require_bootstrap_files();

	// If DTPODCASTS is already loaded,
	// We can assume that DTPODCASTS has been installed as a composer dependency of a parent project.
	if ( class_exists( 'DovetailPodcasts' ) && class_exists( 'DovetailPodcasts\Admin' ) ) {
		return true;
	}

	/**
	 * DTPODCASTS_AUTOLOAD can be set to "false" to prevent the autoloader from running.
	 * In most cases, this is not something that should be disabled, but some environments
	 * may bootstrap their dependencies in a global autoloader that will autoload files
	 * before we get to this point, and requiring the autoloader again can trigger fatal errors.
	 *
	 * The codeception tests are an example of an environment where adding the autoloader again causes issues
	 * so this is set to false for tests.
	 */
	if ( defined( 'DTPODCASTS_AUTOLOAD' ) && false === DTPODCASTS_AUTOLOAD ) {
		// IF DTPODCASTS_AUTOLOAD is defined as false,
		// but the DTPODCASTS Class exists, we can assume the dependencies
		// are loaded from the parent project.
		return true;
	}

	if ( file_exists( plugin_dir_path( __FILE__ ) . 'vendor/autoload.php' ) ) {
		// Autoload Required Classes.
		require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';
	}

	// If the DovetailPodcasts class still doesn't exist, bail as there was an issue bootstrapping the plugin.
	if ( ! class_exists( 'DovetailPodcasts' ) ) {
		return false;
	}

	return true;
}

if ( ! function_exists( 'dovetail_podcasts_init' ) ) {
	/**
	 * Function that instantiates the plugins main class
	 *
	 * @return object|null
	 */
	function dovetail_podcasts_init() {

		// iBail f the plugin can't be loaded.
		if ( false === dovetail_podcasts_can_load_plugin() ) {
			add_action( 'network_admin_notices', 'dovetail_podcasts_cannot_load_admin_notice_callback' );
			add_action( 'admin_notices', 'dovetail_podcasts_cannot_load_admin_notice_callback' );
			return null;
		}

		/**
		 * Return an instance of the action.
		 */
		return \DovetailPodcasts::instance();
	}
}
dovetail_podcasts_init();

// Setup activation/deactivation hooks.
register_deactivation_hook( __FILE__, 'dovetail_podcasts_deactivation_callback' );
register_activation_hook( __FILE__, 'dovetail_podcasts_activation_callback' );

/**
 * Render an admin notice if the plugin cannot load.
 */
function dovetail_podcasts_cannot_load_admin_notice_callback(): void {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	printf(
		'<div class="notice notice-error">' .
		'<p>%s</p>' .
		'</div>',
		esc_html__( 'Dovetail Podcasts appears to have been installed without it\'s dependencies. It will not work properly until dependencies are installed. This likely means you have cloned Dovetail Podcasts from Github and need to run the command `composer install`.', 'dovetail-podcasts' )
	);
}
