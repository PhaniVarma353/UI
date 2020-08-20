export interface UserSignupDetails {
    fullName?: string;
    userName?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    phoneNumber?: number;
    createdBy?: number;
    roleName?: string;
    role?: number;
}


export interface UserDetails {
    uid?: number;
    userId: number;
    fullName?: string;
    userName?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    phoneNumber?: number;
    createdBy?: number;
    roleName?: string;
    role?: number;
    gender?: string;
    dob?: string;
    maritalStatus?: string;
    userAddress?: UserAddressDetails;
    imageUrl?: string;
    profilePicture?: string;
    userProfileId?: number;
    errors?: any;
}

export interface UserAddressDetails {
    addressOne?: string;
    addressTwo?: string;
    landMark?: string;
    city?: string;
    state?: string;
    country?: string;
    gender?: string;
    maritalStatus?: string;
}

export interface UserViewDetails {
    fullName?: string;
    userName?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    phoneNumber?: number;
    createdBy?: number;
    roleName?: string;
    role?: number;
    gender?: string;
    dob?: string;
    maritalStatus?: string;
    userAddress?: UserAddressDetails;
    imageUrl?: string;
    profilePicture?: string;
    userProfileId?: number;
}


