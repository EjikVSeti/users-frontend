import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';

import { FormUtils } from '../../../utils/form.utils';
import { UsersService } from '../../services/users.service';
import { IUserModel } from '../../users.type';
import { ClientValidators } from '../../../utils/validators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  public formGroup: FormGroup;
  public nameControl: FormControl = new FormControl(null, [Validators.required, ClientValidators.nameValidator]);
  public surnameControl: FormControl = new FormControl(null, [Validators.required, ClientValidators.nameValidator]);
  public emailControl: FormControl = new FormControl(null, [Validators.required, ClientValidators.emailValidator]);

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toaster: ToasterService,
    private router: Router,
  ) {
    this.usersService.isLoading$.next(false);
    this.formGroup = formBuilder.group({
      name: this.nameControl,
      surname: this.surnameControl,
      email: this.emailControl,
    });
  }

  public isError(control: AbstractControl): boolean {
    return FormUtils.shouldDisplayErrorMessages(control);
  }

  public saveUser(): void {
    FormUtils.deepMarkAsTouched(this.formGroup);
    if (this.formGroup.invalid) {
      return;
    }
    const newUser: IUserModel = Object.assign({ ...this.formGroup.value });

    this.usersService.createUser(newUser).subscribe(
      () => {
        this.toaster.popAsync('success', 'User was created successfully');
        this.router.navigate([`/users`]);
      },
      (error) => {
        this.toaster.popAsync('error', 'Error occurred while creating new user');
      },
    );
  }
}
