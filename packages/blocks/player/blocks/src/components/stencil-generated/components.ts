'use client';

/**
 * This file was automatically generated by the Stencil React Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */

/* eslint-disable */

import type { EventName, StencilReactComponent } from '@stencil/react-output-target/runtime';
import { createComponent } from '@stencil/react-output-target/runtime';
import { DtpcButton as DtpcButtonElement, defineCustomElement as defineDtpcButton } from "dovetail-podcasts-player-web-components/dist/components/dtpc-button.js";
import { DtpcMuteButton as DtpcMuteButtonElement, defineCustomElement as defineDtpcMuteButton } from "dovetail-podcasts-player-web-components/dist/components/dtpc-mute-button.js";
import { DtpcPlayButton as DtpcPlayButtonElement, defineCustomElement as defineDtpcPlayButton } from "dovetail-podcasts-player-web-components/dist/components/dtpc-play-button.js";
import { DtpcPlayer as DtpcPlayerElement, defineCustomElement as defineDtpcPlayer } from "dovetail-podcasts-player-web-components/dist/components/dtpc-player.js";
import { DtpcProgressBar as DtpcProgressBarElement, defineCustomElement as defineDtpcProgressBar } from "dovetail-podcasts-player-web-components/dist/components/dtpc-progress-bar.js";
import { DtpcSlider as DtpcSliderElement, defineCustomElement as defineDtpcSlider } from "dovetail-podcasts-player-web-components/dist/components/dtpc-slider.js";
import { DtpcTimeCurrent as DtpcTimeCurrentElement, defineCustomElement as defineDtpcTimeCurrent } from "dovetail-podcasts-player-web-components/dist/components/dtpc-time-current.js";
import { DtpcTimeDisplay as DtpcTimeDisplayElement, defineCustomElement as defineDtpcTimeDisplay } from "dovetail-podcasts-player-web-components/dist/components/dtpc-time-display.js";
import { DtpcTimeDuration as DtpcTimeDurationElement, defineCustomElement as defineDtpcTimeDuration } from "dovetail-podcasts-player-web-components/dist/components/dtpc-time-duration.js";
import { DtpcVolumeControls as DtpcVolumeControlsElement, defineCustomElement as defineDtpcVolumeControls } from "dovetail-podcasts-player-web-components/dist/components/dtpc-volume-controls.js";
import { DtpcVolumeSlider as DtpcVolumeSliderElement, defineCustomElement as defineDtpcVolumeSlider } from "dovetail-podcasts-player-web-components/dist/components/dtpc-volume-slider.js";
import { IconPause as IconPauseElement, defineCustomElement as defineIconPause } from "dovetail-podcasts-player-web-components/dist/components/icon-pause.js";
import { IconPlay as IconPlayElement, defineCustomElement as defineIconPlay } from "dovetail-podcasts-player-web-components/dist/components/icon-play.js";
import { IconVolume as IconVolumeElement, defineCustomElement as defineIconVolume } from "dovetail-podcasts-player-web-components/dist/components/icon-volume.js";
import React from 'react';

type DtpcButtonEvents = NonNullable<unknown>;

export const DtpcButton: StencilReactComponent<DtpcButtonElement, DtpcButtonEvents> = /*@__PURE__*/ createComponent<DtpcButtonElement, DtpcButtonEvents>({
    tagName: 'dtpc-button',
    elementClass: DtpcButtonElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {} as DtpcButtonEvents,
    defineCustomElement: defineDtpcButton
});

type DtpcMuteButtonEvents = { onDtpcControlInit: EventName<CustomEvent<any>> };

export const DtpcMuteButton: StencilReactComponent<DtpcMuteButtonElement, DtpcMuteButtonEvents> = /*@__PURE__*/ createComponent<DtpcMuteButtonElement, DtpcMuteButtonEvents>({
    tagName: 'dtpc-mute-button',
    elementClass: DtpcMuteButtonElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onDtpcControlInit: 'dtpc-control-init' } as DtpcMuteButtonEvents,
    defineCustomElement: defineDtpcMuteButton
});

type DtpcPlayButtonEvents = {
    onDtpcControlInit: EventName<CustomEvent<any>>,
    onAudioTogglePaused: EventName<CustomEvent<any>>
};

export const DtpcPlayButton: StencilReactComponent<DtpcPlayButtonElement, DtpcPlayButtonEvents> = /*@__PURE__*/ createComponent<DtpcPlayButtonElement, DtpcPlayButtonEvents>({
    tagName: 'dtpc-play-button',
    elementClass: DtpcPlayButtonElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {
        onDtpcControlInit: 'dtpc-control-init',
        onAudioTogglePaused: 'audio-toggle-paused'
    } as DtpcPlayButtonEvents,
    defineCustomElement: defineDtpcPlayButton
});

type DtpcPlayerEvents = NonNullable<unknown>;

export const DtpcPlayer: StencilReactComponent<DtpcPlayerElement, DtpcPlayerEvents> = /*@__PURE__*/ createComponent<DtpcPlayerElement, DtpcPlayerEvents>({
    tagName: 'dtpc-player',
    elementClass: DtpcPlayerElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {} as DtpcPlayerEvents,
    defineCustomElement: defineDtpcPlayer
});

type DtpcProgressBarEvents = { onDtpcControlInit: EventName<CustomEvent<any>> };

export const DtpcProgressBar: StencilReactComponent<DtpcProgressBarElement, DtpcProgressBarEvents> = /*@__PURE__*/ createComponent<DtpcProgressBarElement, DtpcProgressBarEvents>({
    tagName: 'dtpc-progress-bar',
    elementClass: DtpcProgressBarElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onDtpcControlInit: 'dtpc-control-init' } as DtpcProgressBarEvents,
    defineCustomElement: defineDtpcProgressBar
});

type DtpcSliderEvents = {
    onSliderChange: EventName<CustomEvent<number>>,
    onSliderInput: EventName<CustomEvent<number>>
};

export const DtpcSlider: StencilReactComponent<DtpcSliderElement, DtpcSliderEvents> = /*@__PURE__*/ createComponent<DtpcSliderElement, DtpcSliderEvents>({
    tagName: 'dtpc-slider',
    elementClass: DtpcSliderElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {
        onSliderChange: 'slider-change',
        onSliderInput: 'slider-input'
    } as DtpcSliderEvents,
    defineCustomElement: defineDtpcSlider
});

type DtpcTimeCurrentEvents = { onDtpcControlInit: EventName<CustomEvent<any>> };

export const DtpcTimeCurrent: StencilReactComponent<DtpcTimeCurrentElement, DtpcTimeCurrentEvents> = /*@__PURE__*/ createComponent<DtpcTimeCurrentElement, DtpcTimeCurrentEvents>({
    tagName: 'dtpc-time-current',
    elementClass: DtpcTimeCurrentElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onDtpcControlInit: 'dtpc-control-init' } as DtpcTimeCurrentEvents,
    defineCustomElement: defineDtpcTimeCurrent
});

type DtpcTimeDisplayEvents = NonNullable<unknown>;

export const DtpcTimeDisplay: StencilReactComponent<DtpcTimeDisplayElement, DtpcTimeDisplayEvents> = /*@__PURE__*/ createComponent<DtpcTimeDisplayElement, DtpcTimeDisplayEvents>({
    tagName: 'dtpc-time-display',
    elementClass: DtpcTimeDisplayElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {} as DtpcTimeDisplayEvents,
    defineCustomElement: defineDtpcTimeDisplay
});

type DtpcTimeDurationEvents = { onDtpcControlInit: EventName<CustomEvent<any>> };

export const DtpcTimeDuration: StencilReactComponent<DtpcTimeDurationElement, DtpcTimeDurationEvents> = /*@__PURE__*/ createComponent<DtpcTimeDurationElement, DtpcTimeDurationEvents>({
    tagName: 'dtpc-time-duration',
    elementClass: DtpcTimeDurationElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onDtpcControlInit: 'dtpc-control-init' } as DtpcTimeDurationEvents,
    defineCustomElement: defineDtpcTimeDuration
});

type DtpcVolumeControlsEvents = NonNullable<unknown>;

export const DtpcVolumeControls: StencilReactComponent<DtpcVolumeControlsElement, DtpcVolumeControlsEvents> = /*@__PURE__*/ createComponent<DtpcVolumeControlsElement, DtpcVolumeControlsEvents>({
    tagName: 'dtpc-volume-controls',
    elementClass: DtpcVolumeControlsElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {} as DtpcVolumeControlsEvents,
    defineCustomElement: defineDtpcVolumeControls
});

type DtpcVolumeSliderEvents = { onDtpcControlInit: EventName<CustomEvent<any>> };

export const DtpcVolumeSlider: StencilReactComponent<DtpcVolumeSliderElement, DtpcVolumeSliderEvents> = /*@__PURE__*/ createComponent<DtpcVolumeSliderElement, DtpcVolumeSliderEvents>({
    tagName: 'dtpc-volume-slider',
    elementClass: DtpcVolumeSliderElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onDtpcControlInit: 'dtpc-control-init' } as DtpcVolumeSliderEvents,
    defineCustomElement: defineDtpcVolumeSlider
});

type IconPauseEvents = NonNullable<unknown>;

export const IconPause: StencilReactComponent<IconPauseElement, IconPauseEvents> = /*@__PURE__*/ createComponent<IconPauseElement, IconPauseEvents>({
    tagName: 'icon-pause',
    elementClass: IconPauseElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {} as IconPauseEvents,
    defineCustomElement: defineIconPause
});

type IconPlayEvents = NonNullable<unknown>;

export const IconPlay: StencilReactComponent<IconPlayElement, IconPlayEvents> = /*@__PURE__*/ createComponent<IconPlayElement, IconPlayEvents>({
    tagName: 'icon-play',
    elementClass: IconPlayElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {} as IconPlayEvents,
    defineCustomElement: defineIconPlay
});

type IconVolumeEvents = NonNullable<unknown>;

export const IconVolume: StencilReactComponent<IconVolumeElement, IconVolumeEvents> = /*@__PURE__*/ createComponent<IconVolumeElement, IconVolumeEvents>({
    tagName: 'icon-volume',
    elementClass: IconVolumeElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {} as IconVolumeEvents,
    defineCustomElement: defineIconVolume
});
