import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', Validators.required, Validators.pattern(FormUtils.namePattern)],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [ FormUtils.isFieldOneEqualFieldTwo('password', 'password2')]
  });

  // isFieldOneEqualFieldTwo(field1: string, field2: string){
  //   return (formGroup: AbstractControl) => {
  //     const field1value = formGroup.get(field1)?.value;
  //     const field2value = formGroup.get(field2)?.value;
  //     return field1value === field2value? null : { passwordNotEqual: true }
  //   }
  // }

  onSubmit(){
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }

}
