import { typedFieldProxy } from '../src/utils';

type Values = {
  id: string;
  social: {
    facebook: string;
  };
};

describe('utils', () => {
  describe('TypedFieldProxy', () => {
    it('it should infer nested object structure of fields Values', () => {
      const proxy = typedFieldProxy<Values>();
      expect(proxy.social.facebook._key).toBe('facebook');
      expect(proxy.id._key).toBe('id');
    });
  });
});
