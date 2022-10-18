import componentCss from './my-component.scss';
import componentHtml from './my-component.html';

export class MyComponent extends HTMLElement {

    connectedCallback() {
        const root = this.attachShadow({ mode: 'open' });
        root.innerHTML = componentHtml;
        componentCss.use({ target: root });
    }
}

customElements.define('my-component', MyComponent);
