<?php
/**
 * Progress bar style settings config.
 *
 * @package DovetailPodcasts\Config\Settings
 * */

return [
	'id'     => 'progress-bar-styles',
	'title'  => __( 'Progress Bar Styles', 'dovetail-podcasts' ),
	'fields' => [
		[
			'name'      => 'progress-bar--scrubber--color',
			'class'     => 'dtpc-player-style',
			'component' => 'progress-bar',
			'part'      => 'scrubber',
			'property'  => 'color',
			'label'     => __( 'Progress Bar Scrubber Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of progress bar scrubber handles. Overrides <em>Slider Scrubber Color</em>.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'progress-bar--progress--color',
			'class'     => 'dtpc-player-style',
			'component' => 'progress-bar',
			'part'      => 'progress',
			'property'  => 'color',
			'label'     => __( 'Progress Bar Progress Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of progress portion of progress bar. Overrides <em>Slider Progress Color</em>.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'progress-bar--track--color',
			'class'     => 'dtpc-player-style',
			'component' => 'progress-bar',
			'part'      => 'track',
			'property'  => 'color',
			'label'     => __( 'Progress Bar Track Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of progress bar track. Overrides <em>Slider Track Color</em>', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'progress-bar--track--border-color',
			'class'     => 'dtpc-player-style',
			'component' => 'progress-bar',
			'part'      => 'track',
			'property'  => 'border-color',
			'label'     => __( 'Progress Bar Track Border Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of progress bar track border. Defaults to <em>Foreground Color</em>', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
	],
];
