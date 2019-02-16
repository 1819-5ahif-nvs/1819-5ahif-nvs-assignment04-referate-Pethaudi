//import html from './Article.html';

export default class Article extends HTMLElement {
	constructor() {
		super();

		this.root = this.attachShadow({ mode: "open" });

		this.template = document.createElement("template");
	}


	/**
	 *Lädt den Artikel
	 *
	 * @memberof Article
	 */
	connectedCallback(){
		fetch("http://localhost:8080/" + this.getAttribute("articleid"))
			.then(data => data.json())
			.then(data => this.createStructure(data));
	}

	getHtml() {
		this.template.innerHTML = `
		<div id="body"></div>
		<style>
			.content {
				height: 100%;
				width: 100%;
			}
			#body {
				height: 100%;
				overflow-y: scroll;
			}
		</style>
		`;

		return this.template.content;
	}


	/**
	 *Erstellt die Artikelstruktur
	 *
	 * @param {*} elem
	 * @memberof Article
	 */
	createStructure(elem) {
		let header = document.createElement("h2");
		header.innerText = elem.title;

		let content = document.createElement("div");
		content.classList.add("content");
		content.innerText = elem.content;

		this.root.innerHTML = html;
		this.root.querySelector("#body").append(header);
		this.root.querySelector("#body").append(content);
	}
}

customElements.define("app-article", Article);