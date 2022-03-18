import PhoneServices from './phone'

test('Validate phone by string', ()=>{
    let validPhoneStr       :string = '87956545351',
        otherValidPhoneStr  :string = '(87) 9 1453-7533',
        invalidPhoneStr     :string = '846826 064 9'

    expect(PhoneServices.isValidPhone(validPhoneStr)).toBe(true)
    expect(PhoneServices.isValidPhone(otherValidPhoneStr)).toBe(true)
    expect(PhoneServices.isValidPhone(invalidPhoneStr)).toBe(false)
})

test('Remove invalid chars from valid phone', ()=>{
    let validPhoneStr       = '(87) 9 7689-5831',
        otherValidPhoneStr  = '+55 (87) 9 5313-5930'

    expect(PhoneServices.formatPhone(validPhoneStr)).toBe('558776895831')
    expect(PhoneServices.formatPhone(otherValidPhoneStr)).toBe('558753135930')
})

test('convert valid phones in chatIds', ()=>{
    let validPhoneStr       :string = '87 9 8476-2135',
        otherValidPhoneStr  :string = '+55 9 4538-9453'

    expect(PhoneServices.formattedPhoneToChatId(PhoneServices.formatPhone(validPhoneStr))).toBe('558784762135@c.us')
    expect(PhoneServices.formattedPhoneToChatId(PhoneServices.formatPhone(otherValidPhoneStr))).toBe('5545389453@c.us')
})