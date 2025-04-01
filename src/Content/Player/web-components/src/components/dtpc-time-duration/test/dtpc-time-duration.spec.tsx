import { newSpecPage } from '@stencil/core/testing';
import { DtpcTimeDuration } from '../dtpc-time-duration';
import { DtpcPlayer } from '@/components/dtpc-player/dtpc-player';

describe('dtpc-time-duration', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcPlayer, DtpcTimeDuration],
      html: `<dtpc-player><dtpc-time-duration></dtpc-time-duration></dtpc-player>`,
    });
    expect(page.root.querySelector('dtpc-time-duration')).toEqualHtml(`
      <dtpc-time-duration>
        <mock:shadow-root>
          00:00
        </mock:shadow-root>
      </dtpc-time-duration>
    `);
  });
});
