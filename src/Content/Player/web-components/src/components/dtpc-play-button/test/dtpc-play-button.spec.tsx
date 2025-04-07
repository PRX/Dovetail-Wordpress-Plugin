import { newSpecPage } from '@stencil/core/testing';
import { DtpcPlayButton } from '../dtpc-play-button';
import { DtpcPlayer } from '@/components/dtpc-player/dtpc-player';

describe('dtpc-play-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
          components: [DtpcPlayer, DtpcPlayButton],
          html: `<dtpc-player><dtpc-play-button></dtpc-play-button></dtpc-player>`,
    });
    expect(page.root.querySelector('dtpc-play-button')).toEqualHtml(`
      <dtpc-play-button data-status="paused">
        <mock:shadow-root>
          <dtpc-button title="Play" type="button">
            <icon-play></icon-play>
          </dtpc-button>
        </mock:shadow-root>
      </dtpc-play-button>
    `);
  });
});
