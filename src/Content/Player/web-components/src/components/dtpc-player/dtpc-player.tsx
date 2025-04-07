import { Component, Host, Listen, Prop, Watch, h, State } from '@stencil/core';
import { playerState } from '@/store';
import type { PlayerState } from '@/store/player';

@Component({
  tag: 'dtpc-player',
  styleUrl: 'dtpc-player.css',
  shadow: true,
})
export class DtpcPlayer {

  state: PlayerState;

  /**
   * Audio source URL.
   */
  @Prop() src: string;

  @Prop() duration: number = 0;

  @State() audioDuration: number = this.duration;

  connectedCallback() {
    const { state, onChange } = playerState.createStore(this.src);
    const { audioElm } = state;
    let previousSeekTime: number = state.seekTime;

    this.audioDuration = this.duration;
    this.state = state;

    state.duration = this.audioDuration;

    onChange('seekTime', (seekTime) => {
      if (previousSeekTime !== null && seekTime === null) {
        audioElm.currentTime = previousSeekTime;
        state.currentTime = previousSeekTime;
      }
      previousSeekTime = seekTime;
    });
    onChange('muted', (muted) => audioElm.muted = muted);
    onChange('volume', (volume) => audioElm.volume = volume);

    state.audioElm.addEventListener('loadedmetadata', (e: Event) => {
      state.currentTime = (e.target as HTMLAudioElement).currentTime;
      state.duration = (e.target as HTMLAudioElement).duration;
    });
    state.audioElm.addEventListener('timeupdate', (e: Event) => state.currentTime = (e.target as HTMLAudioElement).currentTime);
    state.audioElm.addEventListener('play', () => state.playing = true);
    state.audioElm.addEventListener('pause', () => state.playing = false);
  }

  disconnectedCallback() {
    this.state.audioElm.pause();
  }

  @Listen('audio-toggle-paused')
  handleTogglePaused() {
    if (this.state.audioElm.paused) {
      this.state.audioElm.play()
        .then(() => {
          // Setup media session.
        })
        .catch((e) => {
          console.error(e);
        })
    } else {
      this.state.audioElm.pause();
    }
  }

  @Listen('dtpc-control-init')
  handleControlInit(e: CustomEvent){
    if (e.detail instanceof Function) {
      e.stopPropagation();
      e.detail(this.state);
    }
  }

  @Watch('src')
  watchSrcHandler(newSrc: string) {
    if (!this.state.audioElm.paused) {
      this.state.audioElm.pause();
    }
    this.state.audioElm.src = newSrc;
  }

  render() {
    return (
      <Host>
        <div class="wrapper">
          <div part="backdrop"></div>
          <div class="main">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
