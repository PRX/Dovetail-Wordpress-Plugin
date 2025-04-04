import { createStore, ObservableMap } from '@stencil/store';

export type PlayerState = {
  audioElm: HTMLAudioElement,
  currentTime: number,
  duration: number,
  muted: boolean,
  playing: boolean,
  volume: number,
  seekTime: number,
}

class playerStateFactory {
  stores: ObservableMap<PlayerState>[] = [];

  createStore(src:string) {
    const audioElm = new Audio();

    audioElm.preload = 'none';
    audioElm.src = src;

    const newStore = createStore<PlayerState>({
      audioElm,
      currentTime: audioElm.currentTime,
      duration: audioElm.duration,
      muted: audioElm.muted,
      playing: !audioElm.paused,
      volume: audioElm.volume,
      seekTime: null,
    });

    this.stores.push(newStore);

    return newStore;
  }
}

const factory = new playerStateFactory

export default factory;
