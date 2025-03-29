import { newSpecPage } from '@stencil/core/testing';
import { DtpcProgressBar } from '../dtpc-progress-bar';

describe('dtpc-progress-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtpcProgressBar],
      html: `<dtpc-progress-bar></dtpc-progress-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <dtpc-progress-bar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dtpc-progress-bar>
    `);
  });
});
