<?php
/**
 * Authentication settings config.
 *
 * @package DovetailPodcasts\Config\Settings
 * */

return [
	'id'     => 'authentication',
	'title'  => __( 'Dovetail Client Application Setup', 'dovetail-podcasts' ),
	'desc'   => __( 'Before you can start publishing posts as podcast episodes in Dovetail, we need to authenticate your Wordpress site as a Dovetail Client Application. Talk to your PRX Dovetail onboarding specialist to get your Client Application setup.', 'dovetail-podcasts' ),
	'fields' => [
		[
			'name'  => 'client_key',
			'label' => __( 'Client Key', 'dovetail-podcasts' ),
			'type'  => 'password',
		],
		[
			'name'  => 'client_secret',
			'label' => __( 'Client Secret', 'dovetail-podcasts' ),
			'type'  => 'password',
		],
	],
];
