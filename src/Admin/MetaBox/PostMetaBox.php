<?php
/**
 * The DovetailPodcasts PostMetaBox class.
 *
 * @package DovetailPodcasts\Admin\MetaBox
 */

namespace DovetailPodcasts\Admin\MetaBox;

use DovetailPodcasts\Admin\Settings\SettingsApi;
use DovetailPodcasts\Dovetail\DovetailApi;

/**
 * PostMetaBox class
 *
 * @package DovetailPodcasts\Admin\MetaBox
 */
class PostMetaBox {

	/**
	 * Id of element metabox app will be rendered into.
	 */
	public const APP_CONTAINER_ID = 'dovetail-podcast--podcast-episode-metabox';

	/**
	 * Settings API instance.
	 *
	 * @var \DovetailPodcasts\Admin\Settings\SettingsApi
	 */
	public $settings_api;

	/**
	 * Dovetail Api instance.
	 *
	 * @var \DovetailPodcasts\Dovetail\DovetailApi
	 */
	public $dovetail_api;

	/**
	 * Configured post types the metabox should be shown on.
	 *
	 * @var array<string,string>
	 */
	public $post_types;

	/**
	 * Initialize settings.
	 *
	 * @return void
	 */
	public function init() {
		$this->settings_api = new SettingsApi();
		$this->dovetail_api = new DovetailApi();

		$this->post_types = $this->settings_api->get_option( 'post_types', 'general' );

		add_action( 'add_meta_boxes', [ $this, 'initialize_meta_box' ], 999, 2 );
		add_action( 'save_post', [ $this, 'save_post' ], 999, 3 );
	}

	/**
	 * Enqueue scripts and styles.
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts() {
		global $post;

		$meta = $this->get_episode_meta_data();

		$options = $this->get_post_meta_box_options();

		wp_enqueue_media();
		wp_enqueue_script( DTPODCASTS_SETTINGS_SECTION_PREFIX, DTPODCASTS_PLUGIN_URL . 'scripts/podcast-episode-metabox.js', [ 'jquery' ], DTPODCASTS_VERSION, [ 'strategy' => 'defer' ] );

		wp_localize_script(
			DTPODCASTS_SETTINGS_SECTION_PREFIX,
			'appLocalizer',
			[
				'appContainerId'         => self::APP_CONTAINER_ID,
				'postId'                 => $post->ID,
				'postStatus'             => $post->post_status,
				'postTitle'              => $post->post_title,
				'episodeMetaDataField'   => DTPODCASTS_POST_META_KEY . '_json',
				'episodeMetaDataJson'    => wp_json_encode( $meta ),
				'postMetaboxOptionsJson' => wp_json_encode( $options ),
				'audioFormats'           => wp_get_audio_extensions(),
				'nonce'                  => wp_create_nonce( 'wp_rest' ),
			]
		);

		// Action to enqueue scripts on the Dovetail Podcasts Settings page.
		do_action( 'dovetail_podcasts_post_metabox_enqueue_scripts' );
	}

	/**
	 * Get episode meta data for a podcast episode post.
	 *
	 * @param int $post_id Podcast episode post id to get meta data for.
	 * @return array<string,mixed> Episode meta data.
	 */
	public function get_episode_meta_data( int $post_id = null ) {
		global $post;

		if ( ! $post_id ) {
			$post_id = $post->ID;
		}

		$meta = get_post_meta( $post_id, DTPODCASTS_POST_META_KEY, true );

		error_log( __FUNCTION__ . '::' . __LINE__ );
		error_log( print_r( $meta, true ) );

		if ( isset( $meta['enclosure']['mediaId'] ) ) {
			$media = get_post( $meta['enclosure']['mediaId'] );
			if ( ! $media ) {
				// Episode media was deleted since the last time this post was edited.
				// Remove media id and update metadata.
				unset( $meta['enclosure']['mediaId'] );
				unset( $meta['enclosure']['url'] );
				update_post_meta( $post->ID, DTPODCASTS_POST_META_KEY, $meta );
			}
		}

		if ( ! isset( $meta['dovetail']['id'] ) ) {
			// Check if this post was imported into Dovetail.
			$podcasts_api = $this->dovetail_api->get_podcasts();
			if (
				$podcasts_api &&
				is_array( $podcasts_api ) &&
				isset( $podcasts_api['_embedded']['prx:items'] )
			) {
				foreach ( $podcasts_api['_embedded']['prx:items'] as $p ) {
					$e = $this->dovetail_api->get_podcast_episode_by_guid( $p['id'], $post->guid );
					if ( $e ) {
						$meta['podcastId'] = $p['id'];
						$meta['dovetail']  = $this->parse_episode_api_data( $e );

						break;
					}
				}
			}
		} else {
			// This post has been connected to a Dovetail episode.
			// Get current Dovetail episode data so changes in Dovetail do not get reverted
			// when user saves post changes to post.
			$e = $this->dovetail_api->get_episode( $meta['dovetail']['id'] );
			if ( $e ) {
				$meta['dovetail'] = $this->parse_episode_api_data( $e );
			}
		}
		update_post_meta( $post->ID, DTPODCASTS_POST_META_KEY, $meta );

		return $meta;
	}

	/**
	 * Parse Dovetail episode API data into our meta data model.
	 *
	 * @param array<string,mixed> $data Dovetail episode API data.
	 * @return array<string,mixed> Dovetail meta data array.
	 */
	private function parse_episode_api_data( array $data ) {
		if ( ! empty( $data ) ) {
			return [
				'id'              => $data['id'],
				'enclosure'       => $data['_links']['enclosure'],
				'itunesType'      => $data['itunesType'],
				'explicitContent' => $data['explicitContent'],
				'explicit'        => isset( $data['explicit'] ) ? 'true' === $data['explicit'] : $data['explicitContent'],
				'seasonNumber'    => isset( $data['seasonNumber'] ) ? $data['seasonNumber'] : null,
				'episodeNumber'   => isset( $data['episodeNumber'] ) ? $data['episodeNumber'] : null,
				'cleanTitle'      => isset( $data['cleanTitle'] ) ? $data['cleanTitle'] : null,
				'author'          => isset( $data['author'] ) && ! empty( $data['author'] ) ? $data['author'] : null,
			];
		}

		return $data;
	}

	/**
	 * Get options for the current post meta box.
	 *
	 * @return array<string,mixed> Episode meta data.
	 */
	public function get_post_meta_box_options() {
		global $post;

		/**
		 * Check for audio attached to post.
		 * This can occur when:
		 *  1) Audio was inserted into content.
		 *  2) Audio was upload with this meta box.
		 *
		 * Media can be attached to a post WITHOUT the user having to save the post.
		 * Attachment usually happens in the modal the user uses to upload the attachment.
		 * This means that even if the user leaves the edit screen for the post,
		 * the media that was upload is in the media library and is attached to the post.
		 *
		 * We can use this to "prefetch" the media api data needed to be shown in metabox,
		 * regardless of parent post status, since AJAX requests for media attached to an
		 * unpublished post will return a 404 error, due to attachments having an enforced
		 * status of `inherit`.
		 *
		 * We can also use this list to protect from duplicate uploads, in cases where the
		 * edit screen was refreshed before the post was saved after having podcast audio
		 * uploaded.
		 */
		$post_audio = get_attached_media( 'audio', $post );
		if ( ! empty( $post_audio ) ) {
			// Convert WP_Post objects to WP_REST_Attachment objects.
			$post_audio = array_map(
				[ $this, 'get_audio_rest_data' ],
				$post_audio
			);
		}

		$podcasts_api = $this->dovetail_api->get_podcasts();
		$podcasts     = $podcasts_api && is_array( $podcasts_api ) ? array_map(
			static fn( $p ) => [
				'enclosureTemplate' => $p['enclosureTemplate'],
				'id'                => $p['id'],
				'title'             => $p['title'],
				'explicit'          => $p['explicit'],
				'itunesImage'       => isset( $p['itunesImage'] ) ? $p['itunesImage'] : null,
				'feedImage'         => isset( $p['feedImage'] ) ? $p['feedImage'] : null,
				'author'            => isset( $p['author'] ) ? $p['author'] : null,
			],
			$podcasts_api['_embedded']['prx:items']
		) : null;

		return [
			'podcasts'      => $podcasts,
			'attachedMedia' => $post_audio,
		];
	}

	/**
	 * Get REST data for an audio post.
	 *
	 * Since media attached to unpublished posts will not be accessible in the REST API
	 * via the frontend, we need to provide that data, in REST scheme, from the backend.
	 *
	 * If there is a better way to get REST scheme structured post data, please let me know.
	 *
	 * @param \WP_Post $audio_post Audio attachment post object.
	 * @return \WP_REST_Attachment Attachment REST data object.
	 */
	private function get_audio_rest_data( \WP_Post $audio_post ) {
		global $post;

		// Backup current post object.
		$_post_backup = $post;

		$request               = new \WP_REST_Request( 'GET', '/wp/v2/media/' . $audio_post->ID );
		$attachment_controller = new \WP_REST_Attachments_Controller( 'attachment' );
		// This will change the global post object to the $audio_post arg...
		$item = $attachment_controller->prepare_item_for_response( $audio_post, $request );

		// ...so we need to restore the backed up post object.
		// phpcs:ignore
		$GLOBALS['post'] = $_post_backup;
		setup_postdata( $_post_backup );

		return $item->data;
	}

	/**
	 * Initialize Dovetail podcast episode meta box on configured post types.
	 *
	 * @param string $post_type Post type name.
	 * @return void
	 */
	public function initialize_meta_box( string $post_type ) {

		if ( is_array( $this->post_types ) && in_array( $post_type, $this->post_types, true ) ) {
			add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
		}

		add_meta_box( 'dovetail-podcasts-episode', 'Podcast Episode', [ $this, 'render_meta_box' ], $this->post_types, 'normal' );
	}

	/**
	 * Render meta box UI container element.
	 *
	 * @return void
	 */
	public function render_meta_box() {
		?>
		<input type="hidden"
			name="<?php echo esc_attr( DTPODCASTS_POST_META_KEY . '_nonce' ); ?>"
			value="<?php echo esc_attr( wp_create_nonce( self::APP_CONTAINER_ID ) ); ?>"
		/>
		<div id="<?php echo esc_attr( self::APP_CONTAINER_ID ); ?>" class="tailwind">
			<div style="margin-block-start: 12px; min-height: 2.5rem"></div>
		</div>
		<?php
	}

	/**
	 * Post save hook
	 *
	 * Should save meta box data, and sync post data with Dovetail.
	 *
	 * @param int      $post_id Post ID.
	 * @param \WP_Post $post Post object.
	 * @param bool     $update Whether this is an existing post being updated.
	 * @return void
	 */
	public function save_post( int $post_id, \WP_Post $post, bool $update ) {

		$nonce_key = DTPODCASTS_POST_META_KEY . '_nonce';
		if ( ! isset( $_POST[ $nonce_key ] ) ) {
			return;
		}
		$nonce = sanitize_text_field( wp_unslash( $_POST[ $nonce_key ] ) );
		if ( ! wp_verify_nonce( $nonce, self::APP_CONTAINER_ID ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		// Check if post type matches settings.
		$post_types = $this->settings_api->get_option( 'post_types', 'general' );
		$post_types = is_array( $post_types ) ? $post_types : [];
		if ( ! in_array( $post->post_type, $post_types, true ) ) {
			return;
		}

		// Get current meta box data.
		$meta = get_post_meta( $post_id, DTPODCASTS_POST_META_KEY, true );

		/**
		 * Check if we are removing meta box data.
		 *
		 * Podcast episode data may have been accidentally added to the wrong post.
		 * User has chosen to remove the meta box data. If a dovetail episode is
		 * attached to this episode, it should be deleted from Dovetail. We are
		 * assuming if this this case is encountered, the attached episode should not
		 * exist in the first place, and was meant to be attached, and identified by
		 * the guid of another post.
		 */
		$delete_json_key = DTPODCASTS_POST_META_KEY . '_json_DELETE';
		if ( isset( $_POST[ $delete_json_key ] ) ) {
			$dt_episode_deleted = false;
			if ( isset( $meta['dovetail']['id'] ) ) {
				// Episode has to be unpublished before it can be delete.
				$unpublished = $this->dovetail_api->update_episode( $meta['dovetail']['id'], [ 'publishedAt' => null ] );
				if ( ! isset( $unpublished['publishedAt'] ) ) {
					$dt_episode_deleted = $this->dovetail_api->delete_episode( $meta['dovetail']['id'] );
				}
			}
			if ( $dt_episode_deleted ) {
				// Delete meta data if episode was successfully deleted.
				delete_post_meta( $post_id, DTPODCASTS_POST_META_KEY );
				unset( $meta );
			}
		}

		/**
		 * Get submitted meta box data.
		 *
		 * All data is stored as JSON in a hidden input.
		 * This lets the meta box app dictate the model of the data,
		 * and simplifies the parsing of the data.
		 */
		$json_key = DTPODCASTS_POST_META_KEY . '_json';
		if ( isset( $_POST[ $json_key ] ) ) {
			$new_meta_json = sanitize_text_field( wp_unslash( $_POST[ $json_key ] ) );
			$new_meta      = json_decode( $new_meta_json, true );

			if ( is_array( $new_meta ) ) {
				$meta = $new_meta;
			}
		}

		if (
			'publish' === $post->post_status &&
			isset( $meta['podcastId'] ) &&
			is_numeric( $meta['podcastId'] ) &&
			isset( $meta['enclosure']['url'] ) &&
			! empty( $meta['enclosure']['url'] )
		) {
			$episode_data = $this->prepare_episode_api_data( $meta, $post );

			error_log( __FUNCTION__ . '::' . __LINE__ );
			error_log( wp_json_encode( $episode_data, JSON_PRETTY_PRINT ) );

			$response_data = $this->dovetail_api->save_episode( $meta['podcastId'], $episode_data );

			error_log( __FUNCTION__ . '::' . __LINE__ );
			error_log( print_r( $response_data, true ) );

			// Update meta box data with Dovetail data.
			if ( ! empty( $response_data ) ) {
				$meta['dovetail'] = $this->parse_episode_api_data( $response_data );
			}
		}

		// Remove Dovetail media from metadata, since its existence is our flag that
		// a new audio file was provided.
		if ( isset( $meta['dovetail']['media'] ) ) {
			unset( $meta['dovetail']['media'] );
		}

		if ( ! add_post_meta( $post_id, DTPODCASTS_POST_META_KEY, $meta, true ) ) {
			update_post_meta( $post_id, DTPODCASTS_POST_META_KEY, $meta );
		}
	}

	/**
	 * Prepare episode api body data, using passed or current meta data for the passed or current post.
	 *
	 * @param array<string,mixed> $meta Episode meta data to use in the data.
	 * @param \WP_Post            $post Post object to use in the data.
	 * @return array<string,mixed>|null Episode API body data. If there is no meta data or post, returns `null`.
	 */
	private function prepare_episode_api_data( array $meta = null, \WP_Post $post = null ) {
		if ( ! $post ) {
			global $post;
		}

		if ( ! $meta || empty( $meta ) ) {
			$meta = $this->get_episode_meta_data();
		}

		if ( $post && ! empty( $meta ) ) {
			$data = is_array( $meta['dovetail'] ) ? $meta['dovetail'] : [];
			$data = array_merge(
				$data,
				[
					'guid'        => $post->guid,
					'publishedAt' => $post->post_date_gmt,
					'title'       => $post->post_title,
					'description' => $post->post_content,
					'subtitle'    => $post->post_excerpt,
					'url'         => get_permalink( $post ),
					'image'       => null,
					'categories'  => null,
				]
			);

			$attachment_id = get_post_thumbnail_id( $post );
			if ( $attachment_id ) {
				$data['image'] = [
					'href'    => wp_get_attachment_url( $attachment_id ),
					'alt'     => trim( wp_strip_all_tags( get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ) ) ),
					'caption' => wp_get_attachment_caption( $attachment_id ),
				];
			}

			$post_categories = wp_get_post_categories(
				$post->ID,
				[
					'fields'  => 'names',
					'exclude' => [ 1 ],
				]
			);
			if ( ! is_wp_error( $post_categories ) && ! empty( $post_categories ) ) {
				$data['categories'] = $post_categories;
			}

			if (
				! isset( $meta['dovetail']['id'] ) &&
				! isset( $meta['dovetail']['media'] ) &&
				isset( $meta['enclosure']['url'] ) &&
				! empty( $meta['enclosure']['url'] )
			) {
				$data['media'] = [
					[ 'href' => $meta['enclosure']['url'] ],
				];
			}

			return $data;
		}

		return null;
	}
}
