import { newSpecPage } from '@stencil/core/testing';
import { DtpcVolumeControls } from '../dtpc-volume-controls';
import { DtpcPlayer } from '@/components/dtpc-player/dtpc-player';

describe('dtpc-time-display', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcPlayer, DtpcVolumeControls],
      html: `<dtpc-player><dtpc-volume-controls></dtpc-volume-controls></dtpc-player>`,
    });
    expect(page.root.querySelector('dtpc-volume-controls')).toEqualHtml(`
      <dtpc-volume-controls>
        <mock:shadow-root>
          <div class="wrapper">
            <dtpc-mute-button></dtpc-mute-button>
            <dtpc-volume-slider orient="vertical" volume="0.8"></dtpc-volume-slider>
          </div>
        </mock:shadow-root>
      </dtpc-volume-controls>
    `);
  });
});
