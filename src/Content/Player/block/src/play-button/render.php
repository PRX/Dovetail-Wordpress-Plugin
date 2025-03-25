<?php
/**
 * Dovetail Podcasts Player render template.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 *
 * @package DovetailPodcasts\Content\Player
 */

$player = new \DovetailPodcasts\Content\Player\Player();

echo wp_kses( $player->render_play_button_block( $attributes ), $player->get_allowed_wp_kses_html() );
