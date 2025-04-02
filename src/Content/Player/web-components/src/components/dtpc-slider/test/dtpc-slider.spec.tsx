import { newSpecPage } from '@stencil/core/testing';
import { DtpcSlider } from '../dtpc-slider';

describe('dtpc-slider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcSlider],
      html: `<dtpc-slider></dtpc-slider>`,
    });
    expect(page.root).toEqualHtml(`
      <dtpc-slider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dtpc-slider>
    `);
  });
});
