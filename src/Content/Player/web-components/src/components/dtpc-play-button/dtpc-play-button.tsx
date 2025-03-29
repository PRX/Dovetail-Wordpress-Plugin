/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { Component, Event as StencilEvent, EventEmitter, Host, Prop, State, h, Element } from '@stencil/core';
import { attributesToObject } from "@/lib/utils/dom";

@Component({
  tag: 'dtpc-play-button',
  styleUrl: 'dtpc-play-button.css',
  shadow: true
})
export class DtpcPlayButton {

  @Element() el: HTMLElement;

  audio: HTMLAudioElement;

  @Prop({ attribute: 'icon-style'}) iconStyle: string = 'outline';

  @State() playing: boolean = false;

  @StencilEvent({
    eventName: 'bind-audio-events',
    bubbles: true,
    composed: false
  }) bindAudioEvents: EventEmitter;

  @StencilEvent({
    eventName: 'toggle-pause',
    bubbles: true,
  }) togglePause: EventEmitter;

  componentDidLoad() {
    ((self) => self.bindAudioEvents.emit([
      ['play', () => { self.handlePlay(); }],
      ['pause', () => { self.handlePause(); }]
    ]))(this);
  }

  handlePlay() {
    this.playing = true;
  }

  handlePause() {
    this.playing = false;
  }

  handleClick() {
    this.togglePause.emit();
  }

  render() {
    const label = this.playing ?
      __('Pause', 'dovetail-podcasts') :
      __('Play', 'dovetail-podcasts');
    const iconProps = {
      ...('solid' === this.iconStyle && {
        fill: 'currentColor',
        stroke: 'none'
      })
    }
    const buttonAttributes = {
      ...attributesToObject(this.el),
      type: 'button',
      title: label,
      'data-status': this.playing ? 'playing' : 'paused'
    }

    return (
      <Host>
        <button {...buttonAttributes} onClick={() => this.handleClick()}>
          {this.playing ?
            <icon-pause {...iconProps}></icon-pause> :
            <icon-play {...iconProps}></icon-play>
          }
        </button>
      </Host>
    );
  }
}
