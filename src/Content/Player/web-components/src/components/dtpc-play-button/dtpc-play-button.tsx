/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { Component, Event as StencilEvent, EventEmitter, Host, Prop, State, h, Element } from '@stencil/core';
import type { PlayerState } from "@/store/player";

@Component({
  tag: 'dtpc-play-button',
  styleUrl: 'dtpc-play-button.css',
  shadow: true
})
export class DtpcPlayButton {

  state: PlayerState;

  @Element() el: HTMLElement;

  @Prop({ attribute: 'icon-style'}) iconStyle: string = 'outline';

  @State() playing: boolean = false;

  @StencilEvent({
    eventName: 'dtpc-control-init',
    bubbles: true,
    cancelable: true
  }) initControl: EventEmitter;

  componentWillLoad() {
    const self = this;

    this.initControl.emit((state: PlayerState) => self.state = state);
  }

  componentDidLoad() {
    const self = this;
    this.state.audioElm.addEventListener('play', () => self.handlePlay());
    this.state.audioElm.addEventListener('pause', () => self.handlePause());
  }

  handlePlay() {
    this.playing = true;
  }

  handlePause() {
    this.playing = false;
  }

  handleClick() {
    if (this.state.audioElm.paused) {
      this.state.audioElm.play()
        .then(() => {
          // Setup media session.
          console.log('This is from teh state audio elm playing...')
        })
        .catch((e) => {
          console.error(e);
        })
    } else {
      this.state.audioElm.pause();
    }
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
