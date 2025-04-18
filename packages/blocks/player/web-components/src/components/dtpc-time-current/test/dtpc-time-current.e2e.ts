import { newE2EPage } from '@stencil/core/testing';

describe('dtpc-time-current', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dtpc-time-current></dtpc-time-current>');

    const element = await page.find('dtpc-time-current');
    expect(element).toHaveClass('hydrated');
  });
});
