import { UserDTO } from './userDTO';

export class Book{

    id : number;
    title: string;
    author: string;
    createAt: Date;
    updateAt: Date;
    enable: boolean;
    userId: number;
    userDTO: UserDTO;

}