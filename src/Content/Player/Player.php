<?php
/**
 * The DovetailPodcasts Player class.
 *
 * @package DovetailPodcasts\Content\Player
 */

namespace DovetailPodcasts\Content\Player;

/**
 * Player class
 *
 * @package DovetailPodcasts\Content\Player
 */
class Player {

	/**
	 * Initialize Admin functionality for WPGraphQL
	 *
	 * @return void
	 */
	public function init() {
		$this->player_block();
		$this->actions();
		$this->filters();
		$this->shortcodes();
	}

	/**
	 * Setup actions.
	 */
	private function actions(): void {
		// Add action hooks here.
	}

	/**
	 * Setup filters.
	 */
	private function filters(): void {
		// Add filter hooks here.
		add_filter( 'hooked_block_types', [ $this, 'hooked_block_types' ], 10, 4 );
	}

	/**
	 * Registers all block assets so that they can be enqueued through the block editor
	 * in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/applying-styles-with-stylesheets/
	 */
	private function player_block() {

		$build_dir            = __DIR__ . '/blocks/build';
		$blocks_manifest_path = __DIR__ . '/blocks/blocks-manifest.php';
		$manifest_data        = require $blocks_manifest_path;

		// Register blocks.
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) { // Function introduced in WordPress 6.8.
			wp_register_block_types_from_metadata_collection( $build_dir, $blocks_manifest_path );
		} else {
			if ( function_exists( 'wp_register_block_metadata_collection' ) ) { // Function introduced in WordPress 6.7.
				wp_register_block_metadata_collection( $build_dir, $blocks_manifest_path );
			}
			foreach ( array_keys( $manifest_data ) as $block_type ) {
				register_block_type( $build_dir . "/{$block_type}" );
			}
		}

		// Register shortcodes.
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			$callback = "render_{$block_type}_shortcode";

			if ( ! method_exists( $this, $callback ) ) {
				$callback = 'render_block_shortcode';
			}

			add_shortcode( DTPODCASTS_SHORTCODE_PREFIX . $block_type, [ $this, $callback ] );
		}
	}

	/**
	 * TODO: Remove this method. Probably won't be hooking any blocks.
	 * Hooked block types hook to insert player block.
	 *
	 * @param string[]                                        $hooked_blocks The list of hooked block types.
	 * @param string                                          $position The relative position of the hooked blocks. Can be one of 'before', 'after', 'first_child', or 'last_child'.
	 * @param string                                          $anchor_block The anchor block type.
	 * @param \WP_Block_Template|\WP_Post|array<string,mixed> $context The block template, template part, wp_navigation post type, or pattern that the anchor block belongs to.
	 * @return string[]
	 */
	public function hooked_block_types( $hooked_blocks, $position, $anchor_block, $context ) {
		if ( $context instanceof WP_Block_Template ) {
			if (
				'core/post-title' === $anchor_block &&
				'single' === $context->slug
			) {
				error_log( print_r( $context, true ) );
			}
		}

		return $hooked_blocks;
	}

	/**
	 * Setup shortcodes.
	 */
	private function shortcodes(): void {
		add_shortcode( DTPODCASTS_SHORTCODE_PREFIX . 'enclosure-href', [ $this, 'render_enclosure_href_shortcode' ] );
	}

	/**
	 * Add player to content.
	 *
	 * @param string $content Content to add player to.
	 * @return string
	 */
	public function the_content( string $content ) {
		global $post;

		// Do NOT add player when...
		$exclude_player =
			! ( in_the_loop() && is_main_query() ) ||
			// In a feed.
			is_feed() ||
			// There is no post object or id.
			empty( $post->ID ) || ! is_object( $post ) ||
			// The post is password protected and password is not valid.
			( function_exists( 'post_password_required' ) && post_password_required( $post ) );

		$pattern = get_shortcode_regex( [ DTPODCASTS_SHORTCODE_PREFIX . 'player' ] );
		preg_match_all( "/{$pattern}/", $content, $matches, PREG_SET_ORDER );

		if ( ! empty( $matches ) ) {
			$exclude_values = [
				"post_id=\"{$post->ID}\"",
			];
			$enclosure      = $this->get_dovetail_enclosure( $post->ID );

			if ( ! empty( $enclosure ) ) {
				// Do not match querystring.
				// Do not match closing quotation mark to allow for haystack values with a querystring to match.
				$exclude_values[] = 'src="' . preg_replace( '~\?.+$~', '', $enclosure['href'] );
			}

			$exclude_player = array_reduce(
				$matches,
				static fn( $a, $m ) => $a || array_reduce(
					$exclude_values,
					static fn( $c, $v ) => $c || stripos( $m[3], $v ),
					$a
				),
				$exclude_player
			);
		}

		if ( $exclude_player ) {
			return $content;
		}

		$player_html = $this->get_player_html( $post->ID );

		if ( is_singular() ) {
			return $player_html . $content;
		}

		return $content . $player_html;
	}

	/**
	 * Render Dovetail enclosure href shortcode.
	 *
	 * @param array<string,string> $atts Shortcode attributes.
	 * @return string
	 */
	public function render_enclosure_href_shortcode( $atts ) {
		if ( ! is_array( $atts ) ) {
			$atts = [];
		}

		$atts = shortcode_atts(
			[
				'post_id' => null,
			],
			$atts
		);

		$enclosure = $this->get_dovetail_enclosure( $atts['post_id'] );
		if ( empty( $enclosure ) ) {
			// No meta data on post, so nothing to render.
			return '';
		}

		return $this->prepare_player_src( $enclosure['href'] );
	}

	/**
	 * Render Dovetail podcast player block.
	 *
	 * @param array<string,string> $atts Block attributes.
	 * @param string               $content Block content.
	 * @param \WP_Block            $block Block instance object.
	 * @return string
	 */
	public function render_player_block( $atts, string $content, \WP_Block $block ) {
		error_log( __FUNCTION__ );
		error_log( print_r( $atts, true ) );
		error_log( $content );

		if ( ! is_array( $atts ) ) {
			$atts = [];
		}

		$atts = shortcode_atts(
			$this->get_block_attributes_defaults( 'player' ),
			$atts
		);

		if ( empty( $atts['src'] ) ) {
			// No src passed as an attribute.
			// Try to get one from the post meta data.
			$enclosure = $this->get_dovetail_enclosure( $atts['post_id'] );

			if ( empty( $enclosure ) ) {
				// No meta data on post, so nothing to render.
				return '';
			}
			// Use enclosure href and continue.
			$atts['src']      = $enclosure['href'];
			$atts['duration'] = $enclosure['duration'];
		}

		$audio_src = $this->prepare_player_src( $atts['src'] );

		$wrapper_attributes = get_block_wrapper_attributes(
			[
				'src' => $audio_src,
			]
		);

		$inner_blocks_html = '';
		foreach ( $block->inner_blocks as $inner_block ) {
			$inner_blocks_html .= $inner_block->render();
		}

		return implode(
			'',
			[
				sprintf( '<dtpc-player %1$s>', $wrapper_attributes ),
				$inner_blocks_html,
				'</dtpc-player>',
			]
		);
	}

	/**
	 * Render Dovetail podcast player block.
	 *
	 * @param array<string,string> $atts Block attributes.
	 * @param string               $content Block content.
	 * @param \WP_Block            $block Block instance object.
	 * @return string
	 */
	public function render_play_button_block( $atts, string $content, \WP_Block $block ) {
		error_log( __FUNCTION__ );
		error_log( print_r( $atts, true ) );

		if ( ! is_array( $atts ) ) {
			$atts = [];
		}

		$atts = shortcode_atts(
			$this->get_block_attributes_defaults( 'play-button' ),
			$atts
		);

		$wrapper_attributes = get_block_wrapper_attributes( $atts );

		return implode(
			'',
			[
				sprintf( '<dtpc-play-button %1$s>', $wrapper_attributes ),
				'</dtpc-play-button>',
			]
		);
	}

	/**
	 * Render Dovetail Podcast player progress bar block.
	 *
	 * @param array<string,string> $atts Block attributes.
	 * @param string               $content Block content.
	 * @param \WP_Block            $block Block instance object.
	 * @return string
	 */
	public function render_progress_bar_block( $atts, string $content, \WP_Block $block ) {
		error_log( __FUNCTION__ );
		error_log( print_r( $atts, true ) );

		if ( ! is_array( $atts ) ) {
			$atts = [];
		}

		$atts = shortcode_atts(
			$this->get_block_attributes_defaults( 'progress-bar' ),
			$atts
		);

		$wrapper_attributes = get_block_wrapper_attributes( $atts );

		return implode(
			'',
			[
				sprintf( '<dtpc-progress-bar %1$s>', $wrapper_attributes ),
				'</dtpc-progress-bar>',
			]
		);
	}

	/**
	 * Render Dovetail Podcast player time current block.
	 *
	 * @param array<string,string> $atts Block attributes.
	 * @param string               $content Block content.
	 * @param \WP_Block            $block Block instance object.
	 * @return string
	 */
	public function render_time_current_block( $atts, string $content, \WP_Block $block ) {
		error_log( __FUNCTION__ );
		error_log( print_r( $atts, true ) );

		if ( ! is_array( $atts ) ) {
			$atts = [];
		}

		$atts = shortcode_atts(
			$this->get_block_attributes_defaults( 'time-current' ),
			$atts
		);

		$wrapper_attributes = get_block_wrapper_attributes( $atts );

		return implode(
			'',
			[
				sprintf( '<dtpc-time-current %1$s>', $wrapper_attributes ),
				'</dtpc-time-current>',
			]
		);
	}

	/**
	 * Render Dovetail Podcast player time display block.
	 *
	 * @param array<string,string> $atts Block attributes.
	 * @param string               $content Block content.
	 * @param \WP_Block            $block Block instance object.
	 * @return string
	 */
	public function render_time_display_block( $atts, string $content, \WP_Block $block ) {
		error_log( __FUNCTION__ );
		error_log( print_r( $atts, true ) );

		if ( ! is_array( $atts ) ) {
			$atts = [];
		}

		$atts = shortcode_atts(
			$this->get_block_attributes_defaults( 'time-display' ),
			$atts
		);

		$wrapper_attributes = get_block_wrapper_attributes( $atts );

		return implode(
			'',
			[
				sprintf( '<dtpc-time-display %1$s>', $wrapper_attributes ),
				'</dtpc-time-display>',
			]
		);
	}

	/**
	 * Render Dovetail Podcast player time duration block.
	 *
	 * @param array<string,string> $atts Block attributes.
	 * @param string               $content Block content.
	 * @param \WP_Block            $block Block instance object.
	 * @return string
	 */
	public function render_time_duration_block( $atts, string $content, \WP_Block $block ) {
		error_log( __FUNCTION__ );
		error_log( print_r( $atts, true ) );

		if ( ! is_array( $atts ) ) {
			$atts = [];
		}

		$atts = shortcode_atts(
			$this->get_block_attributes_defaults( 'time-duration' ),
			$atts
		);

		$wrapper_attributes = get_block_wrapper_attributes( $atts );

		return implode(
			'',
			[
				sprintf( '<dtpc-time-duration %1$s>', $wrapper_attributes ),
				'</dtpc-time-duration>',
			]
		);
	}

	/**
	 * Render block shortcode.
	 *
	 * @param array<string,string> $atts Shortcode attributes.
	 * @param string|null          $content Shortcode content or null if not set.
	 * @param string               $shortcode_tag Shortcode tag.
	 * @return string
	 */
	public function render_block_shortcode( array $atts, string $content, string $shortcode_tag ) {

		$block_type = preg_replace( '~^' . DTPODCASTS_SHORTCODE_PREFIX . '~', '', $shortcode_tag );

		error_log( $block_type );

		return render_block(
			[
				'blockName' => "dovetail-podcasts/{$block_type}",
				'attrs'     => $atts,
			]
		);
	}

	/**
	 * Render Dovetail podcast player shortcode.
	 *
	 * @param array<string,string> $atts Shortcode attributes.
	 * @param string|null          $content Shortcode content or null if not set.
	 * @return string
	 */
	public function render_player_shortcode( array $atts, string $content = null ) {

		if ( ! is_array( $atts ) ) {
			$atts = [];
		}

		$atts = shortcode_atts(
			$this->get_block_attributes_defaults( 'player' ),
			$atts
		);

		if ( empty( $atts['src'] ) ) {
			// No src passed as an attribute.
			// Try to get one from the post meta data.
			$enclosure = $this->get_dovetail_enclosure( $atts['post_id'] );

			if ( ! empty( $enclosure ) ) {
				// Use enclosure href and continue.
				$atts['src']      = $enclosure['href'];
				$atts['duration'] = $enclosure['duration'];
			}
		}

		$block = [
			'blockName'   => 'dovetail-podcasts/player',
			'attrs'       => $atts,
			'innerBlocks' => [],
		];

		if ( $content ) {
			// Only render player block shortcodes in the content.

			// Get registered player blocks.
			$blocks_manifest_path = __DIR__ . '/blocks/blocks-manifest.php';
			$manifest_data        = require $blocks_manifest_path;

			// Generate the short code tags of the blocks.
			$shortcode_tags = [];
			foreach ( array_keys( $manifest_data ) as $block_type ) {
				if ( 'player' !== $block_type ) {
					$shortcode_tags[] = DTPODCASTS_SHORTCODE_PREFIX . $block_type;
				}
			}

			// Get content that matches our player block short codes.
			$pattern = get_shortcode_regex( $shortcode_tags );
			preg_match_all( "/{$pattern}/", $content, $matches, PREG_SET_ORDER );

			// Add inner blocks for matching content.
			foreach ( $matches as $match ) {
				$block_type             = preg_replace( '~^' . DTPODCASTS_SHORTCODE_PREFIX . '~', '', $match[2] );
				$default_atts           = $this->get_block_attributes_defaults( $block_type );
				$block['innerBlocks'][] = [
					'blockName' => "dovetail-podcasts/{$block_type}",
					'attrs'     => shortcode_atts(
						$default_atts,
						array_merge( shortcode_parse_atts( $match[3] ), $atts )
					),
				];
			}
		} else {
			// Make sure there are default controls when the shortcode has no content.
			$block['innerBlocks'] = [
				[
					'blockName' => 'dovetail-podcasts/play-button',
				],
				[
					'blockName' => 'dovetail-podcasts/progress-bar',
				],
				[
					'blockName' => 'dovetail-podcasts/time-display',
				],
				// TODO: Add volume slider.
			];
		}

		return render_block( $block );
	}

	/**
	 * Prepare URL for use as an audio source.
	 *
	 * @param string $src Player source URL..
	 * @return string
	 */
	public function prepare_player_src( string $src ) {

		if ( empty( $src ) ) {
			return $src;
		}

		return add_query_arg(
			[
				'_from' => rawurlencode(
					implode(
						'/',
						[
							'wp',
							'dtpc',
							trim( preg_replace( '~^.+://~', '', get_site_url() ) ),
						]
					)
				),
			],
			$src
		);
	}

	/**
	 * Get default values for block type's attributes.
	 *
	 * @param string $block_type Block type key from blocks manifest array.
	 * @return array<string,mixed>
	 */
	public function get_block_attributes_defaults( string $block_type ) {
		// Get registered player blocks.
		$blocks_manifest_path = __DIR__ . '/blocks/blocks-manifest.php';
		$manifest_data        = require $blocks_manifest_path;

		$default_atts = isset( $manifest_data[ $block_type ]['attributes'] ) ?
		array_map( static fn( $attr ) => isset( $attr['default'] ) ? $attr['default'] : null, $manifest_data[ $block_type ]['attributes'] ) :
		[];

		return $default_atts;
	}

	/**
	 * Get the html for the podcast player.
	 *
	 * @param int $post_id Podcast episode post id.
	 * @return string
	 */
	public function get_player_html( int $post_id = null ) {
		global $post;

		if ( ! $post_id && is_object( $post ) && ! empty( $post->ID ) ) {
			$post_id = $post->ID;
		}

		// TODO: May need to do some stuff with post id to customize attributes.

		return do_shortcode(
			implode(
				'',
				[
					'[',
					DTPODCASTS_SHORTCODE_PREFIX,
					'player ',
					implode(
						' ',
						[
							// TODO: This can be removed once $post_id is used elsewhere.
							sprintf( 'post_id="%1$s"', esc_attr( $post_id ) ),
						]
					),
					']',
				]
			)
		);
	}

	/**
	 * Get the Dovetail enclosure data for a podcast episode post, defaulting to global post.
	 *
	 * @param int $post_id Podcast episode post id.
	 * @return array<string,mixed>|null
	 */
	public function get_dovetail_enclosure( int $post_id = null ) {
		global $post;

		if ( ! $post_id && is_object( $post ) && ! empty( $post->ID ) ) {
			$post_id = $post->ID;
		}

		$meta = get_post_meta( $post_id, DTPODCASTS_POST_META_KEY, true );

		/**
		 * Return enclosure data when:
		 * - Enclosure data exists.
		 * - Audio has been processed
		 *   - `size` is > 0. Initial enclosure processing will have an href, but the URL will not return audio.
		 */
		if (
			! empty( $meta ) && isset( $meta['dovetail']['enclosure'] ) &&
			$meta['dovetail']['enclosure']['size'] > 0
		) {
			// TODO: Get latest prefix from podcast and construct fresh href.
			return $meta['dovetail']['enclosure'];
		}

		return null;
	}

	/**
	 * Helper function that defines the allowed HTML to use on the Settings pages
	 *
	 * @return array<string,array<string,mixed>>
	 */
	public static function get_allowed_wp_kses_html() {
		$allowed_atts = [
			'class' => [],
			'id'    => [],
			'style' => [],
		];

		return [
			'div'                => $allowed_atts,
			'dtpc-player'        => array_merge(
				[
					'src' => [],
				],
				$allowed_atts
			),
			'dtpc-play-button'   => $allowed_atts,
			'dtpc-progress-bar'  => array_merge(
				[
					'duration' => [],
				],
				$allowed_atts
			),
			'dtpc-time-current'  => $allowed_atts,
			'dtpc-time-display'  => array_merge(
				[
					'duration' => [],
				],
				$allowed_atts
			),
			'dtpc-time-duration' => array_merge(
				[
					'duration' => [],
				],
				$allowed_atts
			),
		];
	}
}
