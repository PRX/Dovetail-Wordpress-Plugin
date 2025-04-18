import { Component, Event as StencilEvent, EventEmitter, Host, h, Prop, State } from '@stencil/core';
import { formatDuration } from '@/lib/utils';
import type { PlayerState } from "@/store/player";

@Component({
  tag: 'dtpc-time-duration',
  styleUrl: 'dtpc-time-duration.css',
  shadow: true,
})
export class DtpcTimeDuration {

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

  render() {
    const { duration } = this.state;
    const displayDuration = formatDuration( duration || this.audioDuration );

    return (
      <Host>
        {displayDuration}
      </Host>
    );
  }
}
