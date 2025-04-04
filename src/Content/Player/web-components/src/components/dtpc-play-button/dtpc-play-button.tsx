/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { Component, Event as StencilEvent, EventEmitter, Host, h, Listen } from '@stencil/core';
import type { PlayerState } from "@/store/player";

@Component({
  tag: 'dtpc-play-button',
  styleUrl: 'dtpc-play-button.css',
  shadow: true
})
export class DtpcPlayButton {

  state: PlayerState;

  @StencilEvent({
    eventName: 'dtpc-control-init',
    bubbles: true,
    cancelable: true
  }) initControl: EventEmitter;

  @StencilEvent({
    eventName: 'audio-toggle-paused',
    bubbles: true,
    cancelable: true
  }) togglePaused: EventEmitter;

  componentWillLoad() {
    const self = this;

    this.initControl.emit((state: PlayerState) => self.state = state);
  }

  @Listen('click')
  handleClick() {
    this.togglePaused.emit();
  }

  render() {
    const { playing } = this.state;
    const label = playing ?
      __('Pause', 'dovetail-podcasts') :
      __('Play', 'dovetail-podcasts');
    const buttonAttributes = {
      type: 'button',
      title: label
    }

    return (
      <Host data-status={playing ? 'playing' : 'paused'}>
        <dtpc-button {...buttonAttributes}>
          {playing ?
            <icon-pause ></icon-pause> :
            <icon-play ></icon-play>
          }
        </dtpc-button>
      </Host>
    );
  }
}
