<?php
/**
 * Player style settings config.
 *
 * @package DovetailPodcasts\Config\Settings
 * */

return [
	'id'     => 'player-styles',
	'title'  => __( 'Player Styles', 'dovetail-podcasts' ),
	'fields' => [
		[
			'name'      => 'player--foreground',
			'class'     => 'dtpc-player-style',
			'component' => 'player',
			'property'  => 'foreground',
			'label'     => __( 'Foreground Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of player icons and borders. Defaults to the current text color.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'player--surface',
			'class'     => 'dtpc-player-style',
			'component' => 'player',
			'property'  => 'surface',
			'label'     => __( 'Surface Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of component surfaces, such as the player backdrop and volume controls slider.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'player--highlight',
			'class'     => 'dtpc-player-style',
			'component' => 'player',
			'property'  => 'highlight',
			'label'     => __( 'Highlight Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of control elements\' focus rings when using keyboard navigating using <kbd>Tab</kbd>.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'player--time--color',
			'class'     => 'dtpc-player-style',
			'component' => 'player',
			'part'      => 'time',
			'property'  => 'color',
			'label'     => __( 'Time Text Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of all time related text.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'       => 'button--foreground',
			'class'      => 'dtpc-player-style',
			'component'  => 'button',
			'property'   => 'foreground',
			'label'      => __( 'Button Foreground Color', 'dovetail-podcasts' ),
			'desc'       => '<p>' . __( 'Color of buttons\' icon and border. Normal color defaults to <em>Foreground Color</em>. Hover, and Active colors default to Normal color.', 'dovetail-podcasts' ) . '</p>',
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
			'name'       => 'button--surface',
			'class'      => 'dtpc-player-style',
			'component'  => 'button',
			'property'   => 'surface',
			'label'      => __( 'Button Surface Color', 'dovetail-podcasts' ),
			'desc'       => '<p>' . __( 'Color of buttons\' surface. Normal, Hover, and Active colors default to transparent shades of <em>Button Foreground Color</em>.', 'dovetail-podcasts' ) . '</p>',
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
			'name'      => 'button--focus-ring-color',
			'class'     => 'dtpc-player-style',
			'component' => 'button',
			'property'  => 'focus-ring-color',
			'label'     => __( 'Button Highlight Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of buttons\' focus rings when keyboard navigating using <kbd>Tab</kbd>.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'slider--scrubber--color',
			'class'     => 'dtpc-player-style',
			'component' => 'slider',
			'part'      => 'scrubber',
			'property'  => 'color',
			'label'     => __( 'Slider Scrubber Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of sliders\' scrubber handles. Defaults to <em>Foreground Color</em>.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'slider--progress--color',
			'class'     => 'dtpc-player-style',
			'component' => 'slider',
			'part'      => 'progress',
			'property'  => 'color',
			'label'     => __( 'Slider Progress Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of progress portion of sliders. Defaults to <em>Foreground Color</em>.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'slider--track--color',
			'class'     => 'dtpc-player-style',
			'component' => 'slider',
			'part'      => 'track',
			'property'  => 'color',
			'label'     => __( 'Slider Track Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of sliders\' track bar. Defaults to a transparent shade of <em>Slider Progress Color</em>', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
	],
];
