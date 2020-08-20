import { AbstractControl, ValidationErrors } from "@angular/forms"

export const UserNameValidation = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';
  let msg = "";
  if (!value) {
    return null
  }

  let upperCaseCharacters = /[A-Z]+/g;
  let lowerCaseCharacters = /[a-z]+/g;
  let numberCharacters = /[0-9]+/g;
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (upperCaseCharacters.test(value) === true || specialCharacters.test(value) === true) {
    return {
      userNameValidation: 'User Name must contain lowercase letters, digits only'
    }

  }

  if (!(lowerCaseCharacters.test(value) && numberCharacters.test(value))) {
    return {
      userNameValidation: 'User Name must contain lowercase letters, digits only'
    }

  }

}

