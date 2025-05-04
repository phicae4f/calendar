export interface AuthState {
    auth: boolean;
}

export interface AuthAction {
    type: "SET_AUTH";
    payload: boolean;
}