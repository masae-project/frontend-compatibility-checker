import CustomElement from "./custom-element";

export default class IndexPage {
    // <可配置的選項>
    // 在檢測全部通過後，要跳轉到的網址（空: 不跳转; `a`: 显示一个弹出提示框。）
    urlOK: string = ""; // ""
    // 在檢測未完全透過時，要跳轉到的網址（空: 不跳转; `a`: 显示一个弹出提示框。）
    urlFail: string = ""; // ""
    // 在頁面中顯示詳細資訊（否則只有提示資訊和進度條）
    viewInfo: boolean = true; // true
    // 儲存記錄到: 0.禁用 1.會話儲存 2.持久儲存
    saveStorage = 0; // 0
    // 如果儲存記錄，鍵名是？（值將寫入 0 或 1 ）
    saveStorageKey: string = "bc"; // bc
    // </可配置的選項>

    progress: HTMLProgressElement;
    checkbox: HTMLInputElement;
    checkboxspan: HTMLSpanElement;
    step: number = 0;
    endi: number[] = [0, 0];
    testArea: HTMLDivElement;
    no: string = "不支持当前浏览器，请更新到最新版本的浏览器再试。";
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
        document.body.innerHTML = '<p>正在进行前端兼容性检查...&emsp;&emsp;<a href="https://github.com/miyabi-project/frontend-compatibility-checker" target="_blank">源码</a></p>如果下面的进度条卡住，可能是 网速原因 或者 ' + this.no;
        this.ui();
        this.browserInfo();
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
        const chk: string = "检查 ";
        switch (this.step) {
            case 1:
                this.addLine("<hr/>");
                this.addTitle(chk + "HTML5 兼容性...");
                this.html5Test();
                this.testDelay();
                break;
            case 2:
                this.addTitle(chk + "Canvas 兼容性...");
                this.canvasTest();
                this.testDelay();
                break;
            case 3:
                this.addTitle(chk + "SVG 兼容性...");
                this.svgTest();
                this.testDelay();
                break;
            case 4:
                this.addLine("<hr/>");
                this.addTitle(chk + "CSS 选择器...");
                this.cssSelecterTest();
                this.testDelay();
                break;
            case 5:
                this.addTitle(chk + "CSS Keyframes 动画...");
                this.cssKeyframes();
                break;
            case 6:
                this.addTitle(chk + "CSS Transition 动画...");
                this.cssTransition();
                break;
            case 7:
                this.addLine("<hr/>");
                this.addTitle(chk + "ES6 兼容性...");
                this.es6Test();
                this.testDelay();
                break;
            case 8:
                this.addTitle(chk + "Event 事件...");
                this.clickTest();
                break;
            case 9:
                this.addTitle(chk + "自定义元素...");
                this.customElementTest();
                break;
            case 10:
                this.addTitle(chk + "Storage 存储...");
                this.storageTest();
                this.testDelay();
                break;
            case 11:
                this.addLine("<hr/>");
                this.addTitle(chk + "JSON 序列化和解析...");
                this.jsonTest();
                this.testDelay();
                break;
            case 12:
                this.addTitle(chk + "映射和集合支持...");
                this.mapSetTest();
                this.testDelay();
                break;
            case 13:
                this.addTitle(chk + "WebGL 支持...");
                this.webGLTest();
                this.testDelay();
                break;
            default:
                this.end();
                break;
        }
    }

    testDelay(time: number = 100) {
        setTimeout(() => {
            this.testNow();
        }, time);
    }

    browserInfo() {
        const texts: string[][] = [
            ["浏览器语言", navigator.language],
            ["浏览器用户代理", navigator.userAgent],
            ["浏览器平台", navigator.platform],
            ["浏览器厂商", navigator.vendor],
            ["浏览器是否启用了Cookie", navigator.cookieEnabled.toString()],
            ["浏览器是否启用了在线状态", navigator.onLine.toString()],
        ];
        if (this.viewInfo) {
            const ul: HTMLUListElement = document.createElement('ul');
            for (const text of texts) {
                console.log(text[0] + ": " + text[1]);
                const li: HTMLLIElement = document.createElement('li');
                li.innerHTML = text[0] + ":&emsp;";
                const code: HTMLElement = document.createElement('code');
                code.innerText = text[1];
                li.appendChild(code);
                ul.appendChild(li);
            }
            document.body.appendChild(document.createElement('hr'));
            document.body.appendChild(ul);
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
            return this.ok(typeof ctx);
        } else {
            return this.fail(typeof ctx);
        }
    }

    svgTest(): boolean {
        if (!document.createElementNS) {
            return this.fail();
        }
        const svg: SVGSVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if (svg) {
            return this.ok(typeof svg);
        } else {
            return this.fail(typeof svg);
        }
    }

    cssSelecterTest() {
        // 10 -> 20 -> 10
        this.checkboxspan.style.animation = "";
        this.checkboxspan.style.transition = "";
        this.checkbox.checked = true;
        let isOK: boolean = false;
        let okStr: string = "";
        let width: number = this.checkboxspan.offsetWidth;
        isOK = (width == 20);
        okStr = `${isOK}${width}`;
        this.checkbox.click();
        width = this.checkboxspan.offsetWidth;
        isOK = (width == 10);
        okStr += ` ${isOK}${width}`;
        if (isOK) {
            this.ok(okStr);
        } else {
            this.fail(okStr);
        }
    }

    cssKeyframes() {
        // 10 -> 40
        this.checkboxspan.style.animation = "spanani 0.3s linear forwards";
        setTimeout(() => {
            if (this.checkboxspan.offsetWidth == 40) {
                this.ok(this.checkboxspan.offsetWidth.toString());
            } else {
                this.fail(this.checkboxspan.offsetWidth.toString());
            }
            this.checkboxspan.style.animation = "";
            this.testNow();
        }, 500);
    }

    cssTransition() {
        // 40 -> 50
        this.checkboxspan.style.animation = "";
        this.checkboxspan.style.transition = "0.3s";
        this.checkboxspan.style.width = "50px";
        setTimeout(() => {
            let width: number = this.checkboxspan.offsetWidth;
            if (width == 50) {
                this.ok(width.toString());
            } else {
                this.fail(width.toString());
            }
            this.checkboxspan.style.transition = "";
            this.testNow();
        }, 500);
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

    jsonTest(): boolean {
        const data: any = {};
        for (let i = 0; i < 10; i++) {
            const rand: number = Math.random();
            data[i.toString()] = (rand >= 0.5) ? rand : rand.toString();

        }
        try {
            const json: string = JSON.stringify(data);
            const obj: any = JSON.parse(json);
            const json2: string = JSON.stringify(obj);
            if (json == json2) {
                return this.ok(json);
            } else {
                return this.fail(json);
            }
        } catch (e) {
            return this.fail(e);
        }
    }

    mapSetTest(): boolean {
        const map: Map<string, string | number> = new Map<string, string | number>();
        const set: Set<string | number> = new Set<string | number>();
        for (let i = 0; i < 10; i++) {
            const rand: number = Math.random();
            const key: string = rand.toString();
            const val: string | number = (rand >= 0.5) ? rand : rand.toString();
            map.set(key, val);
            set.add(val);
        }
        let json: string = "";
        try {
            const obj = Object.create(null);
            for (const [k, v] of map) {
                obj[k] = v;
            }
            json = "|" + JSON.stringify(obj);
            const arr = [...set];
            json += "|" + JSON.stringify(arr);
        } catch (e) {
        }
        if (map.size == 10 && set.size == 10) {
            return this.ok(map.size.toString() + json);
        } else {
            return this.fail(map.size.toString() + json);
        }
    }

    webGLTest(): boolean {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const gl: WebGLRenderingContext | RenderingContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl && (gl instanceof WebGLRenderingContext)) {
            return this.ok(typeof gl);
        } else {
            return this.fail(typeof gl);
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
        if (isOK) {
            console.log(isOK, info);
        } else {
            console.warn(isOK, info);
        }
        if (!this.viewInfo) return isOK;
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
        console.log(title);
        if (!this.viewInfo) return;
        const line: HTMLDivElement = document.createElement('div');
        this.ul = document.createElement('ul');
        const li: HTMLLIElement = document.createElement('li');
        li.innerText = title;
        this.ul.appendChild(li);
        line.appendChild(this.ul);
        document.body.appendChild(line);
    }

    addLine(text: string) {
        if (!this.viewInfo) return;
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
        let info: string = `检查完毕，共检查 ${this.endi[0] + this.endi[1]} 项，通过 ${this.endi[0]} 项，失败 ${this.endi[1]} 项。`
        console.log(info);
        this.addLine(info);
        this.testArea.remove();
        this.addLine("<hr/>");
        const isOK: boolean = this.endi[1] == 0;
        if (this.saveStorage > 0 && this.saveStorageKey.length > 0 && window.Storage && window.localStorage && window.localStorage instanceof Storage) {
            const save: Storage = (this.saveStorage == 1) ? window.sessionStorage : window.localStorage;
            save.setItem(this.saveStorageKey, (isOK ? "1" : "0"));
        }
        if (isOK) {
            info = "前端环境检查全部通过！";
            console.log(info);
            this.addLine("<b>" + info + "</b>");
            if (this.urlOK.length > 0) {
                if (this.urlOK == "a") {
                    alert(info);
                } else {
                    console.log("->", this.urlOK);
                    setTimeout(() => {
                        window.location.replace(this.urlOK);
                    }, 100);
                }
            }
        } else {
            console.warn(this.no);
            this.addLine("<b>" + this.no + "</b>");
            if (this.urlFail.length > 0) {
                if (this.urlFail == "a") {
                    alert(this.no);
                } else {
                    console.log("->", this.urlFail);
                    setTimeout(() => {
                        window.location.replace(this.urlFail);
                    }, 100);
                }
            }
        }
    }
}
