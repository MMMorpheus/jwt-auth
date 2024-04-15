import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { User } from "@prisma/client";

import { db } from "../db/index.js";
import { CreateUserDTO } from "../dtos/UserDTOs.js";
import { Conflict } from "../exceptions/apiError.js";
import { config } from "../config/index.js";

type Create = (data: CreateUserDTO) => Promise<User>;
type FindByEmail = (email: string) => Promise<User | null>;
type FindById = (id: number) => Promise<User | null>;
type CheckPass = (password: string, passwordHash: string) => Promise<boolean>;

export class UserService {
    public static create: Create = async (data) => {
        const { firstName, lastName, email, password } = data;

        const existingUser = await UserService.findByEmail(email);

        if (existingUser) {
            throw new Conflict(`User with email ${email} is already exists`);
        }

        const activationLink = uuid();
        const passwordHash = await bcrypt.hash(password, config.SOLTS_ROUND);

        return await db.user.create({
            data: {
                firstName,
                lastName,
                email,
                passwordHash,
                activationLink,
            },
        });
    };

    public static findByEmail: FindByEmail = async (email: string): Promise<User | null> => {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return null;
        }

        return user;
    };

    public static findById: FindById = async (id) => {
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            return null;
        }

        return user;
    };

    public static checkPass: CheckPass = async (password, passwordHash) => {
        return await bcrypt.compare(password, passwordHash);
    };
}
