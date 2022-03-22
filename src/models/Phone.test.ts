import Phone from "./Phone";

test('Validade phones', ()=>{
    let phone = new Phone({
        number: "5587981615939",
        userId: 1,
        active: false
    })

    expect(phone.isValid()).toBe(true)

    let invalidPhone = new Phone({
        number: "948981",
        userId: 0,
        active: true
    })

    expect(invalidPhone.isValid()).toBe(false)
})