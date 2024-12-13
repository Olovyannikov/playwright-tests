export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userStatus: string;
}

export interface UserUpdate extends Partial<Omit<User, 'id'>> {}
