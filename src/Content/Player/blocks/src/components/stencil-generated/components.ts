'use client';

/**
 * This file was automatically generated by the Stencil React Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */

/* eslint-disable */

import type { EventName, StencilReactComponent } from '@stencil/react-output-target/runtime';
import { createComponent } from '@stencil/react-output-target/runtime';
import { DtpcPlayButton as DtpcPlayButtonElement, defineCustomElement as defineDtpcPlayButton } from "dovetail-podcasts-player-web-components/dist/components/dtpc-play-button.js";
import { DtpcPlayer as DtpcPlayerElement, defineCustomElement as defineDtpcPlayer } from "dovetail-podcasts-player-web-components/dist/components/dtpc-player.js";
import { DtpcProgressBar as DtpcProgressBarElement, defineCustomElement as defineDtpcProgressBar } from "dovetail-podcasts-player-web-components/dist/components/dtpc-progress-bar.js";
import { IconPause as IconPauseElement, defineCustomElement as defineIconPause } from "dovetail-podcasts-player-web-components/dist/components/icon-pause.js";
import { IconPlay as IconPlayElement, defineCustomElement as defineIconPlay } from "dovetail-podcasts-player-web-components/dist/components/icon-play.js";
import React from 'react';

type DtpcPlayButtonEvents = {
    onBindAudioEvents: EventName<CustomEvent<any>>,
    onTogglePause: EventName<CustomEvent<any>>
};

export const DtpcPlayButton: StencilReactComponent<DtpcPlayButtonElement, DtpcPlayButtonEvents> = /*@__PURE__*/ createComponent<DtpcPlayButtonElement, DtpcPlayButtonEvents>({
    tagName: 'dtpc-play-button',
    elementClass: DtpcPlayButtonElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {
        onBindAudioEvents: 'bind-audio-events',
        onTogglePause: 'toggle-pause'
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

type DtpcProgressBarEvents = {
    onBindAudioEvents: EventName<CustomEvent<any>>,
    onUpdateCurrentTime: EventName<CustomEvent<number>>
};

export const DtpcProgressBar: StencilReactComponent<DtpcProgressBarElement, DtpcProgressBarEvents> = /*@__PURE__*/ createComponent<DtpcProgressBarElement, DtpcProgressBarEvents>({
    tagName: 'dtpc-progress-bar',
    elementClass: DtpcProgressBarElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {
        onBindAudioEvents: 'bind-audio-events',
        onUpdateCurrentTime: 'update-current-time'
    } as DtpcProgressBarEvents,
    defineCustomElement: defineDtpcProgressBar
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
