export interface CustomDelegate {
    delegateFunc(val1: string, val2: number): void
}
export default class CustomDelegateClass {
    delegate: CustomDelegate | null = null
    constructor() {
        setTimeout(() => {
            this.delegate?.delegateFunc("1", 0);
        }, 100);
    }
}
