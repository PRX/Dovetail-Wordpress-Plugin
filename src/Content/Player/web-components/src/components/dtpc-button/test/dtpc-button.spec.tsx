import { newSpecPage } from '@stencil/core/testing';
import { DtpcButton } from '../dtpc-button';

describe('dtpc-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcButton],
      html: `<dtpc-button></dtpc-button>`,
    });
    expect(page.root).toEqualHtml(`
      <dtpc-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dtpc-button>
    `);
  });
});
