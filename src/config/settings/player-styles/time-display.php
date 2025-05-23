<?php
/**
 * Time display style settings config.
 *
 * @package DovetailPodcasts\Config\Settings
 * */

return [
	'id'     => 'time-display-styles',
	'title'  => __( 'Time Display Styles', 'dovetail-podcasts' ),
	'fields' => [
		[
			'name'      => 'time-current--color',
			'class'     => 'dtpc-player-style',
			'component' => 'time-current',
			'property'  => 'color',
			'label'     => __( 'Current Time Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of current time text.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'time-duration--color',
			'class'     => 'dtpc-player-style',
			'component' => 'time-duration',
			'property'  => 'color',
			'label'     => __( 'Duration Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of duration time text.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'time-display--separator--color',
			'class'     => 'dtpc-player-style',
			'component' => 'time-display',
			'part'      => 'separator',
			'property'  => 'color',
			'label'     => __( 'Time Separator Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . __( 'Color of the separator between the current time and duration when using the Time Display component.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
	],
];
