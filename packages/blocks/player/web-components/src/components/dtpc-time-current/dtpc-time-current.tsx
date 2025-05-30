import { Component, Event as StencilEvent, EventEmitter, Host, h } from '@stencil/core';
import { formatDuration } from '@/lib/utils';
import type { PlayerState } from "@/store/player";

@Component({
  tag: 'dtpc-time-current',
  styleUrl: 'dtpc-time-current.css',
  shadow: true,
})
export class DtpcTimeCurrent {

  state: PlayerState;

  @StencilEvent({
    eventName: 'dtpc-control-init',
    bubbles: true,
    cancelable: true
  }) initControl: EventEmitter;

  componentWillLoad() {
    const self = this;

    this.initControl.emit((state: PlayerState) => self.state = state);
  }

  render() {
    const { seekTime, currentTime } = this.state;
    const time = seekTime !== null ? seekTime : currentTime;
    const displayTime = formatDuration(time);

    return (
      <Host>
        {displayTime}
      </Host>
    );
  }
}
