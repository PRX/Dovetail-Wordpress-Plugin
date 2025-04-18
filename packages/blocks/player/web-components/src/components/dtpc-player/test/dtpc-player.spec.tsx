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
          <div class="wrapper">
            <div part="backdrop"></div>
            <div class="main">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </dtpc-player>
    `);
  });
});
