<?php
/**
 * General settings config.
 *
 * @var $post_types_options
 * @var $post_types
 * @var $offload_plugins
 * @var $section_callback
 *
 * @package DovetailPodcasts\Config\Settings
 * */

return [
	'id'           => 'general',
	'title'        => __( 'Dovetail Podcasts Settings', 'dovetail-podcasts' ),
	'callback'     => $section_callback,
	'show_in_rest' => true,
	'fields'       => [
		[
			'name'    => 'post_types',
			'label'   => __( 'Podcast Post Types', 'dovetail-podcasts' ),
			'desc'    => __( 'Select which post types to publish as podcast episodes in Dovetail.', 'dovetail-podcasts' ),
			'type'    => 'multicheck',
			'options' => $post_types_options,
			'value'   => $post_types,
			'default' => [ 'post' => 'post' ],
			'schema'  => [
				'type'                 => 'object',
				'additionalProperties' => [
					'type' => 'string',
				],
				'title'                => 'Dovetail Podcasts Post Types',
				'description'          => 'Post types that can be Dovetail podcast episodes.',
				'default'              => [ 'post' => 'post' ],
			],
		],
		[
			'name'    => 'delete_media_after_publish',
			'label'   => __( 'Delete Uploaded Media After Publishing', 'dovetail-podcasts' ),
			'desc'    => '<p>' . esc_html__( "Uploaded audio will be added to the Media Library. When the podcast episode post is published, Dovetail will fetch the file from Wordpress to process for distribution. Dovetail will then host the audio URL's used in podcast feeds and any Dovetail Podcast Players used in this site.", 'dovetail-podcasts' ) . '</p>' .
			'<p>' . esc_html__( 'Enable this if you do not want to keep the audio in the Media Library after it has been published to Dovetail. Only do this if storage on your Wordpress host is too limited or cost prohibitive for the amount of audio your podcasts produce.', 'dovetail-podcasts' ) . '</p>' . (
				empty( $offload_plugins ) ? (
					// TRANSLATORS: %1$s is a URL path to the admin plugin search page with query parameters for relevant plugins.
					'<p>' . sprintf( __( 'We recommend installing a <a href="%1$s" target="_blank">Media Library offloading plugin</a> to address media storage issues.', 'dovetail-podcasts' ), '/wp-admin/plugin-install.php?s=aws%2520s3%2520offload%2520media%2520library&tab=search&type=term' ) . '</p>'
				) : (
					! empty( $offload_plugins['active'] ) ? (
						'<details class="plugins-info success"><summary>' . esc_html__( 'Great work! It looks like your Media Library files are being offloaded to remote storage. You should NOT need to enable this option.', 'dovetail-podcasts' ) . '</summary><dl>' . (
							implode(
								'',
								array_map(
									static function ( $p ) {
										return (
										'<dt>' . esc_html( $p['details']['Title'] ) . '</dt>' .
										'<dd>' . esc_html( $p['details']['Description'] ) . '</dd>' .
										'<dd><ul class="keywords">' . implode(
											'',
											array_map(
												static function ( $v ) {
													return (
													'<li>' . esc_html( $v ) . '</li>'
													);
												},
												$p['keywords']
											)
										) . '</ul></dd>'
										);
									},
									$offload_plugins['active']
								)
							)
						) . '</dl></details>'
					) : (
						'<details class="plugins-info warn" open><summary>' . esc_html__( 'Do NOT enable this yet! It looks like you have plugins installed that could offload your Media Library files to remote storage. We recommend activating one of these plugins before choosing to delete published media.', 'dovetail-podcasts' ) . '</summary><dl>' . (
							implode(
								'',
								array_map(
									static function ( $p ) {
										return (
										'<dt>' . esc_html( $p['details']['Title'] ) . '</dt>' .
										'<dd>' . esc_html( $p['details']['Description'] ) . '</dd>' .
										'<dd><ul class="keywords">' . implode(
											'',
											array_map(
												static function ( $v ) {
													return (
													'<li>' . esc_html( $v ) . '</li>'
													);
												},
												$p['keywords']
											)
										) . '</ul></dd>'
										);
									},
									$offload_plugins['disabled']
								)
							)
						) . '</dl></details>'
					)
				)
			),
			'type'    => 'checkbox',
			'default' => false,
			'schema'  => [
				'type'        => 'string',
				'title'       => __( 'Delete Media After Publish', 'dovetail-podcasts' ),
				'description' => __( 'Media used as podcast audio will be deleted after post is published when true.', 'dovetail-podcasts' ),
				'default'     => 'off',
			],
		],
	],
];
