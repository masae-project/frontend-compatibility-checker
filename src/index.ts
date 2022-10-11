import CustomElement from "./custom-element";

export default class IndexPage {
    progress: HTMLProgressElement;
    checkbox: HTMLInputElement;
    checkboxspan: HTMLSpanElement;
    step: number = 0;
    endi: number[] = [0, 0];
    testArea: HTMLDivElement;
    no: string = "您的浏览器不支持本站的所有功能，建议您更换浏览器。";
    planTotal = 10;
    ul: HTMLUListElement;

    constructor() {
        const nojs: HTMLElement = document.getElementById('nojs');
        nojs.remove();
        const noscripts: HTMLCollectionOf<HTMLElement> = document.getElementsByTagName('noscript');
        for (const key in noscripts) {
            if (Object.prototype.hasOwnProperty.call(noscripts, key)) {
                const noscript = noscripts[key];
                noscript.remove();
            }
        }
        document.body.innerHTML = "<p>正在进行前端兼容性检查...</p>如果下面的进度条卡住，可能是 网速原因 或者 " + this.no;
        this.ui();
        this.testNow();
    }

    ui() {
        this.progress = document.createElement('progress');
        this.progress.id = 'progress';
        this.progress.max = this.planTotal;
        this.progress.value = 0;
        document.body.appendChild(this.progress);
        this.testArea = document.createElement('div');
        this.testArea.id = 'testArea';
        const customElementn: HTMLElement = document.createElement('custom-element');
        customElementn.id = 'custom-element';
        customElementn.className = 'testObj';
        customElementn.setAttribute('c-val', '+');
        this.testArea.appendChild(customElementn);
        this.checkbox = document.createElement('input');
        this.checkbox.id = 'checkbox';
        this.checkbox.className = 'testObj';
        this.checkbox.type = 'checkbox';
        this.testArea.appendChild(this.checkbox);
        this.checkboxspan = document.createElement('span');
        this.checkboxspan.id = 'checkboxspan';
        this.checkboxspan.className = 'testObj';
        this.testArea.appendChild(this.checkboxspan);
        document.body.appendChild(this.testArea);
    }

    testNow() {
        this.progress.value = this.step;
        this.step++;
        switch (this.step) {
            case 1:
                this.addLine("<hr/>");
                this.addTitle("检查 HTML5 兼容性...");
                this.html5Test();
                this.testNow();
                break;
            case 2:
                this.addTitle("检查 Canvas 兼容性...");
                this.canvasTest();
                this.testNow();
                break;
            case 3:
                this.addTitle("检查 SVG 兼容性...");
                this.svgTest();
                this.testNow();
                break;
            case 4:
                this.addLine("<hr/>");
                this.addTitle("检查 CSS Keyframes 动画...");
                this.cssKeyframes();
                break;
            case 5:
                this.addTitle("检查 CSS Transition 动画...");
                this.cssTransition();
                break;
            case 6:
                this.addTitle("检查 CSS 选择器...");
                this.cssSelecterTest();
                this.testNow();
                break;
            case 7:
                this.addLine("<hr/>");
                this.addTitle("检查 ES6 兼容性...");
                this.es6Test();
                this.testNow();
                break;
            case 8:
                this.addTitle("检查 Event 事件...");
                this.clickTest();
                break;
            case 9:
                this.addTitle("检查 自定义元素...");
                this.customElementTest();
                break;
            case 10:
                this.addTitle("检查 Storage 存储...");
                this.storageTest();
                this.testNow();
                break;
            default:
                this.end();
                break;
        }
    }

    html5Test(): boolean {
        if (typeof (Worker) !== "undefined") {
            return this.ok(typeof (Worker));
        } else {
            return this.fail(typeof (Worker));
        }
    }

    canvasTest(): boolean {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        if (canvas.getContext && ctx) {
            return this.ok();
        } else {
            return this.fail();
        }
    }

    svgTest(): boolean {
        if (document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) {
            return this.ok();
        } else {
            return this.fail();
        }
    }

    cssKeyframes() {
        this.checkboxspan.style.animation = "spanani 0.3s linear forwards";
        setTimeout(() => {
            if (this.checkboxspan.offsetWidth == 30) {
                this.ok(this.checkboxspan.offsetWidth.toString());
            } else {
                this.fail(this.checkboxspan.offsetWidth.toString());
            }
            this.checkboxspan.style.animation = "";
            this.testNow();
        }, 500);
    }

    cssTransition() {
        this.checkboxspan.style.transition = "0.3s";
        this.checkboxspan.style.width = "20px";
        setTimeout(() => {
            if (this.checkboxspan.offsetWidth == 20) {
                this.ok();
            } else {
                this.fail();
            }
            this.checkboxspan.style.transition = "";
            this.testNow();
        }, 500);
    }

    cssSelecterTest() {
        this.checkbox.checked = true;
        const width: number = this.checkboxspan.offsetWidth;
        if (this.checkboxspan.offsetWidth == 20) {
            return this.ok(width.toString());
        } else {
            return this.fail(width.toString());
        }
    }

    es6Test(): boolean {
        const arrowFunction = "var t = () => {};";
        const asyncFunction = "var t = async () => {};";
        try {
            let f: Function = new Function(arrowFunction);
            f = new Function(asyncFunction);
            return this.ok(f.toString());
        }
        catch (e) {
            this.fail(e);
            return false;
        }
    }

    clickTest() {
        this.checkbox.addEventListener('click', () => {
            this.checkboxspan.style.width = "10px";
        });
        setTimeout(() => {
            if (this.checkboxspan.style.width == "10px") {
                this.ok(this.checkboxspan.style.width);
            } else {
                this.fail(this.checkboxspan.style.width);
            }
            this.testNow();
        }, 100);
        this.checkbox.click();
    }

    customElementTest() {
        if (!window.customElements.define) {
            return this.fail();
        }
        window.customElements.define('custom-element', CustomElement);
        const customElement: CustomElement = document.getElementById('custom-element') as CustomElement;
        customElement.addInfo();
        setTimeout(() => {
            const customElementE: CustomElement = document.getElementById('custom-element') as CustomElement;
            if (customElementE.innerHTML == "-+") {
                this.ok(customElementE.innerHTML);
            } else {
                this.fail(customElementE.innerHTML);
            }
            this.testNow();
        }, 100);
    }

    storageTest(): boolean {
        const timestamp: number = new Date().getTime();
        let val: string = timestamp.toString();
        let key: string = "frontend-compatibility-checker-" + val;
        if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
            const vals = ["", ""];
            sessionStorage.setItem(key, val);
            vals[0] = sessionStorage.getItem(key);
            if (vals[0] != val) {
                return this.fail(val);
            }
            sessionStorage.removeItem(key);
            key += "T";
            val += "T";
            localStorage.setItem(key, val);
            vals[1] = localStorage.getItem(key);
            if (vals[1] != val) {
                return this.fail(val);
            }
            localStorage.removeItem(key);
            return this.ok(vals.join(','));
        } else {
            return this.fail(val);
        }
    }

    ok(text: string = ""): boolean {
        this.endi[0]++;
        return this.addInfo(text, true);
    }

    fail(text: string = ""): boolean {
        this.endi[1]++;
        return this.addInfo(text, false);
    }

    addInfo(info: string, isOK: boolean): boolean {
        const ul = document.createElement('ul');
        const li: HTMLLIElement = document.createElement('li');
        const span: HTMLSpanElement = document.createElement('span');
        span.className = isOK ? "ok" : "ng";
        span.title = info;
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = isOK;
        checkbox.onclick = function () {
            return false;
        }
        checkbox.readOnly = true;
        span.innerText = ` ${isOK ? "通过" : "失败"}! `;
        span.insertBefore(checkbox, span.firstChild);
        li.appendChild(span);
        ul.appendChild(li);
        this.ul.appendChild(ul);
        return isOK;
    }

    addTitle(title: string) {
        const line: HTMLDivElement = document.createElement('div');
        this.ul = document.createElement('ul');
        const li: HTMLLIElement = document.createElement('li');
        li.innerText = title;
        this.ul.appendChild(li);
        line.appendChild(this.ul);
        document.body.appendChild(line);
    }

    addLine(text: string) {
        const line: HTMLDivElement = document.createElement('div');
        line.innerHTML = text;
        document.body.appendChild(line);
    }

    end() {
        const testObjs: HTMLCollectionOf<Element> = document.getElementsByClassName('testObj');
        for (const key in testObjs) {
            if (Object.prototype.hasOwnProperty.call(testObjs, key)) {
                const testObj: HTMLElement = testObjs[key] as HTMLElement;
                testObj.style.display = "none";
            }
        }
        this.addLine("<hr/>");
        this.addLine(`检查完毕，共检查 ${this.endi[0] + this.endi[1]} 项，通过 ${this.endi[0]} 项，失败 ${this.endi[1]} 项。`);
        this.testArea.remove();
        this.addLine("<hr/>");
        if (this.endi[1] > 0) {
            this.addLine("<b>" + this.no + "</b>");
            alert(this.no);
        } else {
            this.addLine("<b>检查通过！</b>");
        }
    }
}
