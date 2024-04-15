import { $Enums, User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { CreateUserRequest } from "../utils/validationSchemas.js";

interface CreateUserDto extends Omit<CreateUserRequest, "passwordConfirmation"> {}

export class CreateUserDTO implements CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor({ firstName, lastName, email, password }: CreateUserRequest) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string | null;
    role: $Enums.Role;
    isActivated: boolean;
}

export class UserDTO implements UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string | null;
    role: $Enums.Role;
    isActivated: boolean;

    constructor(user: User);
    constructor(user: JwtPayload);
    constructor(user: User | JwtPayload) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.avatarUrl = user.avatarUrl;
        this.role = user.role;
        this.isActivated = user.isActivated;
    }
}
