/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { Component, Event as StencilEvent, EventEmitter, Host, h, Listen } from '@stencil/core';
import type { PlayerState } from "@/store/player";

@Component({
  tag: 'dtpc-mute-button',
  styleUrl: 'dtpc-mute-button.css',
  shadow: true,
})
export class DtpcMuteButton {

  state: PlayerState;

  @StencilEvent({
    eventName: 'dtpc-control-init',
    bubbles: true,
    cancelable: true
  }) initControl: EventEmitter;

  componentWillLoad() {
    const self = this;

    this.initControl.emit((state: PlayerState) => self.state = state);
  }

  @Listen('click')
  handleClick() {
    if (!this.state?.audioElm) return;

    this.state.audioElm.muted = !this.state.audioElm.muted;
    this.state.muted = this.state.audioElm.muted;
  }

  render() {
    const { muted, volume } = this.state || {};
    const label = muted ?
      __('Unmute', 'dovetail-podcasts') :
      __('Mute', 'dovetail-podcasts');
    const buttonAttributes = {
      title: label
    }

    return (
      <Host>
        <dtpc-button {...buttonAttributes}>
          <icon-volume muted={muted} level={volume}></icon-volume>
        </dtpc-button>
      </Host>
    );
  }
}
