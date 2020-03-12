import { emailValidationPattern, ERROR_KEYS, getErrorValuePattern, unicodeWord } from './validators';

describe('user Validators', () => {
  it('should return the unicodeWord pattern processing correctly', () => {
    const error = { [ERROR_KEYS.namePattern]: true };
    expect(getErrorValuePattern(unicodeWord, 'Testname', ERROR_KEYS.namePattern)).toEqual(null);
    expect(getErrorValuePattern(unicodeWord, 'Тестовое Имя', ERROR_KEYS.namePattern)).toEqual(null);
    expect(getErrorValuePattern(unicodeWord, 'Lietotājvārds ', ERROR_KEYS.namePattern)).toEqual(null);
    expect(getErrorValuePattern(unicodeWord, 'Testname123', ERROR_KEYS.namePattern)).toEqual(error);
  });

  it('should return the emailValidationPattern pattern processing correctly', () => {
    const error = { [ERROR_KEYS.emailPattern]: true };
    expect(getErrorValuePattern(emailValidationPattern, 'sdjfhksjfh@sdjkfj.re', ERROR_KEYS.emailPattern))
      .toEqual(null);
    expect(getErrorValuePattern(emailValidationPattern, 'j@r.re', ERROR_KEYS.emailPattern)).toEqual(null);
    expect(getErrorValuePattern(emailValidationPattern, 'j@re.r', ERROR_KEYS.emailPattern)).toEqual(error);
    expect(getErrorValuePattern(emailValidationPattern, 'sdjfhksjfhsdjkfj.re', ERROR_KEYS.emailPattern)).toEqual(error);
  });

});
