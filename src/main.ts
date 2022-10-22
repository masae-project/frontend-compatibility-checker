import CustomElement from "./custom-element";
import CustomDelegateClass, { CustomDelegate } from "./custom-delegate";

export default class Main implements CustomDelegate {
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
  // 是否輸出一些關於資訊
  about: boolean = true;
  // </可配置的選項>

  planTotal = 14;
  progress: HTMLDivElement;
  progressStep = 0;
  checkbox: HTMLInputElement;
  checkboxspan: HTMLSpanElement;
  step: number = 0;
  endi: number[] = [0, 0];
  testArea: HTMLDivElement;
  no: string = "不支持当前浏览器，请更新到最新版本的浏览器再试。";
  ul: HTMLUListElement = document.createElement('ul');

  /**
   * 構造方法
   */
  constructor() {
    const nojs: HTMLElement = document.getElementById('nojs') as HTMLElement;
    nojs.remove();
    const noscripts: HTMLCollectionOf<HTMLElement> = document.getElementsByTagName('noscript');
    for (const key in noscripts) {
      if (Object.prototype.hasOwnProperty.call(noscripts, key)) {
        const noscript = noscripts[key];
        noscript.remove();
      }
    }
    document.body.innerHTML = '<p>正在进行前端兼容性检查...' + (this.about ? '&emsp;&emsp;<a href="https://github.com/miyabi-project/frontend-compatibility-checker" target="_blank">源码</a>' : '') + '</p>如果下面的进度条卡住，可能是 网速原因 或者 ' + this.no;
    console.log(document.body.innerText);

    // UI
    this.progressStep = 100 / this.planTotal;
    const progressbar: HTMLDivElement = document.createElement('div');
    progressbar.id = 'progressbar';
    this.progress = document.createElement('div');
    this.progress.id = 'progress';
    progressbar.appendChild(this.progress);
    document.body.appendChild(progressbar);
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

    this.browserInfo();
    this.testNow();
  }

  /**
   * 立即開始下一步測試任務
   */
  testNow() {
    this.progress.style.width = (this.step * this.progressStep).toString() + '%';
    console.log(this.progress.style.width)
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
        this.addTitle(chk + "代理方法...");
        this.delegateTest();
        break;
      case 10:
        this.addLine("<hr/>");
        this.addTitle(chk + "JSON 序列化和解析...");
        this.jsonTest();
        this.testDelay();
        break;
      case 11:
        this.addTitle(chk + "映射和集合支持...");
        this.mapSetTest();
        this.testDelay();
        break;
      case 12:
        this.addTitle(chk + "自定义元素...");
        this.customElementTest();
        break;
      case 13:
        this.addLine("<hr/>");
        this.addTitle(chk + "Storage 存储...");
        this.storageTest();
        this.testDelay();
        break;
      case 14:
        this.addTitle(chk + "WebGL 支持...");
        this.webGLTest();
        this.testDelay();
        break;
      default:
        this.end();
        break;
    }
  }

  /**
   * 延遲啟動下一步測試任務
   * @param {number} time 延遲時間
   */
  testDelay(time: number = 100) {
    setTimeout(() => {
      this.testNow();
    }, time);
  }

  /**
   * 瀏覽器資訊
   */
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

  /**
   * 檢查 HTML5 相容性
   * @return {boolean} 檢查結果
   */
  html5Test(): boolean {
    if (typeof (Worker) !== "undefined") {
      return this.ok(typeof (Worker));
    } else {
      return this.fail(typeof (Worker));
    }
  }

  /**
   * 檢查 Canvas 相容性
   * @return {boolean} 檢查結果
   */
  canvasTest(): boolean {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (typeof canvas.getContext == "function" && ctx) {
      return this.ok(typeof ctx);
    } else {
      return this.fail(typeof ctx);
    }
  }

  /**
   * 檢查 SVG 相容性
   * @return {boolean} 檢查結果
   */
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

  /**
   * 檢查 CSS 選擇器
   */
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

  /**
   * 檢查 CSS Keyframes 動畫
   */
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

  /**
   * 檢查 CSS Transition 動畫
   */
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

  /**
   * 檢查 ES6 相容性
   * @return {boolean} 檢查結果
   */
  es6Test(): boolean {
    const arrowFunction = "var t = () => {};";
    const asyncFunction = "var t = async () => {};";
    try {
      let f: Function = new Function(arrowFunction);
      f = new Function(asyncFunction);
      return this.ok(f.toString());
    }
    catch (e: any) {
      this.fail(e.toString());
      return false;
    }
  }

  /**
   * 檢查 Event 事件
   */
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

  /**
   * CustomDelegate 代理方法的實現
   * @param {string} val1 返回值1
   * @param {number} val2 返回值2
   */
  delegateFunc(val1: string, val2: number) {
    if (val1 == "1" && val2 == 0) {
      this.ok(val1 + val2);
    } else {
      this.fail(val1 + val2);
    }
    this.testNow();
  }

  /**
   * 檢查 代理方法
   */
  delegateTest() {
    const testClass = new CustomDelegateClass();
    testClass.delegate = this;
  }

  /**
   * 檢查 JSON 序列化和解析
   * @return {boolean} 檢查結果
   */
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
    } catch (e: any) {
      return this.fail(e.toString());
    }
  }

  /**
   * 檢查 對映和集合支援
   * @return {boolean} 檢查結果
   */
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

  /**
   * 檢查 自定義元素
   */
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

  /**
   * 檢查 Storage 儲存
   * @returns {boolean} 檢查結果
   */
  storageTest(): boolean {
    const timestamp: number = new Date().getTime();
    let val: string = timestamp.toString();
    let key: string = "frontend-compatibility-checker-" + val;
    if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
      const vals = ["", ""];
      sessionStorage.setItem(key, val);
      vals[0] = sessionStorage.getItem(key) ?? "";
      if (vals[0] != val) {
        return this.fail(val);
      }
      sessionStorage.removeItem(key);
      key += "T";
      val += "T";
      localStorage.setItem(key, val);
      vals[1] = localStorage.getItem(key) ?? "";
      if (vals[1] != val) {
        return this.fail(val);
      }
      localStorage.removeItem(key);
      return this.ok(vals.join(','));
    } else {
      return this.fail(val);
    }
  }

  /**
   * 檢查 WebGL 支援
   * @returns {boolean} 檢查結果
   */
  webGLTest(): boolean {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const gl: WebGLRenderingContext | RenderingContext | null = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl && (gl instanceof WebGLRenderingContext)) {
      return this.ok(typeof gl);
    } else {
      return this.fail(typeof gl);
    }
  }

  /**
   * 輸出成功的結果
   * @param text 細節資訊
   * @return {boolean} true
   */
  ok(text: string = ""): boolean {
    this.endi[0]++;
    return this.addInfo(text, true);
  }

  /**
   * 輸出失敗的結果
   * @param text 細節資訊
   * @return {boolean} false
   */
  fail(text: string = ""): boolean {
    this.endi[1]++;
    return this.addInfo(text, false);
  }

  /**
   * 輸出成功或失敗的結果
   * @param info 細節資訊
   * @param isOK 是否成功
   * @return {boolean} 是否成功
   */
  addInfo(info: string, isOK: boolean): boolean {
    if (isOK) {
      console.log(isOK, info);
    } else {
      console.warn(isOK, info);
      this.progress.style.backgroundColor = "#F00";
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

  /**
   * 顯示當前檢測任務的標題
   * @param title 當前檢測任務的標題
   */
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

  /**
   * 新增一行輸出資訊
   * @param text 輸出資訊
   */
  addLine(text: string) {
    if (!this.viewInfo) return;
    const line: HTMLDivElement = document.createElement('div');
    line.innerHTML = text;
    document.body.appendChild(line);
  }

  /**
   * 所有測試任務結束後進行的操作
   */
  end() {
    this.progress.style.transition = "none";
    this.progress.style.width = "100%";
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
      const saveVal: string = "1," + this.endi.join(','); // 版本,成功,失敗
      save.setItem(this.saveStorageKey, saveVal);
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
          this.jmp(this.urlOK);
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
          this.jmp(this.urlFail);
        }
      }
    }
  }

  /**
   * 網頁跳轉
   * @param url 要跳轉到的網址
   */
  jmp(url: string) {
    this.progress.style.width = "0%";
    setTimeout(() => {
      this.progress.style.transition = "width 30s ease-out";
      this.progress.style.width = "100%";
      window.location.replace(url);
    }, 100);
  }
}
