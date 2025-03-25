<?php
/**
 * The global DovetailPodcasts class.
 *
 * @package DovetailPodcasts
 */

use DovetailPodcasts\Admin\Admin;
use DovetailPodcasts\Content\Player\Player;

/**
 * Class DovetailPodcasts
 *
 * This is the one true DovetailPodcasts class.
 */
final class DovetailPodcasts {

	/**
	 * Stores the instance of the DovetailPodcasts class.
	 *
	 * @var ?\DovetailPodcasts The one true DovetailPodcasts.
	 */
	private static $instance;

	/**
	 * The instance of the DovetailPodcasts object.
	 *
	 * @return \DovetailPodcasts - The one true DovetailPodcasts.
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) || ! ( self::$instance instanceof self ) ) {
			self::$instance = new self();
			self::$instance->setup_constants();
			self::$instance->includes();
			self::$instance->actions();
			self::$instance->filters();
		}

		/**
		 * Return the DovetailPodcasts Instance.
		 */
		return self::$instance;
	}

	/**
	 * Throw error on object clone.
	 * The whole idea of the singleton design pattern is that there is a single object
	 * therefore, we don't want the object to be cloned.
	 *
	 * @return void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'The DovetailPodcasts class should not be cloned.', 'dovetail-podcasts' ), '0.0.0' );
	}

	/**
	 * Disable de-serializing of the class.
	 *
	 * @return void
	 */
	public function __wakeup() {
		// De-serializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'De-serializing instances of the DovetailPodcasts class is not allowed', 'dovetail-podcasts' ), '0.0.0' );
	}

	/**
	 * Setup plugin constants.
	 *
	 * @return void
	 */
	private function setup_constants() {
		dovetail_podcasts_setup_constants();
	}

	/**
	 * Include required files.
	 * Uses composer's autoload.
	 */
	private function includes(): void {
	}

	/**
	 * Sets up actions to run at certain spots throughout WordPress and
	 * the DovetailPodcasts execution cycle.
	 */
	private function actions(): void {

		// Initialize the plugin url constant.
		// See: https://developer.wordpress.org/reference/functions/plugins_url/#more-information .
		add_action( 'init', [ $this, 'setup_plugin_url' ] );

		// Initialize Admin functionality.
		add_action( 'after_setup_theme', [ $this, 'init_admin' ] );

		// TODO: Initialize content functionality (player).
		add_action( 'init', [ $this, 'init_player' ], 999 );
	}

	/**
	 * Check if the minimum PHP version requirement is met before execution begins.
	 *
	 * If the server is running a lower version than required, throw an exception and prevent
	 * further execution.
	 *
	 * @return void
	 * @throws \Exception When PHP version requirements are not met.
	 */
	public function min_php_version_check() {
		if ( defined( 'DTPODCASTS_MIN_PHP_VERSION' ) && version_compare( PHP_VERSION, DTPODCASTS_MIN_PHP_VERSION, '<' ) ) {
			throw new \Exception(
				esc_html(
					sprintf(
					// translators: %1$s is the current PHP version, %2$s is the minimum required PHP version.
						__( 'The server\'s current PHP version %1$s is lower than the Dovetail Podcasts minimum required version: %2$s', 'dovetail-podcasts' ),
						PHP_VERSION,
						DTPODCASTS_MIN_PHP_VERSION
					)
				)
			);
		}
	}

	/**
	 * Sets up the plugin url.
	 *
	 * @return void
	 */
	public function setup_plugin_url() {
		// Plugin File URL.
		if ( ! defined( 'DTPODCASTS_PLUGIN_URL' ) ) {
			define( 'DTPODCASTS_PLUGIN_URL', plugin_dir_url( dirname( __DIR__ ) . '/dovetail-podcasts.php' ) );
		}
	}

	/**
	 * Setup filters.
	 */
	private function filters(): void {
		// TODO: Add filters here.
	}

	/**
	 * Initialize admin functionality.
	 *
	 * @return void
	 */
	public function init_admin() {
		$admin = new Admin();
		$admin->init();
	}

	/**
	 * Initialize player functionality.
	 *
	 * @return void
	 */
	public function init_player() {
		$player = new Player();
		$player->init();
	}
}
