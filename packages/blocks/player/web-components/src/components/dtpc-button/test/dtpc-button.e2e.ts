import { newE2EPage } from '@stencil/core/testing';

describe('dtpc-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dtpc-button></dtpc-button>');

    const element = await page.find('dtpc-button');
    expect(element).toHaveClass('hydrated');
  });
});
