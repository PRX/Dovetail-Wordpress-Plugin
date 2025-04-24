import { newE2EPage } from '@stencil/core/testing';

describe('dtpc-time-display', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dtpc-time-display></dtpc-time-display>');

    const element = await page.find('dtpc-time-display');
    expect(element).toHaveClass('hydrated');
  });
});
