import { Types } from "mongoose"

export type TTask = {
    user: Types.ObjectId;
    title: string;
    description: string;
    dueDate: Date;
    status: 'pending' | 'completed';
} 


