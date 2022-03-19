import EmailValidators from "./email";

interface emailValid {
    email: string,
    valid: boolean
}

test('Verify if email is valid', ()=>{
    let emails: emailValid[] = [
        {
            email: 'asimdf@email.com',
            valid: true
        },
        {
            email: 'smirnofee ,sado',
            valid: false
        }
    ]

    emails.forEach(i=>{
        expect(EmailValidators.isValid(i.email)).toBe(i.valid)
    })
})