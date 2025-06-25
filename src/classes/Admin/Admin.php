<?php
/**
 * The DovetailPodcasts Admin class.
 *
 * @package DovetailPodcasts\Admin
 */

namespace DovetailPodcasts\Admin;

use DovetailPodcasts\Admin\MetaBox\PostMetaBox;
use DovetailPodcasts\Admin\Settings\Settings;

/**
 * Admin class
 *
 * @package DovetailPodcasts\Admin
 */
class Admin {

	/**
	 * PostMetaBox object.
	 *
	 * @var \DovetailPodcasts\Admin\MetaBox\PostMetaBox
	 */
	protected $post_meta_box;

	/**
	 * Settings object.
	 *
	 * @var \DovetailPodcasts\Admin\Settings\Settings
	 */
	protected $settings;

	/**
	 * Initialize Admin functionality for WPGraphQL
	 *
	 * @return void
	 */
	public function init() {

		$this->settings = new Settings();
		$this->settings->init();

		$this->post_meta_box = new PostMetaBox();
		$this->post_meta_box->init();
	}
}
