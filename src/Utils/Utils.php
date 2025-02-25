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
}
