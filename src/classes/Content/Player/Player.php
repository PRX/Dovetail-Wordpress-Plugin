<?php
/**
 * The DovetailPodcasts Player class.
 *
 * @package DovetailPodcasts\Content\Player
 */

namespace DovetailPodcasts\Content\Player;

use DovetailPodcasts\Admin\Settings\SettingsApi;
use DovetailPodcasts\Dovetail\DovetailApi;
use DovetailPodcasts\Utils\Utils;

/**
 * Player class
 *
 * @package DovetailPodcasts\Content\Player
 */
class Player {

	/**
	 * Dovetail Api instance.
	 *
	 * @var \DovetailPodcasts\Dovetail\DovetailApi
	 */
	public $dovetail_api;

	/**
	 * Class construct.
	 */
	public function __construct() {
		$this->dovetail_api = new DovetailApi();
	}

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
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_player_styles' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_player_styles' ] );
	}

	/**
	 * Setup filters.
	 */
	private function filters(): void {
		// Add filter hooks here.
	}

	/**
	 * Registers all block assets so that they can be enqueued through the block editor
	 * in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/applying-styles-with-stylesheets/
	 */
	private function player_block() {

		$build_dir            = DTPODCASTS_PLUGIN_DIR . 'build/blocks/player';
		$blocks_manifest_path = $build_dir . '/blocks-manifest.php';
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
	 * Setup shortcodes.
	 */
	private function shortcodes(): void {
		add_shortcode( DTPODCASTS_SHORTCODE_PREFIX . 'enclosure-href', [ $this, 'render_enclosure_href_shortcode' ] );
	}

	/**
	 * Enqueue player styles css.
	 *
	 * @return void
	 */
	public function enqueue_player_styles() {
		$is_player_customization_enabled = 'on' === SettingsApi::get_option( 'player_customization_enabled', 'player' );

		if ( $is_player_customization_enabled && ! wp_style_is( 'dtpc-player-style', 'enqueued' ) ) {
			$version = get_option( 'dovetail_player_style_version', time() );
			$url     = wp_upload_dir()['baseurl'] . '/dtpc/css/dtpc-player-style.css';

			wp_enqueue_style(
				'dtpc-player-style',
				esc_url( set_url_scheme( $url ) ),
				[],
				$version
			);
		}
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

		$ctx_atts = $this->get_attributes_from_post_context( $atts['post_id'] );
		if ( empty( $ctx_atts ) ) {
			// No meta data on post, so nothing to render.
			return '';
		}

		return $this->prepare_player_src( $ctx_atts['src'] );
	}

	/**
	 * Render Dovetail podcast mute button block.
	 *
	 * @param array<string,string> $atts Block attributes.
	 * @param string               $content Block content.
	 * @param \WP_Block            $block Block instance object.
	 * @return string
	 */
	public function render_block( $atts, string $content, \WP_Block $block ) {

		global $dtpc_player_show_controls;

		list(, $block_type) = explode( '/', $block->name );

		if ( ! is_array( $atts ) ) {
			$atts = [];
		}

		$atts = shortcode_atts(
			$this->get_block_attributes_defaults( $block_type ),
			$atts
		);

		$callback = "render_{$block_type}_block";

		if ( method_exists( $this, $callback ) ) {
			return call_user_func_array( [ $this, $callback ], [ $atts, $content, $block ] );
		}

		if ( ! $dtpc_player_show_controls ) {
			return '';
		}

		$wrapper_attributes = get_block_wrapper_attributes( $atts );

		return implode(
			'',
			[
				sprintf( '<dtpc-%1$s %2$s>', $block_type, $wrapper_attributes ),
				$content,
				sprintf( '</dtpc-%1$s>', $block_type ),
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
	public function render_player_block( $atts, string $content, \WP_Block $block = null ) {

		global $dtpc_player_show_controls;

		$dtpc_player_show_controls = true;

		$default_atts = $this->get_block_attributes_defaults( 'player' );

		if ( ! is_array( $atts ) ) {
			$atts = [];
		}

		$atts = shortcode_atts(
			$default_atts,
			$atts
		);

		if ( isset( $atts['post_id'] ) && empty( $atts['src'] ) ) {
			// Block editor will add post enclosure URL as the src.
			// We need to unset that so the updated dovetail enclosure URL
			// will be used.
			unset( $atts['src'] );
		}

		if ( empty( $atts['src'] ) ) {
			// No src passed as an attribute.
			// Try to get one from the post meta data.
			$ctx_atts = $this->get_attributes_from_post_context( $atts['post_id'] );

			if ( empty( $ctx_atts ) ) {
				$dtpc_player_show_controls = false;
			}

			// Use post context attributes.
			$atts = array_merge(
				$atts,
				$ctx_atts
			);
		}

		if ( isset( $atts['src'] ) ) {
			$atts['src'] = $this->prepare_player_src( $atts['src'] );
		}

		$inner_blocks_html = '';
		if ( $block && ! empty( $block->inner_blocks ) ) {
			foreach ( $block->inner_blocks as $inner_block ) {
				$inner_blocks_html .= $inner_block->render();
			}
		} elseif ( $block && ! empty( $block->inner_html ) ) {
			$inner_blocks_html = $block->inner_html;
		} else {
			$inner_blocks_html = $content;
		}

		if ( empty( $inner_blocks_html ) ) {
			$atts['layout'] = 'default';
		} elseif ( empty( $atts['layout'] ) ) {
			unset( $atts['layout'] );
		}

		if ( $dtpc_player_show_controls && in_array( $atts['backdrop'], [ 1,'1',true,'true','on' ], true ) ) {
			$atts['backdrop'] = 'true';
		} else {
			unset( $atts['backdrop'] );
		}

		$atts = array_filter( $atts );

		// Don't render anything if we are not rendering controls in the default layout.
		if ( ! $dtpc_player_show_controls && isset( $atts['layout'] ) && 'default' === $atts['layout'] ) {
			return '';
		}

		$wrapper_attributes = get_block_wrapper_attributes(
			$atts
		);

		$player_html = implode(
			'',
			[
				sprintf( '<dtpc-player %1$s>', $wrapper_attributes ),
				$inner_blocks_html,
				'</dtpc-player>',
			]
		);

		return apply_filters( 'dtpc_player_block_html', $player_html, $atts );
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

		return render_block(
			[
				'blockName' => "dovetail-podcasts-player/{$block_type}",
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

		$player_html = render_block(
			[
				'blockName' => 'dovetail-podcasts-player/player',
				'attrs'     => $atts,
				'innerHTML' => '__inner_html__',
			]
		);

		return str_replace( '__inner_html__', do_shortcode( $content ), $player_html );
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
		$blocks_manifest_path = DTPODCASTS_PLUGIN_DIR . 'build/blocks/player/blocks-manifest.php';
		$manifest_data        = require $blocks_manifest_path;

		return isset( $manifest_data[ $block_type ]['attributes'] ) ?
		array_map(
			static function ( $attr ) {
				return isset( $attr['default'] ) ? $attr['default'] : null;
			},
			$manifest_data[ $block_type ]['attributes']
		) :
		[];
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
	 * @return array<string,mixed>
	 */
	public function get_attributes_from_post_context( int $post_id = null ) {

		$atts = [];

		if ( ! $post_id ) {
			$post_id = get_the_ID();
		}

		$post = get_post( $post_id );

		if ( ! $post ) {
			return $atts;
		}

		$meta = get_post_meta( $post_id, DTPODCASTS_POST_META_KEY, true );

		// If meta data is missing, check Dovetail for the episode using post guid.
		if ( ! isset( $meta['dovetail']['id'] ) ) {
			// Check if this post was imported into Dovetail using a WordPress RSS feed.
			list( $podcasts_api ) = $this->dovetail_api->get_podcasts();

			if (
				$podcasts_api &&
				is_array( $podcasts_api ) &&
				isset( $podcasts_api['_embedded']['prx:items'] )
			) {
				foreach ( $podcasts_api['_embedded']['prx:items'] as $p ) {
					// TODO: Check podcast taxonomy hash for podcast term id,...
					// TODO: If no hash is found, get podcasts taxonomy from settings and check for term matching name of DT podcast title.
					// TODO: If term is found,...
					// TODO: ...store hash of DT podcast id to term id,...
					// TODO: ...add DT podcast id to term meta data,...
					// ????: Should everything before this be a Util method?
					// TODO: ...`continue` loop if post is not assigned the term.

					list( $episode_api ) = $this->dovetail_api->get_podcast_episode_by_guid( $p['id'], $post->guid );

					// If there isn't a Dovetail episode using the WordPress generated post guid, the episode
					// could have been imported from a third party feed that used mirrored post data that did not preserve
					// the WordPress post guid, eg. SSP Plugin to Castos.
					// Look for Dovetail episode with the same publish date and title...
					if ( ! $episode_api && property_exists( $post, 'post_date_gmt' ) && $post->post_date_gmt ) {
						list( $episode_api ) = $this->dovetail_api->get_podcast_episodes_by_publish_date_and_title( $p['id'], $post->post_date_gmt, $post->post_title );
					}

					if ( $episode_api ) {
						if ( ! is_array( $meta ) ) {
							$meta = [];
						}
						$meta['podcastId'] = $p['id'];
						$meta['dovetail']  = Utils::parse_episode_api_data( $episode_api );

						// Try to get media data from uncut prop first...
						if ( isset( $episode_api['uncut'] ) && ! empty( $episode_api['uncut'] ) ) {
							$media = $episode_api['uncut'];
						} else {
							// ...fallback to first media item.
							$media = $episode_api['media'][0];
						}

						// Media's original URL should be trusted to be to an existing file.
						// It may be a Dovetail URL depending on what processing has been done to it.
						$meta['enclosure']['url'] = $media['originalUrl'];
						// Media's duration should be the original duration of the uploaded file.
						$meta['enclosure']['duration'] = $media['duration'];
						// Enclosure's href should still contain the original filename.
						$meta['enclosure']['filename'] = basename( $episode_api['_links']['enclosure']['href'] );

						// Check if an attachment exists for the enclosure href filename.
						$media_id = Utils::get_attachment_id( $episode_api['_links']['enclosure']['href'] );
						if ( $media_id > 0 ) {
							$meta['enclosure']['mediaId'] = $media_id;
							// Update enclosure URL in case the media original URL was altered during processing.
							$meta['enclosure']['url'] = wp_get_attachment_url( $media_id );
						}

						break;
					}
				}

				// If we have meta data, save it with updates that may have come from Dovetail API.
				if ( ! empty( $meta ) ) {
					if ( ! add_post_meta( $post->ID, DTPODCASTS_POST_META_KEY, $meta, true ) ) {
						update_post_meta( $post->ID, DTPODCASTS_POST_META_KEY, $meta );
					}
				}
			}
		}

		/**
		 * Return Dovetail enclosure data when:
		 * - Dovetail Enclosure data exists.
		 * - Audio has been processed
		 *   - `size` is > 0. Initial enclosure processing will have an href, but the URL will not return audio.
		 */
		if (
			'publish' === $post->post_status &&
			! empty( $meta ) &&
			isset( $meta['dovetail']['enclosure'] ) && ! empty( $meta['dovetail']['enclosure'] ) &&
			$meta['dovetail']['enclosure']['size'] > 0
		) {
			// TODO: Get latest prefix from podcast and construct fresh href.
			$atts['src']      = $meta['dovetail']['enclosure']['href'];
			$atts['duration'] = $meta['dovetail']['enclosure']['duration'];
		}

		/**
		 * Return enclosure data when.
		 * - Post is not published.
		 * - Episode meta data has enclosure.
		 */
		if ( 'publish' !== $post->post_status && isset( $meta['enclosure'] ) && ! empty( $meta['enclosure'] ) ) {
			$atts['src']      = $meta['enclosure']['url'];
			$atts['duration'] = $meta['enclosure']['duration'];
		}

		return $atts;
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
			'title' => [],
		];

		return [
			'div'                  => $allowed_atts,
			'h1'                   => $allowed_atts,
			'h2'                   => $allowed_atts,
			'h3'                   => $allowed_atts,
			'h4'                   => $allowed_atts,
			'h5'                   => $allowed_atts,
			'h6'                   => $allowed_atts,
			'p'                    => $allowed_atts,
			'span'                 => $allowed_atts,
			'a'                    => array_merge(
				[
					'href'   => [],
					'target' => [],
				],
				$allowed_atts
			),
			'figure'               => $allowed_atts,
			'img'                  => array_merge(
				[
					'src'           => [],
					'srcset'        => [],
					'sizes'         => [],
					'alt'           => [],
					'width'         => [],
					'height'        => [],
					'decoding'      => [],
					'fetchpriority' => [],
				],
				$allowed_atts
			),
			'time'                 => array_merge(
				[
					'datetime' => [],
				],
				$allowed_atts
			),
			'dtpc-player'          => array_merge(
				[
					'duration' => [],
					'layout'   => [],
					'src'      => [],
					'backdrop' => [],
				],
				$allowed_atts
			),
			'dtpc-mute-button'     => $allowed_atts,
			'dtpc-play-button'     => $allowed_atts,
			'dtpc-progress-bar'    => array_merge(
				[
					'duration' => [],
				],
				$allowed_atts
			),
			'dtpc-time-current'    => $allowed_atts,
			'dtpc-time-display'    => array_merge(
				[
					'duration' => [],
				],
				$allowed_atts
			),
			'dtpc-time-duration'   => array_merge(
				[
					'duration' => [],
				],
				$allowed_atts
			),
			'dtpc-volume-controls' => array_merge(
				[
					'volume' => [],
				],
				$allowed_atts
			),
			'dtpc-volume-slider'   => array_merge(
				[
					'volume' => [],
				],
				$allowed_atts
			),
		];
	}
}
