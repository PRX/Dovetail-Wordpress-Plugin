import { attributesToObject } from './attributesToObject';

describe('attributesToObject', () => {
  it('maps element attributes to object', () => {
    const mockElement = document.createElement('div')
    mockElement.setAttribute('id', '123');

    const result = attributesToObject(mockElement);
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('id');
    expect(result.id).toEqual('123');
  });
});
