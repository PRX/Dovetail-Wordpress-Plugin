import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'dtpc-time-display',
  styleUrl: 'dtpc-time-display.css',
  shadow: true,
})
export class DtpcTimeDisplay {

  @Prop() duration: number = 0;

  render() {
    return (
      <Host>
        <div class="wrapper">
          <dtpc-time-current></dtpc-time-current>
          <span class="separator">/</span>
          <dtpc-time-duration duration={this.duration}></dtpc-time-duration>
        </div>
      </Host>
    );
  }
}
