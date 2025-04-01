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
      <dtpc-play-button>
        <mock:shadow-root>
          <button data-status="paused" title="Play" type="button">
            <icon-play></icon-play>
          </button>
        </mock:shadow-root>
      </dtpc-play-button>
    `);
  });
});
