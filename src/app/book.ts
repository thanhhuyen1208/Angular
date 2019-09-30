import { UserDTO } from './userDTO';

export class Book{

    id : number;
    title: string;
    author: string;
    content: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    userId: number;
    userDTO: UserDTO;
}