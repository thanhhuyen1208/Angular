import { Role } from './role';

export interface IUser {
    id: number;
    email: string,
    enable: boolean,
    fullName: string;
    birthday: Date;
    password: string;
    roles: Role;
    comments: Comment;
    re_pass: string
}

export class UserDTO implements IUser{
    constructor(
        public id: number,
        public  email: string,
        public enable: boolean,
        public fullName: string,
        public birthday: Date,
        public password: string,
        public roles: Role,
        public comments: Comment,
        public re_pass:string
    
    ) {}
}