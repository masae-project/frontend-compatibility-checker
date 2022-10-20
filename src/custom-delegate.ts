/**
 * 自定義代理
 */
export interface CustomDelegate {
    /**
     * CustomDelegate 代理方法的實現
     * @param {string} val1 返回值1
     * @param {number} val2 返回值2
     */
    delegateFunc(val1: string, val2: number): void
}

export default class CustomDelegateClass {
    delegate: CustomDelegate | null = null

    /**
     * 這裡模擬了一個異步的操作，當操作完成後，調用代理方法
     */
    constructor() {
        setTimeout(() => {
            this.delegate?.delegateFunc("1", 0);
        }, 100);
    }
}
