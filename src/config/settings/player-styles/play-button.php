<?php
/**
 * Play button style settings config.
 *
 * @package DovetailPodcasts\Config\Settings
 * */

return [
	'id'     => 'play-button-styles',
	'title'  => __( 'Play Button Styles', 'dovetail-podcasts' ),
	'fields' => [
		[
			'name'             => 'play-button--foreground',
			'class'            => 'dtpc-player-style',
			'component'        => 'play-button',
			'property'         => 'foreground',
			'label'            => __( 'Play Button Foreground Color', 'dovetail-podcasts' ),
			'desc'             => '<p>' . __( 'Color of play button icon and border. Normal color defaults to <em>Foreground Color</em>. Hover, and Active colors default to Normal color.', 'dovetail-podcasts' ) . '</p>',
			'type'             => 'color',
			'component_states' => [
				'playing' => [
					'label' => __( 'Playing', 'dovetail-podcasts' ),
					'desc'  => __( 'Foreground colors applied when player is playing audio.', 'dovetail-podcasts' ),
				],
			],
			'css_states'       => [
				'hover'  => [
					'label' => __( 'Hover', 'dovetail-podcasts' ),
					'desc'  => __( 'Applied when cursor is over the button.', 'dovetail-podcasts' ),
				],
				'active' => [
					'label' => __( 'Active', 'dovetail-podcasts' ),
					'desc'  => __( 'Applied when button is pressed.', 'dovetail-podcasts' ),
				],
			],
		],
		[
			'name'             => 'play-button--surface',
			'class'            => 'dtpc-player-style',
			'component'        => 'play-button',
			'property'         => 'surface',
			'label'            => __( 'Play Button Surface Color', 'dovetail-podcasts' ),
			'desc'             => '<p>' . __( 'Color of play button surface. Normal, Hover, and Active colors default to transparent shades of <em>Play Button Foreground Color</em>.', 'dovetail-podcasts' ) . '</p>',
			'type'             => 'color',
			'component_states' => [
				'playing' => [
					'label' => __( 'Playing', 'dovetail-podcasts' ),
					'desc'  => __( 'Surface colors applied when player is playing audio.', 'dovetail-podcasts' ),
				],
			],
			'css_states'       => [
				'hover'  => [
					'label' => __( 'Hover', 'dovetail-podcasts' ),
					'desc'  => __( 'Applied when cursor is over the button.', 'dovetail-podcasts' ),
				],
				'active' => [
					'label' => __( 'Active', 'dovetail-podcasts' ),
					'desc'  => __( 'Applied when button is pressed.', 'dovetail-podcasts' ),
				],
			],
		],
		[
			'name'             => 'play-button--border-color',
			'class'            => 'dtpc-player-style',
			'component'        => 'play-button',
			'property'         => 'border-color',
			'label'            => __( 'Play Button Border Color', 'dovetail-podcasts' ),
			'desc'             => '<p>' . __( 'Color of play button border.', 'dovetail-podcasts' ) . '</p>',
			'type'             => 'color',
			'component_states' => [
				'playing' => [
					'label' => __( 'Playing', 'dovetail-podcasts' ),
					'desc'  => __( 'Border colors applied when player is playing audio.', 'dovetail-podcasts' ),
				],
			],
			'css_states'       => [
				'hover'  => [
					'label' => __( 'Hover', 'dovetail-podcasts' ),
					'desc'  => __( 'Applied when cursor is over the button.', 'dovetail-podcasts' ),
				],
				'active' => [
					'label' => __( 'Active', 'dovetail-podcasts' ),
					'desc'  => __( 'Applied when button is pressed.', 'dovetail-podcasts' ),
				],
			],
		],
		[
			'name'      => 'play-button--focus-ring-color',
			'class'     => 'dtpc-player-style',
			'component' => 'play-button',
			'property'  => 'focus-ring-color',
			'label'     => __( 'Play Button Highlight Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of Play button focus ring when using keyboard navigating using <kbd>Tab</kbd>.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
	],
];
