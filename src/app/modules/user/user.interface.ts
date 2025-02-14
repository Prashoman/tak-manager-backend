
export type TUser = {
    userName: string;
    email: string;
    password: string;
    role?: 'admin' | 'user';
    profileImage?: string;
    bio?:string,
} 

export type TUserLogin = {
    email: string;
    password: string;
}
