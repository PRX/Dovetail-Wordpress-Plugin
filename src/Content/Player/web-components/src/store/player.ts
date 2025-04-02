import { createStore, ObservableMap } from '@stencil/store';

export type PlayerState = {
  audioElm: HTMLAudioElement,
  playing: boolean,
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
      playing: false,
      seekTime: null,
    });

    this.stores.push(newStore);

    return newStore;
  }
}

const factory = new playerStateFactory

export default factory;
