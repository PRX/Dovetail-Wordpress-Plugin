import { newSpecPage } from '@stencil/core/testing';
import { DtpcTimeDisplay } from '../dtpc-time-display';
import { DtpcPlayer } from '@/components/dtpc-player/dtpc-player';

describe('dtpc-time-display', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcPlayer, DtpcTimeDisplay],
      html: `<dtpc-player><dtpc-time-display></dtpc-time-display></dtpc-player>`,
    });
    expect(page.root.querySelector('dtpc-time-display')).toEqualHtml(`
      <dtpc-time-display>
        <mock:shadow-root>
          <div class="wrapper">
            <dtpc-time-current></dtpc-time-current>
            <span class="separator">/</span>
            <dtpc-time-duration duration="0"></dtpc-time-duration>
          </div>
        </mock:shadow-root>
      </dtpc-time-display>
    `);
  });
});
