/**
 * 自定義元件
 */
export default class CustomElement extends HTMLElement {
  /**
     * 測試自定義元件被成功關聯
     */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.innerHTML = "-";
  }

  /**
     * 測試讀取自定義屬性
     */
  addInfo() {
    this.innerHTML += this.getAttribute("c-val");
  }
}
