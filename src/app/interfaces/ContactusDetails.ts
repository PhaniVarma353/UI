export interface ContactusRequest {
    id?: number;
    userId?: number;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    message?: string;
    resolved?: string;
}

export interface ContactusResponse {
    contactus?: ContactusRequest;
    status?: boolean;
    errors?: any;
}