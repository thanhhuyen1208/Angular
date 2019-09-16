import { Role } from './role';

export interface IUser {
    id: number;
    email: string,
    enabled: boolean,
    fullName: string;
    birthday: Date;
    password: string;
    role: Role;
    comments: Comment;
    re_pass: string
}

export class UserDTO implements IUser{
    constructor(
        public id: number,
        public  email: string,
        public enabled: boolean,
        public fullName: string,
        public birthday: Date,
        public password: string,
        public role: Role,
        public comments: Comment,
        public re_pass:string
    
    ) {}
}