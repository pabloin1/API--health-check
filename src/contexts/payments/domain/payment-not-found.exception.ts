
export class PaymentNotFoundException extends Error {
    constructor(public readonly id: string){
        super(`Payment with id ${id} not found`)
    }
}