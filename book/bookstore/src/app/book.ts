import { UserDTO } from './userDTO';

export class Book{

    id : number;
    title: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    enable: boolean;
    userId: number;
    userDTO: UserDTO;

}