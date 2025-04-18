import { newSpecPage } from '@stencil/core/testing';
import { DtpcVolumeSlider } from '../dtpc-volume-slider';

describe('dtpc-volume-slider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcVolumeSlider],
      html: `<dtpc-volume-slider></dtpc-volume-slider>`,
    });
    expect(page.root).toEqualHtml(`
      <dtpc-volume-slider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dtpc-volume-slider>
    `);
  });
});
