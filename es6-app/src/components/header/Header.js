export default class Header extends HTMLElement {
    
    
    /**
     *Es wird der ShadowDOM angelegt und auf root gespeichert
     *außerdem werde noch template-variable für html und css erstellt
     * @memberof Header
     */
    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });
        this.htmlTemplateElement = document.createElement("template");
        this.cssTemplateElement = document.createElement("template");
    }


    /**
     *css styling
     *
     * @returns
     * @memberof Header
     */
    cssTemplate() {
        this.cssTemplateElement.innerHTML = `
        <style>
        #body {
            display: grid;
            grid-template-columns: 100px auto 100px;
            height: 100px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            text-align: center;
        }
        
        img {
            grid-column: 1/2;
            height: 100px;
        }
        
        h1 {
            grid-column: 2/3;
        }
        </style>
        `;

        return this.cssTemplateElement.content;
    }

    
    /**
     *html structure
     *
     * @returns
     * @memberof Header
     */
    htmlTemplate() {
        this.htmlTemplateElement.innerHTML = `
        <div id="body">
            <img src="../img/logo.jpg" alt="logo">
            <h1>Newspaper fetcher</h1>
        </div>`;

        return this.htmlTemplateElement.content;
    }


    /**
     *Lifecycle method
     *html und css gets werden an den ShadowDom angehängt
     *
     * @memberof Header
     */
    connectedCallback() {
        this.root.appendChild(this.htmlTemplate());
        this.root.appendChild(this.cssTemplate());
    }
}

customElements.define("app-header", Header);