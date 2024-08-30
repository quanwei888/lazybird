import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {plainToInstance, ClassConstructor} from 'class-transformer';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}