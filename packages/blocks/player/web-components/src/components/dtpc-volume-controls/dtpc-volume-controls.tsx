import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'dtpc-volume-controls',
  styleUrl: 'dtpc-volume-controls.css',
  shadow: true,
})
export class DtpcVolumeControls {

  @Prop() volume: number = 0.8;

  render() {
    return (
      <Host>
        <div class="wrapper">
          <dtpc-mute-button></dtpc-mute-button>
          <dtpc-volume-slider volume={this.volume} orient='vertical'></dtpc-volume-slider>
        </div>
      </Host>
    );
  }
}
