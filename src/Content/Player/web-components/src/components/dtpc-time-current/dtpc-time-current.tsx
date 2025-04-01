import { Component, Event as StencilEvent, EventEmitter, Host, h, State } from '@stencil/core';
import { formatDuration } from '@/lib/utils';
import type { PlayerState } from "@/store/player";

@Component({
  tag: 'dtpc-time-current',
  styleUrl: 'dtpc-time-current.css',
  shadow: true,
})
export class DtpcTimeCurrent {

  state: PlayerState;

  @State() currentTime: number = 0;

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

    this.state.audioElm.addEventListener('timeupdate', (e: Event) => { self.handleTimeUpdate(e); })
  }

  handleTimeUpdate(event: Event) {
    this.currentTime = (event.target as HTMLAudioElement).currentTime;
  }

  render() {
    const time = this.state.seekTime || this.state.audioElm.currentTime;
    const displayTime = formatDuration(time);

    return (
      <Host>
        {displayTime}
      </Host>
    );
  }
}
