import { Component, Host, Listen, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'dtpc-player',
  styleUrl: 'dtpc-player.css',
  shadow: true,
})
export class DtpcPlayer {

  audio: HTMLAudioElement

  /**
   * Audio source URL.
   */
  @Prop() src: string;

  connectedCallback() {
    this.audio = new Audio();
    this.audio.src = this.src;
    this.audio.preload = 'none';
  }

  disconnectedCallback() {
    this.audio.pause();
    delete this.audio;
  }

  @Watch('src')
  watchSrcHandler(newSrc: string) {
    if (!this.audio.paused) {
      this.audio.pause();
    }
    this.audio.src = newSrc;
  }

  @Listen('toggle-pause')
  pauseAudioHandler() {
    if (this.audio.paused) {
      this.audio.play()
        .then(() => {
          // Setup media session events.
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      this.audio.pause();
    }

  }

  @Listen('update-current-time')
  updateCurrentTime(event: CustomEvent) {
    console.log('update-current-time received:', event.detail)
    this.audio.currentTime = event.detail;
  }

  @Listen('bind-audio-events')
  handleBindAudio(event: CustomEvent) {
    event.detail.forEach(([n, cb]) => {
      this.audio.addEventListener(n, cb);
    })
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
