import { Component, Event as StencilEvent, EventEmitter, Host, Prop, h, State } from '@stencil/core';
import type { PlayerState } from "@/store/player";

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

    this.initControl.emit((state: PlayerState) => self.state = state);
  }

  componentDidLoad() {
    const self = this;

    this.state.audioElm.addEventListener('loadedmetadata', (e: Event) => { self.handleLoadedMetaData(e); });
    this.state.audioElm.addEventListener('timeupdate', (e: Event) => { self.handleTimeUpdate(e); });

    this.audioDuration = this.state.audioElm.duration || this.duration;
  }

  handleLoadedMetaData(event: Event) {
    this.currentTime = (event.target as HTMLAudioElement).currentTime;
    this.audioDuration = (event.target as HTMLAudioElement).duration;
  }

  handleTimeUpdate(event: Event) {
    this.currentTime = (event.target as HTMLAudioElement).currentTime;
  }

  handleInput(event: Event) {
    const { value } = (event.target as HTMLInputElement);
    const newTime = parseFloat(value);

    this.state.seekTime = newTime;
    this.seekTime = newTime;
  }

  handleChange() {
    this.currentTime = this.seekTime;
    this.seekTime = 0;
    this.state.audioElm.currentTime = this.currentTime;
    this.state.seekTime = 0;
  }

  render() {
    const time = this.seekTime || this.currentTime
    const progress = this.audioDuration && time / this.audioDuration;

    return (
      <Host>
        <div class="wrapper" aria-label="Seek slider" aria-valuemin="0" aria-valuemax={this.audioDuration} aria-valuenow={time}>
          <div class="track" style={{ '--progress': `${progress}` }}>
            <div class="progress" data-show={!!progress}></div>
            <div class="range">
              <div class="scrubber"></div>
            </div>
            <input tabindex={0} type="range" disabled={!this.audioDuration} defaultValue="0" min={0} max={this.audioDuration} step={1} value={time} onInput={(e: Event) => this.handleInput(e)} onChange={() => this.handleChange()} />
          </div>
        </div>
      </Host>
    );
  }
}
