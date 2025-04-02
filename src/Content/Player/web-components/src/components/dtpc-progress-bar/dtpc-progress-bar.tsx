import { Component, Event as StencilEvent, EventEmitter, Prop, h, State, Listen } from '@stencil/core';
import type { PlayerState } from "@/store/player";
import { SliderChangeEvent, SliderInputEvent } from '@/components/dtpc-slider/dtpc-slider';

@Component({
  tag: 'dtpc-progress-bar',
  styleUrl: 'dtpc-progress-bar.css',
  shadow: true,
})
export class DtpcProgressBar {

  state: PlayerState;

  @Prop() duration: number = 0;

  @State() audioDuration: number = this.duration;

  @State() currentTime: number = 0;

  @State() seekTime: number;

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
      self.audioDuration = state.audioElm.duration || this.duration;
    });
  }

  componentDidLoad() {
    const self = this;

    this.state.audioElm.addEventListener('loadedmetadata', (e: Event) => { self.handleLoadedMetaData(e); });
    this.state.audioElm.addEventListener('timeupdate', (e: Event) => { self.handleTimeUpdate(e); });

  }

  handleLoadedMetaData(event: Event) {
    this.currentTime = (event.target as HTMLAudioElement).currentTime;
    this.audioDuration = (event.target as HTMLAudioElement).duration;
  }

  handleTimeUpdate(event: Event) {
    this.currentTime = (event.target as HTMLAudioElement).currentTime;
  }

  @Listen('slider-input')
  handleInput(event: SliderInputEvent) {
    this.state.seekTime = event.detail;
    this.seekTime = event.detail;
  }

  @Listen('slider-change')
  handleChange(event: SliderChangeEvent) {
    this.currentTime = event.detail;
    this.seekTime = null;
    this.state.audioElm.currentTime = this.currentTime;
    this.state.seekTime = this.seekTime;
  }

  render() {
    const time = this.seekTime !== null ? this.seekTime : this.currentTime;

    return (
      <div class="wrapper" aria-label="Seek slider" aria-valuemin="0" aria-valuemax={this.audioDuration} aria-valuenow={time}>
        <dtpc-slider tabindex={0} disabled={!this.audioDuration} defaultValue={0} min={0} max={this.audioDuration} step={1} value={time}></dtpc-slider>
      </div>
    );
  }
}
