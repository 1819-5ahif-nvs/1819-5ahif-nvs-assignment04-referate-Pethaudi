export default class CustomRouter extends HTMLElement {
    constructor() {
        super();

        this.htmlTemplateElement = document.createElement("template");
    }

    htmlTemplate() {
        this.htmlTemplateElement.innerHTML = `
        <style>
        :root {
            height: calc(100vh - 100px);
            width: 100%;
        }
        </style>
        `;

        return this.htmlTemplateElement.content;
    }


    /**
     *Wenn das CustomEvent abgefangen worde ist soll das Artikel-Element erstellt werden und angehängt
     *
     * @param {*} evt
     * @memberof CustomRouter
     */
    reactOnCustomEvent(evt) {
        this.innerHTML = "";
        let article = document.createElement("app-article");
        article.setAttribute("articleid", evt.detail.uri);
        this.appendChild(article);
    }


    /**
     *Hier wird der EventListener für das CustomEvent angelegt
     *
     * @memberof CustomRouter
     */
    connectedCallback() {
        this.appendChild(this.htmlTemplate());
        document.addEventListener("custom-nav", evt => this.reactOnCustomEvent(evt));
    }
}

customElements.define("custom-router", CustomRouter);