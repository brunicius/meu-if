abstract class NameValidators {
  static isValid(name: string): boolean {
    return /^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/gm.test(name);
  }
}

export default NameValidators;
