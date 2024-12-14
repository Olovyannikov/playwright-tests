export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userStatus: number;
}

export interface UserUpdate extends Partial<Omit<User, 'id'>> {}
