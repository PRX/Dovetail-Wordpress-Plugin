<?php
/**
 * The DovetailPodcasts PostMetaBox class.
 *
 * @package DovetailPodcasts\Admin\MetaBox
 */

namespace DovetailPodcasts\Admin\MetaBox;

use DovetailPodcasts\Admin\Settings\SettingsApi;
use DovetailPodcasts\Dovetail\DovetailApi;
use DovetailPodcasts\Utils\Utils;

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

		if ( ! is_array( $this->post_types ) ) {
			$this->post_types = [];
		}

		foreach ( $this->post_types as $post_type ) {
			add_action( "rest_prepare_{$post_type}", [ $this, 'rest_prepare' ], 999, 3 );
		}

		add_action( 'add_meta_boxes', [ $this, 'initialize_meta_box' ], 9, 2 );
		add_action( 'save_post', [ $this, 'save_post' ], 999, 2 );
		add_action( 'trashed_post', [ $this, 'trashed_post' ], 999 );
		add_action( 'before_delete_post', [ $this, 'before_delete_post' ], 999, 2 );
		add_action( 'publish_to_draft', [ $this, 'publish_future_to_draft' ], 999 );
		add_action( 'future_to_draft', [ $this, 'publish_future_to_draft' ], 999 );
	}

	/**
	 * Add episode meta data to REST response.
	 *
	 * @param \WP_REST_Response $response The response object.
	 * @param \WP_Post          $post Post object.
	 * @param \WP_REST_Request  $request The request object.
	 * @return \WP_REST_Response
	 */
	public function rest_prepare( \WP_REST_Response $response, \WP_Post $post, \WP_REST_Request $request ) {

		if ( empty( $post ) && isset( $GLOBALS['post'] ) ) {
			$post = $GLOBALS['post'];
		} else {
			$param_id = $request->get_param( 'id' );
			$post     = get_post( $param_id );
		}

		if ( $post instanceof WP_Post || is_object( $post ) ) {
			$post_id = $post->ID;
		}

		if ( ! isset( $post_id ) || empty( $post_id ) ) {
			return $response;
		}

		if ( 'GET' === $request->get_method() ) {
			$meta = $this->get_episode_meta_data( $post_id );

			if ( ! empty( $meta ) ) {
				$response->data['meta'][ DTPODCASTS_POST_META_KEY ] = $meta;
			}
		}

		/**
		 * Block editor saves will do a PUT of post content data our `save_post`
		 * hook is called with POST data containing our nonce string. We need to echo back meta data
		 * sent in the PUT body so the editor state retains the edits to the metadata.
		 */
		if ( 'PUT' === $request->get_method() ) {
			$body = $request->get_body();
			$data = json_decode( $body, true );

			if ( isset( $data['meta'][ DTPODCASTS_POST_META_KEY ] ) ) {
				$response->data['meta'][ DTPODCASTS_POST_META_KEY ] = $data['meta'][ DTPODCASTS_POST_META_KEY ];
			}
		}

		return $response;
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
		wp_enqueue_script( DTPODCASTS_SETTINGS_SECTION_PREFIX, DTPODCASTS_PLUGIN_URL . 'build/admin/metabox/podcast-episode-metabox.js', [ 'jquery' ], DTPODCASTS_VERSION, [ 'strategy' => 'defer' ] );

		wp_localize_script(
			DTPODCASTS_SETTINGS_SECTION_PREFIX,
			'appLocalizer',
			[
				'appContainerId'         => self::APP_CONTAINER_ID,
				'postId'                 => $post->ID,
				'postType'               => $post->post_type,
				'restGetRoute'           => rest_get_route_for_post_type_items( $post->post_type ),
				'postStatus'             => $post->post_status,
				'postTitle'              => $post->post_title,
				'episodeMetaDataKey'     => DTPODCASTS_POST_META_KEY,
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

		if ( isset( $meta['enclosure']['mediaId'] ) ) {
			$media = get_post( $meta['enclosure']['mediaId'] );

			if ( ! $media ) {
				// Episode media was deleted since the last time this post was edited.
				// Remove media id and url, and update post metadata.
				unset( $meta['enclosure']['mediaId'] );
				unset( $meta['enclosure']['url'] );
				unset( $meta['enclosure']['duration'] );
				update_post_meta( $post->ID, DTPODCASTS_POST_META_KEY, $meta );
			} elseif ( 'trash' === $media->post_status ) {
				// Episode was trashed, probably by `delete_offloaded_media` method.
				// Remove media id and url, but DO NOT update post metadata.
				// This will keep frontend from trying to fetch media details.
				unset( $meta['enclosure']['mediaId'] );
				unset( $meta['enclosure']['url'] );
				unset( $meta['enclosure']['duration'] );
			}
		}

		if ( ! isset( $meta['dovetail']['id'] ) ) {
			// Check if this post was imported into Dovetail.
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

						// ????: How could we handle multiple matches?
						// It is not likely for a podcast to have two episodes published with the same name on the same day. Right?
						// Should we pass these matches as "suggested episodes" for the meta box UI to present to the user?
						// Could multiple podcasts have an episode of the same title on the same publish date? This logic returns the found
						// episode in the first podcasts to have a match, but may not be the the correct podcast.
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
			}
		} else {
			// This post has been connected to a Dovetail episode.
			// Get current Dovetail episode data so changes in Dovetail do not get reverted
			// when user saves post changes to post.
			list( $episode_api, $resp ) = $this->dovetail_api->get_episode( $meta['dovetail']['id'] );

			$status = wp_remote_retrieve_response_code( $resp );

			if ( $episode_api ) {
				$meta['dovetail'] = Utils::parse_episode_api_data( $episode_api );
			} elseif ( '404' === $status ) {
				// Episode was not found? May have been deleted in Dovetail.
				// Remove dovetail id, enclosure, and media meta data.
				unset( $meta['dovetail']['id'] );
				unset( $meta['dovetail']['enclosure'] );
				unset( $meta['dovetail']['uncut'] );
				unset( $meta['dovetail']['media'] );
			}
		}

		// If we have meta data, save it again with updates that may have come from Dovetail API.
		if ( ! empty( $meta ) ) {
			if ( ! add_post_meta( $post->ID, DTPODCASTS_POST_META_KEY, $meta, true ) ) {
				update_post_meta( $post->ID, DTPODCASTS_POST_META_KEY, $meta );
			}
		}

		return $meta;
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

		list( $podcasts_api ) = $this->dovetail_api->get_podcasts();
		$podcasts             = $podcasts_api && is_array( $podcasts_api ) ? array_map(
			static function ( $p ) {
				return [
					'enclosureTemplate' => $p['enclosureTemplate'],
					'id'                => $p['id'],
					'title'             => $p['title'],
					'explicit'          => $p['explicit'],
					'itunesImage'       => isset( $p['itunesImage'] ) ? $p['itunesImage'] : null,
					'feedImage'         => isset( $p['feedImage'] ) ? $p['feedImage'] : null,
					'author'            => isset( $p['author'] ) ? $p['author'] : null,
				];
			},
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

			add_meta_box(
				'dovetail-podcasts-episode',
				'Dovetail Podcasts Episode',
				[ $this, 'render_meta_box' ],
				$this->post_types,
				'normal',
				'default',
				[
					'__block_editor_compatible_meta_box' => true,
				]
			);
		}
	}

	/**
	 * Render meta box UI container element.
	 *
	 * @return void
	 */
	public function render_meta_box() {
		?>
		<style>
			.postbox:is(#dovetail-podcasts-episode) {
				.postbox-header {
					h2 {
						display: grid;
						grid-template-columns: 1.25em 1fr;
						align-items: center;
						gap: calc(var(--spacing) * 2);
						line-height: 1;

						&::before {
							content: '';
							aspect-ratio: 1;
							background-size: contain;
							background-image: url('<?php echo esc_attr( DT_LOGO_DATA_SVG ); ?>');
						}
					}
				}
			}
		</style>
		<input type="hidden"
			name="<?php echo esc_attr( DTPODCASTS_POST_META_KEY . '_nonce' ); ?>"
			value="<?php echo esc_attr( wp_create_nonce( self::APP_CONTAINER_ID ) ); ?>"
		/>
		<div id="<?php echo esc_attr( self::APP_CONTAINER_ID ); ?>" class="dtpc-tw">
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
	 * @return void
	 */
	public function save_post( int $post_id, \WP_Post $post ) {

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

		if ( ! $this->is_podcast_episode_post_type( $post->post_type ) ) {
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
			$do_delete_post_meta = true;
			if ( isset( $meta['dovetail']['id'] ) ) {
				// Only remove meta data when Dovetail episode is successfully deleted.
				$do_delete_post_meta = false;
				// Episode has to be unpublished before it can be delete.
				list( $unpublished ) = $this->dovetail_api->update_episode( $meta['dovetail']['id'], [ 'publishedAt' => null ] );
				if ( ! isset( $unpublished['publishedAt'] ) ) {
					$do_delete_post_meta = $this->dovetail_api->delete_episode( $meta['dovetail']['id'] );
				}
			}
			if ( $do_delete_post_meta ) {
				// Delete meta data if episode was successfully deleted.
				delete_post_meta( $post_id, DTPODCASTS_POST_META_KEY );
				$meta = null;
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
		}

		if ( ! empty( $new_meta_json ) ) {
			$new_meta = json_decode( $new_meta_json, true );
		}

		if (
			isset( $meta['podcastId'] ) &&
			is_numeric( $meta['podcastId'] ) &&
			isset( $new_meta['podcastId'] ) &&
			$meta['podcastId'] !== $new_meta['podcastId'] &&
			isset( $meta['dovetail']['id'] ) &&
			! empty( $meta['dovetail']['id'] )
		) {
			// Podcast has changed.
			// We need to delete existing episode from that previous podcast...

			// ...but first, we need to keep track of the episode id.
			$dovetail_id_to_delete = $meta['dovetail']['id'];

			// New meta will still contain deleted episode id.
			// Unset episode id so a new episode will be created in the current podcast.
			unset( $new_meta['dovetail']['id'] );
			// Reset media to enclosure url to ensure audio is reprocessed on new episode.
			unset( $new_meta['dovetail']['uncut'] );
			unset( $new_meta['dovetail']['media'] );
			if ( isset( $new_meta['enclosure']['url'] ) ) {
				// Before we can make use of the enclosure URL, we need to see how media is stored on the Dovetail episode.
				// Fetch current episode.
				list( $response_data ) = $this->dovetail_api->get_episode( $dovetail_id_to_delete );

				// When we still have Dovetail episode data...
				if ( ! empty( $response_data ) ) {
					$episode_data = Utils::parse_episode_api_data( $response_data );

					if ( isset( $episode_data['uncut'] ) ) {
						// ...set uncut when it was used on the Dovetail episode.
						$new_meta['dovetail']['uncut'] = [ 'href' => $new_meta['enclosure']['url'] ];
					} else {
						// ...set media when uncut was not used (imported or created prior to adding uncut to API.)
						$new_meta['dovetail']['media'] = [
							[ 'href' => $new_meta['enclosure']['url'] ],
						];
					}
				} else {
					// Episode is already gone. Use uncut prop on new episode.
					$new_meta['dovetail']['uncut'] = [ 'href' => $new_meta['enclosure']['url'] ];
				}
			}

			// Now we can delete the episode from Dovetail.
			$this->delete_episode( $dovetail_id_to_delete );
		}

		if ( isset( $new_meta ) && is_array( $new_meta ) ) {
			// Some meta props are not managed by the frontend. We need to preserve their last values.
			$preserve = [];
			// Image is updated by the post's feature image.
			// This prop is kept to determine original URL changes.
			if ( isset( $meta['dovetail']['image'] ) ) {
				$preserve['dovetail']['image'] = $meta['dovetail']['image'];
			}

			$meta = Utils::recursive_array_merge( $preserve, $new_meta );
		}

		/**
		 * Bail is there if no meta data at this point.
		 * It was either not submitted or was deleted.
		 */
		if ( ! isset( $meta ) || empty( $meta ) ) {
			return;
		}

		if (
			isset( $meta['podcastId'] ) &&
			is_numeric( $meta['podcastId'] )
		) {
			$episode_data = $this->prepare_episode_api_data( $meta, $post );

			list( $response_data ) = $this->dovetail_api->save_episode( $meta['podcastId'], $episode_data );

			// Update meta box data with Dovetail data.
			if ( ! empty( $response_data ) ) {
				$meta['dovetail'] = Utils::parse_episode_api_data( $response_data );
			}
		}

		// Remove Dovetail uncut and media from metadata, since their existence is our flag that
		// a new audio file was provided in future saves.
		if ( isset( $meta['dovetail']['uncut'] ) ) {
			unset( $meta['dovetail']['uncut'] );
		}

		if ( isset( $meta['dovetail']['media'] ) ) {
			unset( $meta['dovetail']['media'] );
		}

		// Add/Update metadata.
		if ( ! add_post_meta( $post_id, DTPODCASTS_POST_META_KEY, $meta, true ) ) {
			update_post_meta( $post_id, DTPODCASTS_POST_META_KEY, $meta );
		}

		$this->delete_offloaded_media( $meta, $post );
	}

	/**
	 * Post trashed hook
	 *
	 * Should unpublish the Dovetail episode.
	 *
	 * @param int $post_id Post ID.
	 * @return void
	 */
	public function trashed_post( int $post_id ) {
		$post = get_post( $post_id );

		if ( ! $this->is_podcast_episode_post_type( $post->post_type ) ) {
			return;
		}

		$meta = get_post_meta( $post->ID, DTPODCASTS_POST_META_KEY, true );

		if ( ! isset( $meta['dovetail']['id'] ) ) {
			return;
		}

		$this->dovetail_api->update_episode(
			$meta['dovetail']['id'],
			[
				'publishedAt' => null,
			]
		);
	}

	/**
	 * Post before delete hook
	 *
	 * Should delete the Dovetail episode when appropriate.
	 * Done as before_delete_post hook so we have access to meta data.
	 *
	 * @param int      $post_id Post ID.
	 * @param \WP_Post $post Post object.
	 * @return void
	 */
	public function before_delete_post( int $post_id, \WP_Post $post ) {

		if ( ! $this->is_podcast_episode_post_type( $post->post_type ) ) {
			return;
		}

		$meta = get_post_meta( $post_id, DTPODCASTS_POST_META_KEY, true );

		if ( ! isset( $meta['dovetail']['id'] ) ) {
			return;
		}

		// Episode has to be unpublished before it can be delete.
		$this->delete_episode( $meta['dovetail']['id'] );
	}

	/**
	 * Post publish/future to draft transition hook
	 *
	 * Should unpublish the Dovetail episode when appropriate.
	 *
	 * @param \WP_Post $post Post object.
	 * @return void
	 */
	public function publish_future_to_draft( \WP_Post $post ) {

		if ( ! $this->is_podcast_episode_post_type( $post->post_type ) ) {
			return;
		}

		$meta = get_post_meta( $post->ID, DTPODCASTS_POST_META_KEY, true );

		if ( ! isset( $meta['dovetail']['id'] ) ) {
			return;
		}

		$this->dovetail_api->update_episode(
			$meta['dovetail']['id'],
			[
				'publishedAt' => null,
			]
		);
	}

	/**
	 * Delete episode by id.
	 *
	 * @param string $id Dovetail episode id.
	 * @return bool True when successful, false on failure.
	 */
	private function delete_episode( string $id ) {
		// Episode has to be unpublished before it can be delete.
		list( $unpublished ) = $this->dovetail_api->update_episode( $id, [ 'publishedAt' => null ] );
		if ( $unpublished && ! isset( $unpublished['publishedAt'] ) ) {
			return $this->dovetail_api->delete_episode( $id );
		}

		return false;
	}

	/**
	 * Get the image for a specific dovetail episode.
	 *
	 * @param string $id Dovetail episode id.
	 * @return array<string,mixed>
	 */
	private function get_dovetail_episode_image( string $id ) {
		$episode = $this->dovetail_api->get_episode( $id );

		if ( isset( $episode['image'] ) ) {
			return $episode['image'];
		}

		return false;
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
					'publishedAt' => null,
					'title'       => $post->post_title,
					'description' => $post->post_content,
					'subtitle'    => $post->post_excerpt,
					'url'         => get_permalink( $post ),
					'image'       => null,
					'categories'  => null,
				]
			);

			if ( in_array( $post->post_status, [ 'publish', 'future' ], true ) ) {
				$data['publishedAt'] = $post->post_date_gmt;
			} elseif ( ! empty( $post->post_date_gmt ) ) {
				$data['releasedAt'] = $post->post_date_gmt;
			}

			$attachment_id = get_post_thumbnail_id( $post );
			if ( $attachment_id ) {
				$href     = wp_get_attachment_url( $attachment_id );
				$caption  = wp_get_attachment_caption( $attachment_id );
				$alt_text = trim( get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ) );

				$data['image'] = [
					'href'    => $href,
					'caption' => ! empty( $caption ) ? $caption : null,
					'altText' => ! empty( $alt_text ) ? $alt_text : null,
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
				$categories = $post_categories;
			}

			$post_tags = wp_get_post_tags(
				$post->ID,
				[
					'fields' => 'names',
				]
			);
			if ( ! is_wp_error( $post_tags ) && ! empty( $post_tags ) ) {
				$categories = isset( $categories ) && is_array( $categories ) ?
					array_merge( $categories, $post_tags ) :
					$post_tags;
			}

			if ( isset( $categories ) && is_array( $categories ) ) {
				$categories = array_unique( $categories );

				sort( $categories, SORT_STRING );

				$data['categories'] = $categories;
			}

			// When episode...
			if (
				// ...isn't associated with a Dovetail episode,...
				! isset( $meta['dovetail']['id'] ) &&
				// ...and doesn't have media already set,...
				! isset( $meta['dovetail']['uncut'] ) && ! isset( $meta['dovetail']['media'] ) &&
				// ...and has an enclosure URL,...
				isset( $meta['enclosure']['url'] ) && ! empty( $meta['enclosure']['url'] )
			) {
				// ...use the enclosure URL as the Dovetail uncut media source.
				$data['uncut'] = [ 'href' => $meta['enclosure']['url'] ];
			}

			// If episode audio was modified at this point, uncut and media data will not have `originalUrl` props.
			// Remove the props from the prepared data if `originalUrl` still exists.

			if ( isset( $data['uncut'] ) && ( empty( $data['uncut'] ) || isset( $data['uncut']['originalUrl'] ) ) ) {
				// Uncut media was not updated from initial load, or is empty.
				// Remove uncut media before sending update. Must be undefined for Dovetail to apply media array changes.
				unset( $data['uncut'] );
			}

			// TODO: Will have to update this if we ever support multiple audio segments.
			if ( isset( $data['media'][0]['originalUrl'] ) ) {
				// Media was not updated from initial load.
				// Remove media before sending update.
				unset( $data['media'] );
			}

			return $data;
		}

		return null;
	}

	/**
	 * Determine if a post type is configured to be a podcast episode.
	 *
	 * @param string $post_type Post type to check.
	 * @return bool
	 */
	private function is_podcast_episode_post_type( string $post_type ) {
		$post_types = $this->settings_api->get_option( 'post_types', 'general', [ 'post' => 'post' ] );
		$post_types = is_array( $post_types ) ? $post_types : [];

		if ( in_array( $post_type, $post_types, true ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Delete media when podcast episode has been published to Dovetail.
	 *
	 * @param array<string,mixed> $meta Episode meta data to use in the data.
	 * @param \WP_Post            $post Post object.
	 * @return void
	 */
	private function delete_offloaded_media( array $meta, \WP_Post $post ) {
		$delete_media = $this->settings_api->get_option( 'delete_media_after_publish', 'general' );
		$delete_media = isset( $delete_media ) ? 'on' === $delete_media : false;

		if ( ! $delete_media ||
			'publish' !== $post->post_status ||
			! isset( $meta['dovetail']['id'] ) ||
			! isset( $meta['enclosure']['mediaId'] )
		) {
			return;
		}

		// Trash post so file is (hopefully) not deleted immediately.
		// Dovetail may still be downloading the file during processing. May be a thing when a published
		// podcast episode post updates audio file.
		wp_trash_post( $meta['enclosure']['mediaId'] );

		if ( ! get_post_status( $meta['enclosure']['mediaId'] ) ) {
			// Episode media was deleted.
			// Remove media id and url, and update metadata.
			unset( $meta['enclosure']['mediaId'] );
			unset( $meta['enclosure']['url'] );
			update_post_meta( $post->ID, DTPODCASTS_POST_META_KEY, $meta );
		}
	}
}
