export type ProtectedUser = {
	firstName: string;
	lastName: string;
	email: string;
};

export type ProtectedUserResponse = {
	data: ProtectedUser[];
};

export type GetUsers = () => Promise<ProtectedUserResponse | null>;
