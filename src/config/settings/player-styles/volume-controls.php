<?php
/**
 * Volume controls style settings config.
 *
 * @package DovetailPodcasts\Config\Settings
 * */

return [
	'id'     => 'volume-controls-styles',
	'title'  => __( 'Volume Controls Styles', 'dovetail-podcasts' ),
	'fields' => [
		[
			'name'       => 'mute-button--foreground',
			'class'      => 'dtpc-player-style',
			'component'  => 'mute-button',
			'property'   => 'foreground',
			'label'      => __( 'Mute Button Foreground Color', 'dovetail-podcasts' ),
			'desc'       => '<p>' . __( 'Color of mute button icon and border. Normal color defaults to <em>Button Foreground Color</em>. Hover, and Active colors default to Normal color.', 'dovetail-podcasts' ) . '</p>',
			'type'       => 'color',
			'css_states' => [
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
			'name'       => 'mute-button--surface',
			'class'      => 'dtpc-player-style',
			'component'  => 'mute-button',
			'property'   => 'surface',
			'label'      => __( 'Mute Button Surface Color', 'dovetail-podcasts' ),
			'desc'       => '<p>' . __( 'Color of mute button surface. Normal, Hover, and Active colors default to transparent shades of <em>Mute Button Foreground Color</em>.', 'dovetail-podcasts' ) . '</p>',
			'type'       => 'color',
			'css_states' => [
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
			'name'      => 'mute-button--focus-ring-color',
			'class'     => 'dtpc-player-style',
			'component' => 'mute-button',
			'property'  => 'focus-ring-color',
			'label'     => __( 'Mute Button Highlight Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of mute button\'s focus ring when keyboard navigating using <kbd>Tab</kbd>.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'volume-slider--scrubber--color',
			'class'     => 'dtpc-player-style',
			'component' => 'volume-slider',
			'part'      => 'scrubber',
			'property'  => 'color',
			'label'     => __( 'Volume Slider Scrubber Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of volume slider\'s scrubber handle. Defaults to <em>Foreground Color</em>.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'volume-slider--progress--color',
			'class'     => 'dtpc-player-style',
			'component' => 'volume-slider',
			'part'      => 'progress',
			'property'  => 'color',
			'label'     => __( 'Volume Slider Progress Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of progress portion of volume slider. Defaults to <em>Foreground Color</em>.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'volume-slider--track--color',
			'class'     => 'dtpc-player-style',
			'component' => 'volume-slider',
			'part'      => 'track',
			'property'  => 'color',
			'label'     => __( 'Volume Slider Track Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of volume slider\'s track bar. Defaults to a transparent shade of <em>Volume Slider Progress Color</em>', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'volume-slider--surface',
			'class'     => 'dtpc-player-style',
			'component' => 'volume-slider',
			'property'  => 'surface',
			'label'     => __( 'Volume Slider Surface Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of volume slider\'s surface. Defaults to a transparent when Volume Slider component is used on its own. Defaults to <em>Player Surface Color</em> or transparent shade of <em>Player Foreground Color</em> Volume Controls component is used.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
	],
];
