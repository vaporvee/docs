class GithubCard extends HTMLElement {
    private count: number = 0;
    private heartButton: HTMLButtonElement;
    private countSpan: HTMLSpanElement;
  
    constructor() {
      super();
      this.heartButton = this.querySelector('button') as HTMLButtonElement;
      this.countSpan = this.querySelector('span') as HTMLSpanElement;
  
      // Each time the button is clicked, update the count.
      this.heartButton.addEventListener('click', () => {
        this.count++;
        this.countSpan.textContent = this.count.toString();
      });
    }
  }
  
  // Tell the browser to use our AstroHeart class for <astro-heart> elements.
  customElements.define('gh-card', GithubCard);