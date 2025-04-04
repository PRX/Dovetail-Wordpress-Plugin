import { attributesToObject } from '@/lib/utils';
import { Component, Element, Host, h, Listen } from '@stencil/core';

@Component({
  tag: 'dtpc-button',
  styleUrl: 'dtpc-button.css',
  shadow: false
})
export class DtpcButton {

  @Element() el: HTMLButtonElement;

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent){
    console.log(ev);

    if (ev.code === 'Space'){
      this.el.click();
    }
  }

  render() {
    const buttonAttributes = attributesToObject(this.el);

    return (
      <Host role="button" tabindex="0" {...buttonAttributes}>
        <slot></slot>
      </Host>
    );
  }
}
