interface Repository {
  stargazers_count: number;
  forks_count: number;
}

class GithubCard extends HTMLElement {
  public owner: string;
  public repo: string; 
  public starsSpan: HTMLSpanElement;
  public forksSpan: HTMLSpanElement;
  

  constructor() {
    super();
    this.repo = this.getAttribute("repo") as string;
    this.owner = this.getAttribute("owner") as string;
    this.starsSpan = document.getElementById('gh_stars') as HTMLSpanElement;
    this.forksSpan = document.getElementById('gh_forks') as HTMLSpanElement;
  }

  static async fetchRepository(owner: string, repo: string): Promise<Repository | null> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!response.ok) {
      throw new Error('Failed to fetch repository');
    }
    const data: Repository = await response.json();
    return data;
  }

  async update(): Promise<void> {
    const repository = await GithubCard.fetchRepository(this.owner, this.repo);
    this.starsSpan.textContent = repository.stargazers_count.toString() || '0';
    this.forksSpan.textContent = repository.forks_count.toString() || '0';
  }
}

customElements.define('gh-card', GithubCard);

(async () => {
    const card = document.querySelector('gh-card');
    if (card instanceof GithubCard) {
        await card.update();
    }
})();
