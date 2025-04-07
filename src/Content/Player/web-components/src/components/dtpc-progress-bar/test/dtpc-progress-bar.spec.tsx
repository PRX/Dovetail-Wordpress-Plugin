import { newSpecPage } from '@stencil/core/testing';
import { DtpcProgressBar } from '../dtpc-progress-bar';
import { DtpcPlayer } from '@/components/dtpc-player/dtpc-player';

describe('dtpc-progress-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcPlayer, DtpcProgressBar],
      html: '<dtpc-player><dtpc-progress-bar></dtpc-progress-bar></dtpc-player>',
    });
    expect(page.root.querySelector('dtpc-progress-bar')).toEqualHtml(`
      <dtpc-progress-bar>
        <mock:shadow-root>
          <div aria-label="Seek slider" aria-valuemax="0" aria-valuemin="0" class="wrapper">
            <dtpc-slider defaultvalue="0" disabled="" max="0" min="0" step="1" tabindex="0"></dtpc-slider>
          </div>
        </mock:shadow-root>
      </dtpc-progress-bar>
    `);
  });
});
