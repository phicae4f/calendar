export interface IUser {
    username: string,
    password: string
}

export type NullableUser  = IUser | null