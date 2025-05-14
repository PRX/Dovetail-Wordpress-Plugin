<?php
/**
 * Helper functions.
 *
 * @package DovetailPodcasts\Includes
 */

use DovetailPodcasts\Admin\Settings\Settings;

if ( ! function_exists( 'dtpc_config' ) ) {
	/**
	 * Helper function to load config files.
	 *
	 * @param string              $name Name of the config to require.
	 * @param array<string,mixed> $args Associative array of variables to create before requiring config.
	 *
	 * @return array<string,mixed>
	 *
	 * @since next-version
	 */
	function dtpc_config( $name, $args = [] ) {
		foreach ( $args as $key => $value ) {
			if ( ! isset( $$key ) ) {
				$$key = $value;
			}
		}
		$name   = trim( $name, '/' );
		$config = require DTPODCASTS_PLUGIN_DIR . 'src/config/' . $name . '.php';

		return apply_filters( 'dtpc_config', $config, $name );
	}
}

if ( ! function_exists( 'dtpc_post_types' ) ) {

	/**
	 * Fetch all valid podcast post types
	 *
	 * @param bool $verify Verify if the post type has been registered by register_post_type.
	 *
	 * @return array<string> Array of podcast post types.
	 *
	 * @since next-version
	 */
	function dtpc_post_types( $verify = true ) {

		// Get saved podcast post type option, default to empty array.
		$podcast_post_types = Settings::get_option( 'post_types', 'general' );

		if ( ! is_array( $podcast_post_types ) ) {
			$podcast_post_types = [];
		}

		if ( $verify ) {
			$valid_podcast_post_types = [];

			// Check if post types exist.
			foreach ( $podcast_post_types as $type ) {
				if ( post_type_exists( $type ) ) {
					$valid_podcast_post_types[] = $type;
				}
			}
		} else {
			$valid_podcast_post_types = $podcast_post_types;
		}

		// Return only the valid podcast post types.
		return apply_filters( 'dtpc_podcast_post_types', $valid_podcast_post_types, $include_podcast );
	}
}
