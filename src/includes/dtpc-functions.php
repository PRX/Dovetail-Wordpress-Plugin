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
	 * @since 0.0.0
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
	 * @since 0.0.0
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

if ( ! function_exists( 'dtpc_post_meta_podcast_episode' ) ) {

	/**
	 * Get post meta data for Dovetail podcast episode.
	 *
	 * @param int $post_id Post id to get meta data for. Uses global post when not provided.
	 * @return array<string,mixed>|false Dovetail podcast episode meta data. Returns `false` when no meta data found.
	 *
	 * @since @next-version
	 */
	function dtpc_post_meta_podcast_episode( int $post_id = null ) {

		global $post;

		if ( ! $post_id ) {
			$post_id = $post->ID;
		}

		$meta = get_post_meta( $post_id, DTPODCASTS_POST_META_KEY, true );

		return ! empty( $meta ) ? $meta : false;
	}

}

if ( ! function_exists( 'dtpc_post_has_dovetail_podcast_episode' ) ) {

	/**
	 * Determines if a post has Dovetail episode meta data.
	 *
	 * @param int $post_id Post id to check for Dovetail episode meta data. Uses global post when not provided.
	 * @return bool Returns `true` if post meta data has a Dovetail episode id, `false` otherwise.
	 *
	 * @since @next-version
	 */
	function dtpc_post_has_dovetail_podcast_episode( int $post_id = null ) {

		$meta     = dtpc_post_meta_podcast_episode( $post_id );
		$has_meta = $meta && is_array( $meta ) && ! empty( $meta );

		return $has_meta && isset( $meta['dovetail']['id'] ) && ! empty( $meta['dovetail']['id'] );
	}

}

if ( ! function_exists( 'dtpc_post_podcast_player_attributes' ) ) {

	/**
	 * Get a post's podcast episode player attributes appropriate for the posts status.
	 * Use to manually render player block, or just determine if a player can be
	 *
	 * @param int $post_id Post id to check for podcast player attributes. Uses global post when not provided.
	 * @return array<string,mixed>|false Podcast player attributes. Returns `false` when player attributes can not be generated.
	 *
	 * @since @next-version
	 */
	function dtpc_post_podcast_player_attributes( int $post_id = null ) {

		if ( ! $post_id ) {
			$post_id = get_the_ID();
		}

		$post = get_post( $post_id );

		if ( ! $post ) {
			return false;
		}

		$meta                   = dtpc_post_meta_podcast_episode( $post_id );
		$has_meta               = $meta && is_array( $meta ) && ! empty( $meta );
		$has_local_enclosure    = $has_meta && isset( $meta['enclosure'] ) && ! empty( $meta['enclosure'] );
		$has_dovetail_enclosure = $has_meta && isset( $meta['dovetail']['enclosure'] ) && ! empty( $meta['dovetail']['enclosure'] ) && $meta['dovetail']['enclosure']['size'] > 0;
		$enclosure              = [];

		if ( $has_local_enclosure ) {
			$enclosure['src']      = $meta['enclosure']['url'];
			$enclosure['duration'] = $meta['enclosure']['duration'];
		}

		if ( 'publish' === $post->post_status && $has_dovetail_enclosure ) {
			$enclosure['src']      = $meta['dovetail']['enclosure']['href'];
			$enclosure['duration'] = $meta['dovetail']['enclosure']['duration'];
		}

		return ! empty( $enclosure ) ? $enclosure : false;
	}

}
