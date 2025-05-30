import { newSpecPage } from '@stencil/core/testing';
import { DtpcPlayer } from '@/components/dtpc-player/dtpc-player';
import { DtpcVolumeSlider } from '../dtpc-volume-slider';

describe('dtpc-volume-slider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
        components: [DtpcPlayer, DtpcVolumeSlider],
        html: `<dtpc-player><dtpc-volume-slider></dtpc-volume-slider></dtpc-player>`,
      });
      expect(page.root.querySelector('dtpc-volume-slider')).toEqualHtml(`
      <dtpc-volume-slider aria-label="Volume slider" aria-valuemax="1" aria-valuemin="0" aria-valuenow="0.8" aria-valuetext="80% volume">
        <mock:shadow-root>
          <div class="wrapper">
            <dtpc-slider defaultvalue="0.8" max="1" min="0" step="0.01" value="0.8"></dtpc-slider>
          </div>
        </mock:shadow-root>
      </dtpc-volume-slider>
    `);
  });
});
