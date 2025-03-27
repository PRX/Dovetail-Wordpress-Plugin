/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { Component, Host, Listen, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'dtpc-play-button',
  styleUrl: 'dtpc-play-button.css',
  shadow: true,
})
export class DtpcPlayButton {

  @Prop({ attribute: 'icon-style'}) iconStyle: string = 'outline';

  @State() playing: boolean = false;

  @Listen('click', { capture: false })
  handleClick() {
    this.playing = !this.playing;
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

    return (
      <Host role="button" title={label}>
        {this.playing ?
          <icon-pause {...iconProps}></icon-pause> :
          <icon-play {...iconProps}></icon-play>
        }
      </Host>
    );
  }
}
