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

	// TODO: Unregister content types and taxonomies?

	// TODO: Flush permalinks (if we unregister content types).
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

	// TODO: Delete post data for content types added by plugin?

	// TODO: Delete taxonomy terms data for content types added by plugin?
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

	// TODO: Delete all plugin settings.

	do_action( 'dovetail_podcasts_delete_data' );
}
