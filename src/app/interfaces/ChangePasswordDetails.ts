export interface ChangePasswordRequest {
    userId?: number;
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string
}

export interface ChangePasswordResponse {
    changePasswordStatus?: boolean;
    message?: string;
    errors?: any;
}
