class ValidEmail {
  public isValid: boolean = null;
  constructor(email: string) {
    this.isValid = this.isValidEmail(email);
  }

  private isValidEmail(email: string): boolean {
    const isContainsAt = email.includes('@');
    const afterAtString = email.substr(email.indexOf('@'), email.length - 1);
    const isContainsDot = afterAtString.includes('.');
    const isThereSymbols = email.substr(0, email.indexOf('@')).length > 0;
    const rules = [isContainsAt, isContainsDot, isThereSymbols];

    let result = true;
    rules.forEach((rule: boolean) => {
      if (rule === false) {
        result = false;
      }
    });
    return result;
  }
}

export default ValidEmail;
