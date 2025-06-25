<?php
/**
 * Management settings config.
 *
 * @package DovetailPodcasts\Config\Settings
 * */

return [
	'id'     => 'manage',
	'title'  => __( 'Manage Client Application', 'dovetail-podcasts' ),
	'fields' => [
		[
			'name'              => 'delete_client_app_credentials',
			'label'             => __( 'Delete Client App Credentials', 'dovetail-podcasts' ),
			'desc'              => __( 'Enter <strong>DELETE</strong> to remove the current Client Application credentials. Only do this if a new Client Application needs to be used. Posts that were published to a podcasts not owned by the new Client Application user will no longer have updates synced to Dovetail.', 'dovetail-podcasts' ),
			'type'              => 'text',
			'sanitize_callback' => static function ( string $value ) {
				if ( 'DELETE' === $value ) {
					delete_option( DTPODCASTS_SETTINGS_SECTION_PREFIX . 'authentication' );
					wp_cache_flush( 'access_token', DTPODCASTS_CACHE_GROUP );
				}
			},
		],
	],
];
