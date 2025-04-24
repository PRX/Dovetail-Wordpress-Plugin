import { newSpecPage } from '@stencil/core/testing';
import { DtpcButton } from '../dtpc-button';

describe('dtpc-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcButton],
      html: `<dtpc-button>Click</dtpc-button>`,
    });
    expect(page.root).toEqualHtml(`
      <dtpc-button role="button" tabindex="0">
        Click
      </dtpc-button>
    `);
  });
});
