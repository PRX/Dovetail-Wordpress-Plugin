import { Component, Element, h, Host, Prop } from '@stencil/core';
import { Play as LucidePlay, createElement } from 'lucide';
import { attributesToObject } from '@/lib/utils/dom';

@Component({
  tag: 'icon-play'
})
export class IconPlay {
  @Element() el: any;

  @Prop({ attribute: 'alignment-baseline' }) alignmentBaseline: any;
  @Prop({ attribute: 'baseline-shift' }) baselineShift: any;
  @Prop({ attribute: 'clip-path' }) clipPath: any;
  @Prop({ attribute: 'clip-rule' }) clipRule: any;
  @Prop({ attribute: 'color' }) color: any;
  @Prop({ attribute: 'color-interpolation' }) colorInterpolation: any;
  @Prop({ attribute: 'color-interpolation-filters' }) colorInterpolationFilters: any;
  @Prop({ attribute: 'color-rendering' }) colorRendering: any;
  @Prop({ attribute: 'cursor' }) cursor: any;
  @Prop({ attribute: 'cx' }) cx: any;
  @Prop({ attribute: 'cy' }) cy: any;
  @Prop({ attribute: 'd' }) d: any;
  @Prop({ attribute: 'direction' }) direction: any;
  @Prop({ attribute: 'display' }) display: any;
  @Prop({ attribute: 'dominant-baseline' }) dominantBaseline: any;
  @Prop({ attribute: 'fill' }) fill: any;
  @Prop({ attribute: 'fill-opacity' }) fillOpacity: any;
  @Prop({ attribute: 'fill-rule' }) fillRule: any;
  @Prop({ attribute: 'filter' }) filter: any;
  @Prop({ attribute: 'flood-color' }) floodColor: any;
  @Prop({ attribute: 'flood-opacity' }) floodOpacity: any;
  @Prop({ attribute: 'font' }) font: any;
  @Prop({ attribute: 'font-family' }) fontFamily: any;
  @Prop({ attribute: 'font-kerning' }) fontKerning: any;
  @Prop({ attribute: 'font-size' }) fontSize: any;
  @Prop({ attribute: 'font-size-adjust' }) fontSizeAdjust: any;
  @Prop({ attribute: 'font-stretch' }) fontStretch: any;
  @Prop({ attribute: 'font-style' }) fontStyle: any;
  @Prop({ attribute: 'font-variant' }) fontVariant: any;
  @Prop({ attribute: 'font-weight' }) fontWeight: any;
  @Prop({ attribute: 'height' }) height: any;
  @Prop({ attribute: 'image-rendering' }) imageRendering: any;
  @Prop({ attribute: 'isolation' }) isolation: any;
  @Prop({ attribute: 'letter-spacing' }) letterSpacing: any;
  @Prop({ attribute: 'lighting-color' }) lightingColor: any;
  @Prop({ attribute: 'marker' }) marker: any;
  @Prop({ attribute: 'marker-end' }) markerEnd: any;
  @Prop({ attribute: 'marker-mid' }) markerMid: any;
  @Prop({ attribute: 'marker-start' }) markerStart: any;
  @Prop({ attribute: 'mask' }) mask: any;
  @Prop({ attribute: 'mask-clip' }) maskClip: any;
  @Prop({ attribute: 'mask-composite' }) maskComposite: any;
  @Prop({ attribute: 'mask-image' }) maskImage: any;
  @Prop({ attribute: 'mask-mode' }) maskMode: any;
  @Prop({ attribute: 'mask-origin' }) maskOrigin: any;
  @Prop({ attribute: 'mask-position' }) maskPosition: any;
  @Prop({ attribute: 'mask-repeat' }) maskRepeat: any;
  @Prop({ attribute: 'mask-size' }) maskSize: any;
  @Prop({ attribute: 'mask-type' }) maskType: any;
  @Prop({ attribute: 'opacity' }) opacity: any;
  @Prop({ attribute: 'overflow' }) overflow: any;
  @Prop({ attribute: 'pointer-events' }) pointerEvents: any;
  @Prop({ attribute: 'r' }) r: any;
  @Prop({ attribute: 'rx' }) rx: any;
  @Prop({ attribute: 'ry' }) ry: any;
  @Prop({ attribute: 'shape-rendering' }) shapeRendering: any;
  @Prop({ attribute: 'stop-color' }) stopColor: any;
  @Prop({ attribute: 'stop-opacity' }) stopOpacity: any;
  @Prop({ attribute: 'stroke' }) stroke: any;
  @Prop({ attribute: 'stroke-dasharray' }) strokeDasharray: any;
  @Prop({ attribute: 'stroke-dashoffset' }) strokeDashoffset: any;
  @Prop({ attribute: 'stroke-linecap' }) strokeLinecap: any;
  @Prop({ attribute: 'stroke-linejoin' }) strokeLinejoin: any;
  @Prop({ attribute: 'stroke-miterlimit' }) strokeMiterlimit: any;
  @Prop({ attribute: 'stroke-opacity' }) strokeOpacity: any;
  @Prop({ attribute: 'stroke-width' }) strokeWidth: any;
  @Prop({ attribute: 'text-anchor' }) textAnchor: any;
  @Prop({ attribute: 'text-decoration' }) textDecoration: any;
  @Prop({ attribute: 'text-orientation' }) textOrientation: any;
  @Prop({ attribute: 'text-rendering' }) textRendering: any;
  @Prop({ attribute: 'transform' }) transform: any;
  @Prop({ attribute: 'transform-box' }) transformBox: any;
  @Prop({ attribute: 'transform-origin' }) transformOrigin: any;
  @Prop({ attribute: 'unicode-bidi' }) unicodeBidi: any;
  @Prop({ attribute: 'visibility' }) visibility: any;
  @Prop({ attribute: 'width' }) width: any;
  @Prop({ attribute: 'word-spacing' }) wordSpacing: any;
  @Prop({ attribute: 'writing-mode' }) writingMode: any;
  @Prop({ attribute: 'x' }) x: any;
  @Prop({ attribute: 'y' }) y: any;

  render() {
    const inner = createElement(LucidePlay);
    Object.entries(Object.assign({},attributesToObject(this.el), this.getProps())).forEach(([name,value]) => inner.setAttribute(name, value as string) );
    return <Host innerHTML={inner.outerHTML} class="lucide-icon"></Host>;
  }

  private getProps() {
    const props = ['color','cursor','cx','cy','d','direction','display','fill','filter','font','height','isolation','marker','mask','opacity','overflow','r','rx','ry','stroke','transform','visibility','width','x','y'];
    return props.reduce((acc, prop) => {
      if(this[prop] !== undefined && this[prop] !== null) {
        acc[prop] = this[prop];
      }
      return acc;
    }, {});
  }
}
