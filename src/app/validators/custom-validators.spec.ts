import { FormBuilder } from "@angular/forms";
import { CustomValidators } from './custom-validators';

describe("CustomValidators", () => {
    it("should return null when customPasswordValidator is called with same passwords", () => {
        const formGroup = new FormBuilder().group({
            password: ['SomePassword12345'],
            confirmPassword: ['SomePassword12345']
        });

        expect(CustomValidators.customPasswordValidator(formGroup)).toBeNull();
        expect(formGroup.controls['confirmPassword'].valid).toBeTrue();
        expect(formGroup.controls['confirmPassword'].errors).toBeNull();
    });

    it("should return passwordDoesNotMatch true when customPasswordValidator is called with different passwords", () => {
        const formGroup = new FormBuilder().group({
            password: ['SomePassword12345'],
            confirmPassword: ['SomePassword123455']
        });

        expect(CustomValidators.customPasswordValidator(formGroup)).not.toBeNull();
        expect(formGroup.controls['confirmPassword'].valid).toBeFalse();
        expect(formGroup.controls['confirmPassword'].errors).toEqual({ passwordDoesNotMatch: true });
    });
});
