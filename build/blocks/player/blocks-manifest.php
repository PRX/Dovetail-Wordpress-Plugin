<?php
// This file is generated. Do not modify it manually.
return array(
	'mute-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts-player/mute-button',
		'version' => '0.1.0',
		'title' => 'Dovetail Player - Mute Button',
		'category' => 'media',
		'icon' => 'controls-volumeoff',
		'description' => 'Mute button for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts-player/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dovetail-podcasts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			
		)
	),
	'play-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts-player/play-button',
		'version' => '0.1.0',
		'title' => 'Dovetail Player - Play Button',
		'category' => 'media',
		'icon' => 'controls-play',
		'description' => 'Play button for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts-player/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dovetail-podcasts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			
		)
	),
	'player' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts-player/player',
		'version' => '0.1.0',
		'title' => 'Dovetail Player',
		'category' => 'media',
		'icon' => 'controls-play',
		'description' => 'Customizable player for podcast episodes.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dovetail-podcasts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'post_id' => array(
				'type' => 'integer'
			),
			'post_type' => array(
				'type' => 'string'
			),
			'src' => array(
				'type' => 'string'
			),
			'duration' => array(
				'type' => 'number'
			),
			'layout' => array(
				'type' => 'string',
				'enum' => array(
					'flex',
					'default'
				)
			)
		)
	),
	'progress-bar' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts-player/progress-bar',
		'version' => '0.1.0',
		'title' => 'Dovetail Player - Progress Bar',
		'category' => 'media',
		'icon' => 'minus',
		'description' => 'Progress bar for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts-player/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dovetail-podcasts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'duration' => array(
				'type' => 'number',
				'default' => 0
			)
		)
	),
	'time-current' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts-player/time-current',
		'version' => '0.1.0',
		'title' => 'Dovetail Player - Current Time',
		'category' => 'media',
		'icon' => 'clock',
		'description' => 'Display current time for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts-player/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dovetail-podcasts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			
		)
	),
	'time-display' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts-player/time-display',
		'version' => '0.1.0',
		'title' => 'Dovetail Player - Time Display',
		'category' => 'media',
		'icon' => 'clock',
		'description' => 'Display current time and duration for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts-player/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dovetail-podcasts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'duration' => array(
				'type' => 'number',
				'default' => 0
			)
		)
	),
	'time-duration' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts-player/time-duration',
		'version' => '0.1.0',
		'title' => 'Dovetail Player - Duration',
		'category' => 'media',
		'icon' => 'clock',
		'description' => 'Display duration for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts-player/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dovetail-podcasts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'duration' => array(
				'type' => 'number',
				'default' => 0
			)
		)
	),
	'volume-controls' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts-player/volume-controls',
		'version' => '0.1.0',
		'title' => 'Dovetail Player - volume-controls',
		'category' => 'media',
		'icon' => 'controls-volumeon',
		'description' => 'Mute button with Volume slider on hover for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts-player/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dovetail-podcasts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'volume' => array(
				'type' => 'number',
				'default' => 0.5
			)
		)
	),
	'volume-slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts-player/volume-slider',
		'version' => '0.1.0',
		'title' => 'Dovetail Player - Volume Slider',
		'category' => 'media',
		'icon' => 'controls-volumeon',
		'description' => 'Volume slider for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts-player/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dovetail-podcasts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'volume' => array(
				'type' => 'number',
				'default' => 0.5
			)
		)
	)
);
