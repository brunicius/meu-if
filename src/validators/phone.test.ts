import { isValidPhone, formatPhone } from "./phone";

test('Validate phone by string', ()=>{
    let validPhoneStr:string = '87981615939'
    let otherValidPhoneStr:string = '(87) 9 8161-5939'
    let invalidPhoneStr:string = '846826 064 9'

    expect(isValidPhone(validPhoneStr)).toBe(true)
    expect(isValidPhone(otherValidPhoneStr)).toBe(true)
    expect(isValidPhone(invalidPhoneStr)).toBe(false)
})

test('Remove invalid chars from valid phone', ()=>{
    let validPhoneStr = '(87) 9 8161-5939'
    let otherValidPhoneStr = '+55 (87) 9 8161-5939'

    expect(formatPhone(validPhoneStr)).toBe('558781615939@c.us')
    expect(formatPhone(otherValidPhoneStr)).toBe('558781615939@c.us')
})