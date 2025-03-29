import { Component, Event as StencilEvent, Host, Prop, h, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'dtpc-progress-bar',
  styleUrl: 'dtpc-progress-bar.css',
  shadow: true,
})
export class DtpcProgressBar {

  @Prop() duration: number = 0;

  @State() audioDuration: number = this.duration;

  @State() currentTime: number = 0;

  @State() seekTime: number;

  @StencilEvent({
    eventName: 'bind-audio-events',
    bubbles: true,
    composed: false
  }) bindAudioEvents: EventEmitter;

  @StencilEvent({
    eventName: 'update-current-time',
    bubbles: true,
    composed: false
  }) updateCurrentTime: EventEmitter<number>;

  connectedCallback() {
    this.audioDuration = this.duration;
  }

  componentDidLoad() {
    ((self) => self.bindAudioEvents.emit([
      ['loadedmetadata', (e: Event) => { self.handleLoadedMetaData(e); }],
      ['timeupdate', (e: Event) => { self.handleTimeUpdate(e); }]
    ]))(this);
  }

  handleLoadedMetaData(event: Event) {
    this.audioDuration = (event.target as HTMLAudioElement).duration;
  }

  handleTimeUpdate(event: Event) {
    this.currentTime = (event.target as HTMLAudioElement).currentTime;
  }

  handleInput(event: Event) {
    const { value } = (event.target as HTMLInputElement);
    const newTime = parseFloat(value);

    console.log(value, newTime);
    this.seekTime = newTime;
  }

  handleChange() {
    this.currentTime = this.seekTime;
    this.seekTime = 0;
    this.updateCurrentTime.emit(this.currentTime);
  }

  render() {
    const progress = this.audioDuration && (this.seekTime || this.currentTime) / this.audioDuration;

    return (
      <Host aria-label="Seek slider" aria-valuemin="0" aria-valuemax={this.audioDuration} aria-valuenow={this.currentTime}>
        <div class="wrapper">
          <slot name="before" />
          <div class="track" style={{ '--progress': `${progress}` }}>
            <div class="progress" data-show={!!progress}></div>
            <div class="range">
              <div class="thumb"></div>
            </div>
            <input tabindex={0} type="range" disabled={!this.audioDuration} defaultValue="0" min={0} max={this.audioDuration} step={1} value={this.seekTime || this.currentTime} onInput={(e: Event) => this.handleInput(e)} onChange={() => this.handleChange()} />
          </div>
          <slot name="before" />
        </div>
      </Host>
    );
  }
}
