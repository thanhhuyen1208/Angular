import { Role } from './role';

export class UserDTO{

    id: number;
    email: string;
    enable: true;
    fullName: string;
    birthday: Date;
    password: string;
    roles: Role;
    comments: Comment
    
}