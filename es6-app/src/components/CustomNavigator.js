export default class CustomNavigator extends HTMLElement {
    constructor() {
        super();

        this.cssTemplateElement = document.createElement("template");
    }

    cssTemplate() {
        this.cssTemplateElement.innerHTML = `
        <style>
        #body {
            height: calc(100vh - 100px);
            overflow-y: scroll;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        
        .item {
            background: white;
            padding: 5px;
            display: block;
        }
        
        .item:hover {
            cursor: pointer;
            background: cornsilk;
        }
        
        .item:nth-child(even):hover {
            cursor: pointer;
            background: #dfc342
        }
        
        .item:nth-child(even) {
            background: #F9DC48;
        }
        </style>
        `;

        return this.cssTemplateElement.content;
    }


    /**
     *Lifecycle-method
     *holt sich alle Links vom Server und legt die onlick methoden fest
     *
     * @memberof CustomNavigator
     */
    async connectedCallback() {
        this.append(this.cssTemplate());
        await this.fetchData()
        let links = this.querySelectorAll("a");
        links.forEach(link => this.addCustomEvent(link));
    }

    addCustomEvent(link) {
        link.onclick = evt => this.fireCustomEvent(evt);
    }


    /**
     *Es wird das alte onclick-Event abgefangen und gestoppt.
     *Stattdessen wird ein CustomEvent mit der Artikleid abgefeuert
     *
     * @param {*} evt
     * @memberof CustomNavigator
     */
    fireCustomEvent(evt) {
        evt.preventDefault();
        const event = new CustomEvent('custom-nav', {
            detail: {
                uri: evt.target.getAttribute("articleid")
            },
            bubbles: true
        });

        this.dispatchEvent(event);
    }


    /**
     *holt sich alle Daten und legt die Links an
     *
     * @memberof CustomNavigator
     */
    async fetchData() {
        let data = await (await fetch("http://localhost:8080/short")).json();
        let elems = [];
        data.forEach(item => elems.push(this.createElements(item)));
        this.addToNav(elems);
    }

    createElements(obj) {
        let elem = document.createElement("a");
        elem.innerText = obj.title;
        elem.classList.add("item");
        elem.href = obj.id;
        elem.setAttribute("articleid", obj.id);
        return elem;
    }


    /**
     *fügt die Links zum CustomNavigator hinzu
     *
     * @param {*} elems
     * @memberof CustomNavigator
     */
    addToNav(elems) {;
        elems.forEach(elem => this.appendChild(elem));
    }
}

customElements.define("custom-navigator", CustomNavigator);