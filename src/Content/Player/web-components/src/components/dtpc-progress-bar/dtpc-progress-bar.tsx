import { Component, Event as StencilEvent, EventEmitter, Prop, h, State, Listen } from '@stencil/core';
import type { PlayerState } from "@/store/player";
import { SliderInputEvent } from '@/components/dtpc-slider/dtpc-slider';

@Component({
  tag: 'dtpc-progress-bar',
  styleUrl: 'dtpc-progress-bar.css',
  shadow: true,
})
export class DtpcProgressBar {

  state: PlayerState;

  @Prop() duration: number = 0;

  @State() audioDuration: number = this.duration;

  @StencilEvent({
    eventName: 'dtpc-control-init',
    bubbles: true,
    cancelable: true
  }) initControl: EventEmitter;

  componentWillLoad() {
    const self = this;

    this.audioDuration = this.duration;

    this.initControl.emit((state: PlayerState) => {
      self.state = state;
      self.audioDuration = state.duration || this.duration;
    });
  }

  @Listen('slider-input')
  handleInput(event: SliderInputEvent) {
    this.state.seekTime = event.detail;
  }

  @Listen('slider-change')
  handleChange() {
    this.state.seekTime = null;
  }

  render() {
    const { seekTime, currentTime, duration } = this.state;
    const time = seekTime !== null ? seekTime : currentTime;
    const max = duration || this.audioDuration;

    return (
      <div class="wrapper" aria-label="Seek slider" aria-valuemin="0" aria-valuemax={max} aria-valuenow={time}>
        <dtpc-slider tabindex={0} disabled={!max} defaultValue={0} min={0} max={max} step={1} value={time}></dtpc-slider>
      </div>
    );
  }
}
