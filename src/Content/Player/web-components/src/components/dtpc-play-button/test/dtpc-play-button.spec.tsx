import { newSpecPage } from '@stencil/core/testing';
import { DtpcPlayButton } from '../dtpc-play-button';

describe('dtpc-play-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcPlayButton],
      html: `<dtpc-play-button></dtpc-play-button>`,
    });
    expect(page.root).toEqualHtml(`
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
