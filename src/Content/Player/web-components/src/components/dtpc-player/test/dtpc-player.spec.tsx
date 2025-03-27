import { newSpecPage } from '@stencil/core/testing';
import { DtpcPlayer } from '../dtpc-player';

describe('dtpc-player', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcPlayer],
      html: `<dtpc-player></dtpc-player>`,
    });
    expect(page.root).toEqualHtml(`
      <dtpc-player>
        <mock:shadow-root>
          <audio preload="none"></audio>
          <slot></slot>
        </mock:shadow-root>
      </dtpc-player>
    `);
  });
});
