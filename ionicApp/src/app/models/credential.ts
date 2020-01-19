export class Credential {
    email: string;
    password: string;
    passwordConfirm?: string;
}
export const DEFAULT_CREDENTIAL_OBJECT: Credential = {
    email: '',
    password: '',
    passwordConfirm: '',
};
