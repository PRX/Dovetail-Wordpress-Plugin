/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { Component, Event as StencilEvent, EventEmitter, Host, h, Listen, Prop } from '@stencil/core';
import type { PlayerState } from "@/store/player";
import { SliderInputEvent } from '@/components/dtpc-slider/dtpc-slider';

@Component({
  tag: 'dtpc-volume-slider',
  styleUrl: 'dtpc-volume-slider.css',
  shadow: true,
})
export class DtpcVolumeSlider {

  state: PlayerState;

  @Prop() orient: 'vertical' | 'horizontal';

  @Prop() volume: number = 0.8;

  @StencilEvent({
    eventName: 'dtpc-control-init',
    bubbles: true,
    cancelable: true
  }) initControl: EventEmitter;

  componentWillLoad() {
    const self = this;

    this.initControl.emit((state: PlayerState) => {
      self.state = state;
      state.volume = self.volume;
    });
  }

  @Listen('slider-input')
  handleInput(event: SliderInputEvent) {
    this.state.volume = event.detail;
  }

  render() {
    const { volume } = this.state;
    const ariaLabel = __('Volume slider', 'dovetail-podcasts');
    // TRANSLATOR: '${volume * 100}' is the current volume as a percentage.
    const ariaValueText = __(`${volume * 100}% volume`, 'dovetail-podcasts');

    return (
      <Host aria-label={ariaLabel} aria-valuemin="0" aria-valuemax="1" aria-valuenow={volume} aria-valuetext={ariaValueText}>
        <dtpc-slider defaultValue={volume} min={0} max={1} step={0.01} value={volume} orient={this.orient}></dtpc-slider>
      </Host>
    );
  }
}
