<?php
/**
 * Plugin activation callbacks and helpers.
 *
 * @package DovetailPodcasts
 */

use Defuse\Crypto\Key;

/**
 * Runs when Dovetail Podcasts is activated
 *
 * @return void
 */
function dovetail_podcasts_activation_callback() {

	do_action( 'dovetail_podcasts_activate' );

	if ( ! defined( 'DTPODCASTS_VERSION' ) ) {
		return;
	}

	// Store the current version of Dovetail Podcasts.
	update_option( 'dovetail_podcasts_version', DTPODCASTS_VERSION );

	// Store encryption key.
	$key = Key::createNewRandomKey();
	update_option( 'dovetail_podcasts_key', $key->saveToAsciiSafeString() );
}
