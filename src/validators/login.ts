abstract class LoginValidators {
    static isValid(login: string): boolean {
        return /^[a-z][a-z0-9_.]{3,20}$/gm.test(login)
    }
}

export default LoginValidators