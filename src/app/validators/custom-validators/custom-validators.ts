import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {
    static readonly customPasswordValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
        const passwordFormControl = form.get('password');
        const confirmPasswordFormControl = form.get('confirmPassword');

        let errorDetails: ValidationErrors | null = null;

        if (passwordFormControl.value !== confirmPasswordFormControl.value) {
            errorDetails = { passwordDoesNotMatch: true };
        } else {
            errorDetails =  null;
        }
        
        confirmPasswordFormControl.setErrors(errorDetails);
        return errorDetails;
    };
}
