export interface UserInfo {
    fullName?: string;
    userName?: string;
    password?: string;
    status?: boolean;
    errors?: any;
    accountStatus?: number
}

export interface UserDetails {
    fullName?: string;
    userName?: string;
    password?: string;
    status?: boolean;
    errors?: any;
    accountStatus?: number;
    uid?: number;
    email?: string;
    phoneNumber?: string;
    retries?: number;
    userRole?: number;
}