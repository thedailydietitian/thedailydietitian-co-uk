const { decodeHexString } = require('../utils');

describe('decodeHexString is a function that', () => {
  it('decodes a hexadecimal string', () => {
    const hexString = '48656C6C6F2C20576F726C6421';
    expect(decodeHexString(hexString)).toEqual('Hello, World!');
  });
});
