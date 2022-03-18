import { isValidPhone, formatPhone } from "./phone";

test('Validate phone by string', ()=>{
    let validPhoneStr:string = '87956545351'
    let otherValidPhoneStr:string = '(87) 9 1453-7533'
    let invalidPhoneStr:string = '846826 064 9'

    expect(isValidPhone(validPhoneStr)).toBe(true)
    expect(isValidPhone(otherValidPhoneStr)).toBe(true)
    expect(isValidPhone(invalidPhoneStr)).toBe(false)
})

test('Remove invalid chars from valid phone', ()=>{
    let validPhoneStr = '(87) 9 7689-5831'
    let otherValidPhoneStr = '+55 (87) 9 5313-5930'

    expect(formatPhone(validPhoneStr)).toBe('558776895831@c.us')
    expect(formatPhone(otherValidPhoneStr)).toBe('558753135930@c.us')
})