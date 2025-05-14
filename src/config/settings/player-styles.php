<?php
/**
 * Player style settings config.
 *
 * @var $player_style_field_callback
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
			'desc'      => '<p>' . esc_html__( 'Sets the color for player icons and borders to a fixed color. By default the player components base their appearance on the current text color, inheriting its color from its ancestor elements styles.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
		[
			'name'      => 'player--surface',
			'class'     => 'dtpc-player-style',
			'component' => 'player',
			'property'  => 'surface',
			'label'     => __( 'Surface Color', 'dovetail-podcasts' ),
			'desc'      => '<p>' . esc_html__( 'Sets the color of the surface added by the backdrop.', 'dovetail-podcasts' ) . '</p>',
			'type'      => 'color',
		],
	],
];
