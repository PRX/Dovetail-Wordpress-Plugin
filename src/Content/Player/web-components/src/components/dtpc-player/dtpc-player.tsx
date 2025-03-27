import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'dtpc-player',
  styleUrl: 'dtpc-player.css',
  shadow: false,
})
export class DtpcPlayer {

  /**
   * Audio source URL.
   */
  @Prop() src: string;

  render() {
    return (
      <Host>
        <audio src={this.src} preload='none'/>
        <slot>
        </slot>
      </Host>
    );
  }
}
