import { newSpecPage } from '@stencil/core/testing';
import { DtpcTimeCurrent } from '../dtpc-time-current';
import { DtpcPlayer } from '@/components/dtpc-player/dtpc-player';

describe('dtpc-time-current', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcPlayer, DtpcTimeCurrent],
      html: `<dtpc-player><dtpc-time-current></dtpc-time-current></dtpc-player>`,
    });
    expect(page.root.querySelector('dtpc-time-current')).toEqualHtml(`
      <dtpc-time-current>
        <mock:shadow-root>
          00:00
        </mock:shadow-root>
      </dtpc-time-current>
    `);
  });
});
