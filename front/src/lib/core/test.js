import 'reflect-metadata';
import { plainToInstance, instanceToPlain } from 'class-transformer';

class User {
    constructor({ id, name } = {}) {
        this.id = id;
        this.name = name;
    }
}

// 创建 User 实例
const user = new User({ id: 1, name: 'John Doe' });
// 转换实例到普通对象
const plainUser = instanceToPlain(user);

// 转换普通对象回 User 实例
const newUser = plainToInstance(User, plainUser);

console.log(newUser instanceof User); // true
console.log(newUser.name); // 'John Doe'