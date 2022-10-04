export default class CustomElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.innerHTML = "-";
    }

    addInfo() {
        this.innerHTML += this.getAttribute('c-val');
    }
}