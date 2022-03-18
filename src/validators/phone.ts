/* Phone validators */

abstract class PhoneServices {
    static isValidPhone(phone: string): boolean {
        let regex = /^[+]?([0-9]{2})?[ ]?[(]?[0-9]{2}[)]?[ ]?[9]?[ ]?[0-9]{4}[-]?[0-9]{4}$/g
    
        return regex.test(phone)
    }
    static formatPhone(phone: string): string {
        if (!this.isValidPhone(phone))
            throw new Error("Invalid phone")
    
        let regexList = [
            /[() +-]/g,             // Identify symbols
            /^[5]{2}/mg,            // Identify country code
            /([9])(?=[0-9]{8})/mg   // Identify 9-digit
        ]
    
        phone = phone.replace(regexList[0], '')     // Remove symbols [It only supports +55 at the moment]
    
        if (!regexList[1].test(phone))              // Add country code
            phone = '55'+phone
    
        if (regexList[2].test(phone))               // Remove 9-digit to fit chatIt
            phone = phone.replace(regexList[2], '')
    
        return phone                      // Return with server @c.us
    }
    static formattedPhoneToChatId(phone):string {
        return phone + '@c.us'
    }
}

export default PhoneServices