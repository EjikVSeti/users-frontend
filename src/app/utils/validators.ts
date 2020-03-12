import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as XRegExp from 'xregexp';

export const unicodeWord: RegExp = XRegExp('^[\\p{L} –-]+$');
export const emailValidationPattern = /^\w+(?:[.+-]?\w+)*@\w+(?:[.-]?\w+)*\.\w{2,}$/;

export class ClientValidators {
  public static nameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return getErrorValuePattern(unicodeWord, control.value, ERROR_KEYS.namePattern)
      || getErrorValueMinMaxLengths(2, 40, control.value, ERROR_KEYS.nameSize);
  }

  public static emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return getErrorValueMinMaxLengths(6, 120, control.value, ERROR_KEYS.emailSize)
      || getErrorValuePattern(emailValidationPattern, control.value, ERROR_KEYS.emailPattern);
  }
}

export function getErrorValueMinMaxLengths(min: number, max: number, value: string, errorKey: ERROR_KEYS): ValidationErrors | null {
  const valueLength = value && value.trim() ? value.trim().length : 0;
  return (valueLength >= min && valueLength <= max) ? null : { [errorKey]: true };
}

export function getErrorValuePattern(pattern: RegExp, value: string, errorKey: ERROR_KEYS): ValidationErrors | null {
  return pattern.test(value) ? null : { [errorKey]: true };
}

export enum ERROR_KEYS {
  namePattern = 'namePattern',
  nameSize = 'nameSize',
  emailPattern = 'emailPattern',
  emailSize = 'emailSize'
}
