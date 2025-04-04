import { newSpecPage } from '@stencil/core/testing';
import { DtpcMuteButton } from '../dtpc-mute-button';

describe('dtpc-mute-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcMuteButton],
      html: `<dtpc-mute-button></dtpc-mute-button>`,
    });
    expect(page.root).toEqualHtml(`
      <dtpc-mute-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dtpc-mute-button>
    `);
  });
});
