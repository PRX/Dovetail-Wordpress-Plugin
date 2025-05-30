<?php
/**
 * The DovetailPodcasts Utilities class.
 *
 * @package DovetailPodcasts\Utils
 */

namespace DovetailPodcasts\Utils;

/**
 * PostMetaBox class
 *
 * @package DovetailPodcasts\Utils
 * @since  0.0.0
 */
class Utils {
	/**
	 * Recursively merge two arrays.
	 *
	 * @param array<mixed,mixed> $args Array to be merged.
	 * @param array<mixed,mixed> $defaults Array to be merged into.
	 * @return array<mixed,mixed> Merged array.
	 */
	public static function recursive_array_merge( array $args, array $defaults ) {
		$new_args = (array) $defaults;

		foreach ( $args as $key => $value ) {
			if ( is_array( $value ) && isset( $new_args[ $key ] ) ) {
				$new_args[ $key ] = self::recursive_array_merge( $value, $new_args[ $key ] );
			} else {
				$new_args[ $key ] = $value;
			}
		}

		return $new_args;
	}

	/**
	 * Parse Dovetail episode API data into our meta data model.
	 *
	 * @param array<string,mixed> $data Dovetail episode API data.
	 * @return array<string,mixed> Dovetail meta data array.
	 */
	public static function parse_episode_api_data( array $data ) {
		if ( ! empty( $data ) ) {
			$parsed_data = [
				'id'              => $data['id'],
				'media'           => $data['media'],
				'enclosure'       => $data['_links']['enclosure'],
				'itunesType'      => $data['itunesType'],
				'explicitContent' => $data['explicitContent'],
				'explicit'        => isset( $data['explicit'] ) ? 'true' === $data['explicit'] : $data['explicitContent'],
				'seasonNumber'    => isset( $data['seasonNumber'] ) ? $data['seasonNumber'] : null,
				'episodeNumber'   => isset( $data['episodeNumber'] ) ? $data['episodeNumber'] : null,
				'cleanTitle'      => isset( $data['cleanTitle'] ) ? $data['cleanTitle'] : null,
				'author'          => isset( $data['author'] ) && ! empty( $data['author'] ) ? $data['author'] : null,
				'image'           => isset( $data['image'] ) && ! empty( $data['image'] ) ? [
					'id'          => isset( $data['image']['id'] ) ? $data['image']['id'] : null,
					'originalUrl' => $data['image']['originalUrl'],
				] : null,
			];

			if ( isset( $data['uncut'] ) ) {
				$parsed_data['uncut'] = $data['uncut'];
			}

			return $parsed_data;
		}

		return $data;
	}

	/**
	 * Get an attachment ID given a URL.
	 *
	 * @param string $url Attachment file url.
	 * @return int Attachment ID on success, 0 on failure
	 */
	public static function get_attachment_id( $url ) {

		$attachment_id = 0;

		$dir = wp_upload_dir();

		if ( false !== strpos( $url, $dir['baseurl'] . '/' ) ) { // Is URL in uploads directory?
			$file = basename( $url );

			$query_args = [
				'post_type'   => 'attachment',
				'post_status' => 'inherit',
				'fields'      => 'ids',
				'meta_query'  => [
					[
						'value'   => $file,
						'compare' => 'LIKE',
						'key'     => '_wp_attachment_metadata',
					],
				],
			];

			$query = new WP_Query( $query_args );

			if ( $query->have_posts() ) {
				foreach ( $query->posts as $post_id ) {
					$meta = wp_get_attachment_metadata( $post_id );

					$original_file       = basename( $meta['file'] );
					$cropped_image_files = wp_list_pluck( $meta['sizes'], 'file' );

					if ( $original_file === $file || in_array( $file, $cropped_image_files, true ) ) {
						$attachment_id = $post_id;
						break;
					}
				}
			}
		}

		return $attachment_id;
	}
}
