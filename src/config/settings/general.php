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
	],
];
