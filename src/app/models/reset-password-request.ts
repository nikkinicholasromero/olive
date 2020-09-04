export interface ResetPasswordRequest {
    emailAddress?: string;
    forgotPasswordCode?: string;
    newPassword?: string;
}