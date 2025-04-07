<?php
// This file is generated. Do not modify it manually.
return array(
	'mute-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts/mute-button',
		'version' => '0.1.0',
		'title' => 'Dovetail Podcasts Player Mute Button',
		'category' => 'media',
		'icon' => 'controls-play',
		'description' => 'Mute button for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'margin' => false,
				'padding' => true
			)
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
		'name' => 'dovetail-podcasts/play-button',
		'version' => '0.1.0',
		'title' => 'Dovetail Podcasts Player Play Button',
		'category' => 'media',
		'icon' => 'controls-play',
		'description' => 'Play button for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'margin' => false,
				'padding' => true
			)
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
		'name' => 'dovetail-podcasts/player',
		'version' => '0.1.0',
		'title' => 'Dovetail Podcasts Player',
		'category' => 'media',
		'icon' => 'controls-play',
		'description' => 'Customizable player for podcast episodes.',
		'allowedBlocks' => array(
			'dovetail-podcasts/play-button'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'background' => array(
				'backgroundImage' => true,
				'backgroundSize' => true
			),
			'color' => array(
				'text' => true,
				'link' => false,
				'background' => true,
				'gradients' => true,
				'enableContrastChecker' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			)
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
			)
		)
	),
	'progress-bar' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts/progress-bar',
		'version' => '0.1.0',
		'title' => 'Dovetail Podcasts Player Progress Bar',
		'category' => 'media',
		'icon' => 'minus',
		'description' => 'Progress bar for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'text' => true
			),
			'spacing' => array(
				'margin' => false,
				'padding' => true
			)
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
		'name' => 'dovetail-podcasts/time-current',
		'version' => '0.1.0',
		'title' => 'Dovetail Podcasts Player Current Time',
		'category' => 'media',
		'icon' => 'minus',
		'description' => 'Display current time for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'text' => true
			),
			'typography' => array(
				'fontSize' => true
			)
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
		'name' => 'dovetail-podcasts/time-display',
		'version' => '0.1.0',
		'title' => 'Dovetail Podcasts Player Time Display',
		'category' => 'media',
		'icon' => 'minus',
		'description' => 'Display current time and duration for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'text' => true
			),
			'typography' => array(
				'fontSize' => true
			)
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
		'name' => 'dovetail-podcasts/time-duration',
		'version' => '0.1.0',
		'title' => 'Dovetail Podcasts Player Duration',
		'category' => 'media',
		'icon' => 'minus',
		'description' => 'Display duration for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts/player'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'text' => true
			),
			'typography' => array(
				'fontSize' => true
			)
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
	'volume-slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dovetail-podcasts/volume-slider',
		'version' => '0.1.0',
		'title' => 'Dovetail Podcasts Player Volume Slider',
		'category' => 'media',
		'icon' => 'minus',
		'description' => 'Volume slider for Dovetail Podcasts Player.',
		'ancestor' => array(
			'dovetail-podcasts/player'
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
