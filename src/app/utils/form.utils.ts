import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export class FormUtils {
  public static deepMarkAsTouched(control: AbstractControl): void {
    if (!control) {
      return;
    }
    control.markAsTouched({ onlySelf: true });
    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.keys(control.controls).forEach(field => {
        FormUtils.deepMarkAsTouched(control.get(field));
      });
    }
  }

  public static shouldDisplayErrorMessages(control: AbstractControl): boolean {
    return (control && control.touched && control.invalid);
  }
}
