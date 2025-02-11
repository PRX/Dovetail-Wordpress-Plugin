<?php
/**
 * Plugin deactivation and uninstall callbacks and helpers.
 *
 * @package DovetailPodcasts
 */

/**
 * Runs when Dovetail Podcasts is de-activated.
 *
 * This should clean up caches and permalinks.
 *
 * @return void
 */
function dovetail_podcasts_deactivation_callback() {

	if ( ! dovetail_podcasts_can_load_plugin() ) {
		return;
	}

	// Fire an action when Dovetail Podcasts is deactivating.
	do_action( 'dovetail_podcasts_deactivate' );

	// TODO: Flush any caches.
	wp_cache_flush( 'access_token', 'dovetail_podcasts' );
	delete_option( 'dovetail_podcasts_settings-authentication' );
}

/**
 * Runs when Dovetail Podcasts is uninstalled.
 *
 * This cleans up data that Dovetail Podcasts stores.
 *
 * @return void
 */
function dovetail_podcasts_uninstall_callback() {

	if ( ! dovetail_podcasts_can_load_plugin() ) {
		return;
	}

	// Fire an action when Dovetail Podcasts is deactivating.
	do_action( 'dovetail_podcasts_uninstall' );

	// Delete data during deactivation.
	delete_dovetail_podcasts_data();
}

/**
 * Delete plugin data.
 *
 * @return void
 */
function delete_dovetail_podcasts_data() {

	if ( ! class_exists( 'DovetailPodcasts' ) ) {
		return;
	}

	// Delete all plugin settings and caches.
	delete_option( 'dovetail_podcasts_key' );
	delete_option( 'dovetail_podcasts_settings-authentication' );
	delete_option( 'dovetail_podcasts_settings-general' );
	wp_cache_delete( 'access_token', 'dovetail_podcasts' );

	do_action( 'dovetail_podcasts_delete_data' );
}
