import CustomElement from "./custom-element";

export default class IndexPage {
    progress: HTMLProgressElement;
    checkbox: HTMLInputElement;
    checkboxspan: HTMLSpanElement;
    step: number = 0;
    endi: number[] = [0, 0];
    testArea: HTMLDivElement;
    no: string = "您的浏览器不支持本站的所有功能，建议您更换浏览器。";

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
        this.ui();
        this.addLine("正在进行前端兼容性检查，如果网页没有响应，可能是网速原因或者" + this.no);
        this.addLine("<hr/>");
        this.testNow();
    }

    ui() {
        this.progress = document.createElement('progress');
        this.progress.id = 'progress';
        this.progress.max = 9;
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
                this.addLine("→ 检查 HTML5 兼容性...");
                this.html5Test();
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

    ok(text: string = ""): boolean {
        this.endi[0]++;
        this.addLine(`<span class="ok" title="${text}">√ 通过！</span>`);
        return true;
    }

    fail(text: string = ""): boolean {
        this.endi[1]++;
        this.addLine(`<span class="ng" title="${text}">× 失败！</span>`);
        return false;
    }

    addLine(text: string) {
        const line = document.createElement('div');
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
        if (this.endi[1] > 0) {
            this.addLine("<hr/>");
            this.addLine("<b>" + this.no + "</b>");
        } else {
            this.addLine("<b>检查通过！</b>");
        }
    }
}
