import { newE2EPage } from '@stencil/core/testing';

describe('dtpc-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dtpc-progress-bar></dtpc-progress-bar>');

    const element = await page.find('dtpc-progress-bar');
    expect(element).toHaveClass('hydrated');
  });
});
