/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DtpcPlayButton {
        "iconStyle": string;
    }
    interface DtpcPlayer {
        /**
          * Audio source URL.
         */
        "src": string;
    }
    interface DtpcProgressBar {
        "duration": number;
    }
    interface DtpcSlider {
        "defaultValue": number;
        "disabled": boolean;
        "max": number;
        "min": number;
        "orient": 'vertical' | 'horizontal';
        "step": number;
        "value": number;
    }
    interface DtpcTimeCurrent {
    }
    interface DtpcTimeDisplay {
        "duration": number;
    }
    interface DtpcTimeDuration {
        "duration": number;
    }
    interface IconPause {
        "alignmentBaseline": any;
        "baselineShift": any;
        "clipPath": any;
        "clipRule": any;
        "color": any;
        "colorInterpolation": any;
        "colorInterpolationFilters": any;
        "colorRendering": any;
        "cursor": any;
        "cx": any;
        "cy": any;
        "d": any;
        "direction": any;
        "display": any;
        "dominantBaseline": any;
        "fill": any;
        "fillOpacity": any;
        "fillRule": any;
        "filter": any;
        "floodColor": any;
        "floodOpacity": any;
        "font": any;
        "fontFamily": any;
        "fontKerning": any;
        "fontSize": any;
        "fontSizeAdjust": any;
        "fontStretch": any;
        "fontStyle": any;
        "fontVariant": any;
        "fontWeight": any;
        "height": any;
        "imageRendering": any;
        "isolation": any;
        "letterSpacing": any;
        "lightingColor": any;
        "marker": any;
        "markerEnd": any;
        "markerMid": any;
        "markerStart": any;
        "mask": any;
        "maskClip": any;
        "maskComposite": any;
        "maskImage": any;
        "maskMode": any;
        "maskOrigin": any;
        "maskPosition": any;
        "maskRepeat": any;
        "maskSize": any;
        "maskType": any;
        "opacity": any;
        "overflow": any;
        "pointerEvents": any;
        "r": any;
        "rx": any;
        "ry": any;
        "shapeRendering": any;
        "stopColor": any;
        "stopOpacity": any;
        "stroke": any;
        "strokeDasharray": any;
        "strokeDashoffset": any;
        "strokeLinecap": any;
        "strokeLinejoin": any;
        "strokeMiterlimit": any;
        "strokeOpacity": any;
        "strokeWidth": any;
        "textAnchor": any;
        "textDecoration": any;
        "textOrientation": any;
        "textRendering": any;
        "transform": any;
        "transformBox": any;
        "transformOrigin": any;
        "unicodeBidi": any;
        "visibility": any;
        "width": any;
        "wordSpacing": any;
        "writingMode": any;
        "x": any;
        "y": any;
    }
    interface IconPlay {
        "alignmentBaseline": any;
        "baselineShift": any;
        "clipPath": any;
        "clipRule": any;
        "color": any;
        "colorInterpolation": any;
        "colorInterpolationFilters": any;
        "colorRendering": any;
        "cursor": any;
        "cx": any;
        "cy": any;
        "d": any;
        "direction": any;
        "display": any;
        "dominantBaseline": any;
        "fill": any;
        "fillOpacity": any;
        "fillRule": any;
        "filter": any;
        "floodColor": any;
        "floodOpacity": any;
        "font": any;
        "fontFamily": any;
        "fontKerning": any;
        "fontSize": any;
        "fontSizeAdjust": any;
        "fontStretch": any;
        "fontStyle": any;
        "fontVariant": any;
        "fontWeight": any;
        "height": any;
        "imageRendering": any;
        "isolation": any;
        "letterSpacing": any;
        "lightingColor": any;
        "marker": any;
        "markerEnd": any;
        "markerMid": any;
        "markerStart": any;
        "mask": any;
        "maskClip": any;
        "maskComposite": any;
        "maskImage": any;
        "maskMode": any;
        "maskOrigin": any;
        "maskPosition": any;
        "maskRepeat": any;
        "maskSize": any;
        "maskType": any;
        "opacity": any;
        "overflow": any;
        "pointerEvents": any;
        "r": any;
        "rx": any;
        "ry": any;
        "shapeRendering": any;
        "stopColor": any;
        "stopOpacity": any;
        "stroke": any;
        "strokeDasharray": any;
        "strokeDashoffset": any;
        "strokeLinecap": any;
        "strokeLinejoin": any;
        "strokeMiterlimit": any;
        "strokeOpacity": any;
        "strokeWidth": any;
        "textAnchor": any;
        "textDecoration": any;
        "textOrientation": any;
        "textRendering": any;
        "transform": any;
        "transformBox": any;
        "transformOrigin": any;
        "unicodeBidi": any;
        "visibility": any;
        "width": any;
        "wordSpacing": any;
        "writingMode": any;
        "x": any;
        "y": any;
    }
}
export interface DtpcPlayButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDtpcPlayButtonElement;
}
export interface DtpcProgressBarCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDtpcProgressBarElement;
}
export interface DtpcSliderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDtpcSliderElement;
}
export interface DtpcTimeCurrentCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDtpcTimeCurrentElement;
}
export interface DtpcTimeDurationCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDtpcTimeDurationElement;
}
declare global {
    interface HTMLDtpcPlayButtonElementEventMap {
        "dtpc-control-init": any;
    }
    interface HTMLDtpcPlayButtonElement extends Components.DtpcPlayButton, HTMLStencilElement {
        addEventListener<K extends keyof HTMLDtpcPlayButtonElementEventMap>(type: K, listener: (this: HTMLDtpcPlayButtonElement, ev: DtpcPlayButtonCustomEvent<HTMLDtpcPlayButtonElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLDtpcPlayButtonElementEventMap>(type: K, listener: (this: HTMLDtpcPlayButtonElement, ev: DtpcPlayButtonCustomEvent<HTMLDtpcPlayButtonElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLDtpcPlayButtonElement: {
        prototype: HTMLDtpcPlayButtonElement;
        new (): HTMLDtpcPlayButtonElement;
    };
    interface HTMLDtpcPlayerElement extends Components.DtpcPlayer, HTMLStencilElement {
    }
    var HTMLDtpcPlayerElement: {
        prototype: HTMLDtpcPlayerElement;
        new (): HTMLDtpcPlayerElement;
    };
    interface HTMLDtpcProgressBarElementEventMap {
        "dtpc-control-init": any;
    }
    interface HTMLDtpcProgressBarElement extends Components.DtpcProgressBar, HTMLStencilElement {
        addEventListener<K extends keyof HTMLDtpcProgressBarElementEventMap>(type: K, listener: (this: HTMLDtpcProgressBarElement, ev: DtpcProgressBarCustomEvent<HTMLDtpcProgressBarElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLDtpcProgressBarElementEventMap>(type: K, listener: (this: HTMLDtpcProgressBarElement, ev: DtpcProgressBarCustomEvent<HTMLDtpcProgressBarElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLDtpcProgressBarElement: {
        prototype: HTMLDtpcProgressBarElement;
        new (): HTMLDtpcProgressBarElement;
    };
    interface HTMLDtpcSliderElementEventMap {
        "slider-change": number;
        "slider-input": number;
    }
    interface HTMLDtpcSliderElement extends Components.DtpcSlider, HTMLStencilElement {
        addEventListener<K extends keyof HTMLDtpcSliderElementEventMap>(type: K, listener: (this: HTMLDtpcSliderElement, ev: DtpcSliderCustomEvent<HTMLDtpcSliderElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLDtpcSliderElementEventMap>(type: K, listener: (this: HTMLDtpcSliderElement, ev: DtpcSliderCustomEvent<HTMLDtpcSliderElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLDtpcSliderElement: {
        prototype: HTMLDtpcSliderElement;
        new (): HTMLDtpcSliderElement;
    };
    interface HTMLDtpcTimeCurrentElementEventMap {
        "dtpc-control-init": any;
    }
    interface HTMLDtpcTimeCurrentElement extends Components.DtpcTimeCurrent, HTMLStencilElement {
        addEventListener<K extends keyof HTMLDtpcTimeCurrentElementEventMap>(type: K, listener: (this: HTMLDtpcTimeCurrentElement, ev: DtpcTimeCurrentCustomEvent<HTMLDtpcTimeCurrentElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLDtpcTimeCurrentElementEventMap>(type: K, listener: (this: HTMLDtpcTimeCurrentElement, ev: DtpcTimeCurrentCustomEvent<HTMLDtpcTimeCurrentElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLDtpcTimeCurrentElement: {
        prototype: HTMLDtpcTimeCurrentElement;
        new (): HTMLDtpcTimeCurrentElement;
    };
    interface HTMLDtpcTimeDisplayElement extends Components.DtpcTimeDisplay, HTMLStencilElement {
    }
    var HTMLDtpcTimeDisplayElement: {
        prototype: HTMLDtpcTimeDisplayElement;
        new (): HTMLDtpcTimeDisplayElement;
    };
    interface HTMLDtpcTimeDurationElementEventMap {
        "dtpc-control-init": any;
    }
    interface HTMLDtpcTimeDurationElement extends Components.DtpcTimeDuration, HTMLStencilElement {
        addEventListener<K extends keyof HTMLDtpcTimeDurationElementEventMap>(type: K, listener: (this: HTMLDtpcTimeDurationElement, ev: DtpcTimeDurationCustomEvent<HTMLDtpcTimeDurationElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLDtpcTimeDurationElementEventMap>(type: K, listener: (this: HTMLDtpcTimeDurationElement, ev: DtpcTimeDurationCustomEvent<HTMLDtpcTimeDurationElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLDtpcTimeDurationElement: {
        prototype: HTMLDtpcTimeDurationElement;
        new (): HTMLDtpcTimeDurationElement;
    };
    interface HTMLIconPauseElement extends Components.IconPause, HTMLStencilElement {
    }
    var HTMLIconPauseElement: {
        prototype: HTMLIconPauseElement;
        new (): HTMLIconPauseElement;
    };
    interface HTMLIconPlayElement extends Components.IconPlay, HTMLStencilElement {
    }
    var HTMLIconPlayElement: {
        prototype: HTMLIconPlayElement;
        new (): HTMLIconPlayElement;
    };
    interface HTMLElementTagNameMap {
        "dtpc-play-button": HTMLDtpcPlayButtonElement;
        "dtpc-player": HTMLDtpcPlayerElement;
        "dtpc-progress-bar": HTMLDtpcProgressBarElement;
        "dtpc-slider": HTMLDtpcSliderElement;
        "dtpc-time-current": HTMLDtpcTimeCurrentElement;
        "dtpc-time-display": HTMLDtpcTimeDisplayElement;
        "dtpc-time-duration": HTMLDtpcTimeDurationElement;
        "icon-pause": HTMLIconPauseElement;
        "icon-play": HTMLIconPlayElement;
    }
}
declare namespace LocalJSX {
    interface DtpcPlayButton {
        "iconStyle"?: string;
        "onDtpc-control-init"?: (event: DtpcPlayButtonCustomEvent<any>) => void;
    }
    interface DtpcPlayer {
        /**
          * Audio source URL.
         */
        "src"?: string;
    }
    interface DtpcProgressBar {
        "duration"?: number;
        "onDtpc-control-init"?: (event: DtpcProgressBarCustomEvent<any>) => void;
    }
    interface DtpcSlider {
        "defaultValue"?: number;
        "disabled"?: boolean;
        "max"?: number;
        "min"?: number;
        "onSlider-change"?: (event: DtpcSliderCustomEvent<number>) => void;
        "onSlider-input"?: (event: DtpcSliderCustomEvent<number>) => void;
        "orient"?: 'vertical' | 'horizontal';
        "step"?: number;
        "value"?: number;
    }
    interface DtpcTimeCurrent {
        "onDtpc-control-init"?: (event: DtpcTimeCurrentCustomEvent<any>) => void;
    }
    interface DtpcTimeDisplay {
        "duration"?: number;
    }
    interface DtpcTimeDuration {
        "duration"?: number;
        "onDtpc-control-init"?: (event: DtpcTimeDurationCustomEvent<any>) => void;
    }
    interface IconPause {
        "alignmentBaseline"?: any;
        "baselineShift"?: any;
        "clipPath"?: any;
        "clipRule"?: any;
        "color"?: any;
        "colorInterpolation"?: any;
        "colorInterpolationFilters"?: any;
        "colorRendering"?: any;
        "cursor"?: any;
        "cx"?: any;
        "cy"?: any;
        "d"?: any;
        "direction"?: any;
        "display"?: any;
        "dominantBaseline"?: any;
        "fill"?: any;
        "fillOpacity"?: any;
        "fillRule"?: any;
        "filter"?: any;
        "floodColor"?: any;
        "floodOpacity"?: any;
        "font"?: any;
        "fontFamily"?: any;
        "fontKerning"?: any;
        "fontSize"?: any;
        "fontSizeAdjust"?: any;
        "fontStretch"?: any;
        "fontStyle"?: any;
        "fontVariant"?: any;
        "fontWeight"?: any;
        "height"?: any;
        "imageRendering"?: any;
        "isolation"?: any;
        "letterSpacing"?: any;
        "lightingColor"?: any;
        "marker"?: any;
        "markerEnd"?: any;
        "markerMid"?: any;
        "markerStart"?: any;
        "mask"?: any;
        "maskClip"?: any;
        "maskComposite"?: any;
        "maskImage"?: any;
        "maskMode"?: any;
        "maskOrigin"?: any;
        "maskPosition"?: any;
        "maskRepeat"?: any;
        "maskSize"?: any;
        "maskType"?: any;
        "opacity"?: any;
        "overflow"?: any;
        "pointerEvents"?: any;
        "r"?: any;
        "rx"?: any;
        "ry"?: any;
        "shapeRendering"?: any;
        "stopColor"?: any;
        "stopOpacity"?: any;
        "stroke"?: any;
        "strokeDasharray"?: any;
        "strokeDashoffset"?: any;
        "strokeLinecap"?: any;
        "strokeLinejoin"?: any;
        "strokeMiterlimit"?: any;
        "strokeOpacity"?: any;
        "strokeWidth"?: any;
        "textAnchor"?: any;
        "textDecoration"?: any;
        "textOrientation"?: any;
        "textRendering"?: any;
        "transform"?: any;
        "transformBox"?: any;
        "transformOrigin"?: any;
        "unicodeBidi"?: any;
        "visibility"?: any;
        "width"?: any;
        "wordSpacing"?: any;
        "writingMode"?: any;
        "x"?: any;
        "y"?: any;
    }
    interface IconPlay {
        "alignmentBaseline"?: any;
        "baselineShift"?: any;
        "clipPath"?: any;
        "clipRule"?: any;
        "color"?: any;
        "colorInterpolation"?: any;
        "colorInterpolationFilters"?: any;
        "colorRendering"?: any;
        "cursor"?: any;
        "cx"?: any;
        "cy"?: any;
        "d"?: any;
        "direction"?: any;
        "display"?: any;
        "dominantBaseline"?: any;
        "fill"?: any;
        "fillOpacity"?: any;
        "fillRule"?: any;
        "filter"?: any;
        "floodColor"?: any;
        "floodOpacity"?: any;
        "font"?: any;
        "fontFamily"?: any;
        "fontKerning"?: any;
        "fontSize"?: any;
        "fontSizeAdjust"?: any;
        "fontStretch"?: any;
        "fontStyle"?: any;
        "fontVariant"?: any;
        "fontWeight"?: any;
        "height"?: any;
        "imageRendering"?: any;
        "isolation"?: any;
        "letterSpacing"?: any;
        "lightingColor"?: any;
        "marker"?: any;
        "markerEnd"?: any;
        "markerMid"?: any;
        "markerStart"?: any;
        "mask"?: any;
        "maskClip"?: any;
        "maskComposite"?: any;
        "maskImage"?: any;
        "maskMode"?: any;
        "maskOrigin"?: any;
        "maskPosition"?: any;
        "maskRepeat"?: any;
        "maskSize"?: any;
        "maskType"?: any;
        "opacity"?: any;
        "overflow"?: any;
        "pointerEvents"?: any;
        "r"?: any;
        "rx"?: any;
        "ry"?: any;
        "shapeRendering"?: any;
        "stopColor"?: any;
        "stopOpacity"?: any;
        "stroke"?: any;
        "strokeDasharray"?: any;
        "strokeDashoffset"?: any;
        "strokeLinecap"?: any;
        "strokeLinejoin"?: any;
        "strokeMiterlimit"?: any;
        "strokeOpacity"?: any;
        "strokeWidth"?: any;
        "textAnchor"?: any;
        "textDecoration"?: any;
        "textOrientation"?: any;
        "textRendering"?: any;
        "transform"?: any;
        "transformBox"?: any;
        "transformOrigin"?: any;
        "unicodeBidi"?: any;
        "visibility"?: any;
        "width"?: any;
        "wordSpacing"?: any;
        "writingMode"?: any;
        "x"?: any;
        "y"?: any;
    }
    interface IntrinsicElements {
        "dtpc-play-button": DtpcPlayButton;
        "dtpc-player": DtpcPlayer;
        "dtpc-progress-bar": DtpcProgressBar;
        "dtpc-slider": DtpcSlider;
        "dtpc-time-current": DtpcTimeCurrent;
        "dtpc-time-display": DtpcTimeDisplay;
        "dtpc-time-duration": DtpcTimeDuration;
        "icon-pause": IconPause;
        "icon-play": IconPlay;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dtpc-play-button": LocalJSX.DtpcPlayButton & JSXBase.HTMLAttributes<HTMLDtpcPlayButtonElement>;
            "dtpc-player": LocalJSX.DtpcPlayer & JSXBase.HTMLAttributes<HTMLDtpcPlayerElement>;
            "dtpc-progress-bar": LocalJSX.DtpcProgressBar & JSXBase.HTMLAttributes<HTMLDtpcProgressBarElement>;
            "dtpc-slider": LocalJSX.DtpcSlider & JSXBase.HTMLAttributes<HTMLDtpcSliderElement>;
            "dtpc-time-current": LocalJSX.DtpcTimeCurrent & JSXBase.HTMLAttributes<HTMLDtpcTimeCurrentElement>;
            "dtpc-time-display": LocalJSX.DtpcTimeDisplay & JSXBase.HTMLAttributes<HTMLDtpcTimeDisplayElement>;
            "dtpc-time-duration": LocalJSX.DtpcTimeDuration & JSXBase.HTMLAttributes<HTMLDtpcTimeDurationElement>;
            "icon-pause": LocalJSX.IconPause & JSXBase.HTMLAttributes<HTMLIconPauseElement>;
            "icon-play": LocalJSX.IconPlay & JSXBase.HTMLAttributes<HTMLIconPlayElement>;
        }
    }
}
