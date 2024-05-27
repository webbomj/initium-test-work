import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function phoneValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const phonedregex = /^[+]?[8|7]\d{10}$/

        const russianPhone = phonedregex.test(value)

        return !russianPhone ? {phone:true}: null;
    }
}