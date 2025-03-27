<?php
// This file is generated. Do not modify it manually.
return array(
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
	)
);
