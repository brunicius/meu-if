abstract class EmailValidators {
    static isValid(email: string): boolean {
        return /^([\w\.\-]+)(@)([\w\-]+)((\.(\w){2,3})+)/gm.test(email)
    }
}

export default EmailValidators