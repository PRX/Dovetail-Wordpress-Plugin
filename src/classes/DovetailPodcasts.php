<?php
/**
 * The global DovetailPodcasts class.
 *
 * @package Dovetail Podcasts
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
			self::$instance->upgrade();
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

		// Initialize Admin functionality.
		add_action( 'after_setup_theme', [ $this, 'init_admin' ] );

		// Initialize content functionality (player).
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

	/**
	 * Upgrade routine
	 *
	 * @return void
	 */
	public function upgrade() {
		$version = get_option( 'dovetail_podcasts_version', null );

		// If the version is not set, this is a fresh install, not an update.
		// set the version and return.
		if ( ! $version ) {
			update_option( 'dovetail_podcasts_version', DTPODCASTS_VERSION );
			return;
		}

		// If the version is less than the current version, run the update routine.
		if ( version_compare( $version, DTPODCASTS_VERSION, '<' ) ) {
			$this->run_update_routines( $version );
			update_option( 'dovetail_podcasts_version', DTPODCASTS_VERSION );
		}
	}

	/**
	 * Executes update routines based on the previously stored version.
	 *
	 * This triggers an action that passes the previous version and new version and allows for specific actions or
	 * modifications needed to bring installations up-to-date with the current plugin version.
	 *
	 * Each update routine (callback that hooks into "graphql_do_update_routine") should handle backward compatibility as gracefully as possible.
	 *
	 * @since next-version
	 * @param string|null $stored_version The version number currently stored in the database.
	 *                                    Null if no version has been previously stored.
	 */
	public function run_update_routines( string $stored_version = null ): void {

		// bail if the stored version is empty, or the DTPODCASTS_VERSION constant is not set.
		if ( ! defined( 'DTPODCASTS_VERSION' ) || ! $stored_version ) {
			return;
		}

		// If the stored version is less than the current version, run the upgrade routine.
		if ( version_compare( $stored_version, DTPODCASTS_VERSION, '<' ) ) {

			// Clear the extensions cache.
			$this->clear_extensions_cache();

			/**
			 * Fires the update routine.
			 *
			 * @param string $stored_version The version number currently stored in the database.
			 * @param string $new_version    The version number of the current plugin.
			 */
			do_action( 'dovetail_podcasts_do_update_routine', $stored_version, DTPODCASTS_VERSION );
		}
	}

	/**
	 * Clear all caches in the "dovetail_podcasts_extensions" cache group.
	 *
	 * @return void
	 */
	public function clear_extensions_cache() {
		global $wp_object_cache;

		if ( isset( $wp_object_cache->cache['dovetail_podcasts_extensions'] ) ) {
			foreach ( $wp_object_cache->cache['dovetail_podcasts_extensions'] as $key => $value ) {
				wp_cache_delete( $key, 'dovetail_podcasts_extensions' );
			}
		}
	}
}
