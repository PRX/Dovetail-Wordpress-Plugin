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
          <div class="track" style="--progress: 0;">
            <div class="progress" data-show></div>
            <div class="range">
              <div class="scrubber"></div>
            </div>
            <input defaultvalue="0" max="100" min="0" step="1" type="range" value="0">
          </div>
        </mock:shadow-root>
      </dtpc-slider>
    `);
  });
});
