<?php
/**
 * Player settings config.
 *
 * @var $section_callback
 *
 * @package DovetailPodcasts\Config\Settings
 * */

return [
	'id'       => 'player',
	'title'    => __( 'Player', 'dovetail-podcasts' ),
	'callback' => $section_callback,
	'fields'   => [
		[
			'name'    => 'player_customization_enabled',
			'label'   => __( 'Enable Player Customization', 'dovetail-podcasts' ),
			'desc'    => '<p>' . esc_html__( 'Customize the default styling of the player components here. Leave disable if the styles are customized in your site\'s theme CSS.', 'dovetail-podcasts' ) . '</p>',
			'type'    => 'checkbox',
			'default' => false,
			'schema'  => [
				'type'        => 'string',
				'title'       => __( 'Player Customization Enabled', 'dovetail-podcasts' ),
				'description' => __( 'Player customization styles have been turned on or off.', 'dovetail-podcasts' ),
				'default'     => 'off',
			],
		],
	],
];
