import { attributesToObject } from './utils';

describe('attributesToObject', () => {
  it('returns empty string for no names defined', () => {
    const mockElement = document.createElement('div')
    mockElement.setAttribute('id', '123');

    const result = attributesToObject(mockElement);
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('id');
    expect(result.id).toEqual('123');
  });
});
