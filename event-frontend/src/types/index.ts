export interface User{
    id: number;
    email: string;
    is_admin: boolean
};

export interface AuthResponse{
    access_token: string;
    token_type: string
}

