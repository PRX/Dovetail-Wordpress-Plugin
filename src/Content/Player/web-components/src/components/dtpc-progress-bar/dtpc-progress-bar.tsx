/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { Component, Event as StencilEvent, EventEmitter, Prop, h, State, Listen, Host } from '@stencil/core';
import type { PlayerState } from "@/store/player";
import { SliderInputEvent } from '@/components/dtpc-slider/dtpc-slider';
import { convertDurationStringToIntegerArray, formatDuration } from "@/lib/utils";

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
      self.audioDuration = state.duration || self.audioDuration;
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
    const [timeSeconds, timeMinutes, timeHours] = convertDurationStringToIntegerArray(formatDuration(time));
    const [durationSeconds, durationMinutes, durationHours] = convertDurationStringToIntegerArray(formatDuration(duration));
    const max = duration || this.audioDuration;
    const ariaLabel = __('Seek slider', 'dovetail-podcasts');
    // TODO: Refactor to use Intl.DurationFormat. Too new to use now.
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat
    const ariaValueText = __([
      ...(timeHours && timeHours === 1 ? [__(`1 Hour`, 'dovetail-podcasts')] : []),
      // TRANSLATOR: '${timeHours}' is the current number of hours.
      ...(timeHours && timeHours > 1 ? [__(`${timeHours} Hours`, 'dovetail-podcasts')] : []),

      ...(timeMinutes === 1 ? [__(`1 Minute`, 'dovetail-podcasts')] : []),
      // TRANSLATOR: '${timeMinutes || 0}' is the current number of minutes.
      ...(timeMinutes !== 1 ? [__(`${timeMinutes || 0} Minutes`, 'dovetail-podcasts')] : []),

      ...(timeSeconds === 1 ? [__(`1 Second`, 'dovetail-podcasts')] : []),
      // TRANSLATOR: '${timeSeconds || 0}' is the current number of seconds.
      ...(timeSeconds !== 1 ? [__(`${timeSeconds || 0} Seconds`, 'dovetail-podcasts')] : []),

      __('of', 'dovetail-podcasts'),

      ...(durationHours && durationHours === 1 ? [__(`1 Hour`, 'dovetail-podcasts')] : []),
      // TRANSLATOR: '${durationHours}' is the total number of hours.
      ...(durationHours && durationHours > 1 ? [__(`${durationHours} Hours`, 'dovetail-podcasts')] : []),

      ...(durationMinutes === 1 ? [__(`1 Minute`, 'dovetail-podcasts')] : []),
      // TRANSLATOR: '${durationMinutes || 0}' is the total number of minutes.
      ...(durationMinutes !== 1 ? [__(`${durationMinutes || 0} Minutes`, 'dovetail-podcasts')] : []),

      ...(durationSeconds === 1 ? [__(`1 Second`, 'dovetail-podcasts')] : []),
      // TRANSLATOR: '${durationSeconds || 0}' is the total number of seconds.
      ...(durationSeconds !== 1 ? [__(`${durationSeconds || 0} Seconds`, 'dovetail-podcasts')] : [])
    ].join(' '), 'dovetail-podcasts');

    return (
      <Host aria-label={ariaLabel} aria-valuemin="0" aria-valuemax={max} aria-valuenow={time} aria-valuetext={ariaValueText}>
        <dtpc-slider tabindex={0} disabled={!max} defaultValue={0} min={0} max={max} step={1} value={time}></dtpc-slider>
      </Host>
    );
  }
}
