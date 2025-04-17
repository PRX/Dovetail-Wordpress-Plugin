import { newE2EPage } from '@stencil/core/testing';

describe('dtpc-time-duration', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dtpc-time-duration></dtpc-time-duration>');

    const element = await page.find('dtpc-time-duration');
    expect(element).toHaveClass('hydrated');
  });
});
