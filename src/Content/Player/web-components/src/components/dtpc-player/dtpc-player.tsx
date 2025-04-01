import { Component, Host, Listen, Prop, Watch, h } from '@stencil/core';
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

  connectedCallback() {
    this.state = playerState.createStore(this.src).state;
  }

  disconnectedCallback() {
    this.state.audioElm.pause();
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
