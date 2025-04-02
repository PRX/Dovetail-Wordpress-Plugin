import { Component, Element, Event as StencilEvent, EventEmitter, Prop, h, State, Watch } from '@stencil/core';

type RangeChangeEvent = Event & {
  target: HTMLInputElement
}

type RangeInputEvent = InputEvent & {
  target: HTMLInputElement
}

export type SliderChangeEvent = CustomEvent<number>;

export type SliderInputEvent = CustomEvent<number>;

@Component({
  tag: 'dtpc-slider',
  styleUrl: 'dtpc-slider.css',
  shadow: true,
})
export class DtpcSlider {

  @Element() el: HTMLInputElement;

  @Prop() disabled: boolean = false;

  @Prop() defaultValue: number = 0;

  @Prop() value: number = null;

  @Prop() min: number = 0;

  @Prop() max: number = 100;

  @Prop() step: number = 1;

  @Prop() orient: 'vertical' | 'horizontal';

  @State() currentValue: number = 0;

  @StencilEvent({
    eventName: 'slider-change',
    bubbles: true,
    cancelable: true,
    composed: true
  }) sliderChange: EventEmitter<number>

  @StencilEvent({
    eventName: 'slider-input',
    bubbles: true,
    cancelable: true,
    composed: true
  }) sliderInput: EventEmitter<number>

  @Watch('value')
  handleValueChange(newValue: number) {
    this.currentValue = newValue;
  }

  handleChange(e: RangeChangeEvent) {
    this.currentValue = parseFloat(e.target.value);
    this.sliderChange.emit(this.currentValue);
  }

  handleInput(e: RangeInputEvent) {
    this.currentValue = parseFloat(e.target.value);
    this.sliderInput.emit(this.currentValue);
  }

  connectedCallback() {
    this.currentValue = this.value !== null ? this.value : this.defaultValue;
  }

  render() {
    const { min, max, defaultValue, currentValue, step, orient, disabled } = this;
    const progress = this.currentValue / this.max;
    const inputAttributes = {
      min,
      max,
      step,
      orient,
      defaultValue: `${defaultValue}`,
      value: currentValue,
      disabled: disabled || !max,
      onChange: (e: RangeChangeEvent) => this.handleChange(e),
      onInput: (e: RangeInputEvent) => this.handleInput(e),
    }

    return (
      <div class="track" style={{ '--progress': `${progress}` }}>
        <div class="progress" data-show={!!max}></div>
        <div class="range">
          <div class="scrubber"></div>
        </div>
        <input type='range' {...inputAttributes} value={this.currentValue} />
      </div>
    );
  }
}
