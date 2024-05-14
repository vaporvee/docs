interface Repository {
  stargazers_count: number;
  forks_count: number;
}

class GithubCard extends HTMLElement {
  public owner: string;
  public repo: string;
  private cachedData: Repository | null = null;

  constructor() {
    super();
    this.repo = this.getAttribute("repo") as string;
    this.owner = this.getAttribute("owner") as string;
  }

  static async fetchRepository(owner: string, repo: string): Promise<Repository | null> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!response.ok) {
      throw new Error('Failed to fetch repository');
    }
    const data: Repository = await response.json();
    return data;
  }

  update_string() {
    if (this.cachedData) {
      if (this.cachedData.forks_count === 0)
        hideElement(this,"gh_fork_icon")
      else
        setString(this, "gh_forks", this.cachedData.forks_count.toString());
      if (this.cachedData.stargazers_count === 0)
        hideElement(this,"gh_star_icon")
      else
        setString(this, "gh_stars", this.cachedData.stargazers_count.toString());
    }
  }

  async update(): Promise<void> {
    const cachedDataKey = `githubCardData_${this.owner}_${this.repo}`;
    const cachedData = localStorage.getItem(cachedDataKey);
    if (cachedData) {
      this.cachedData = JSON.parse(cachedData);
      this.update_string();
    } else  {
      hideElement(this,"gh_fork_icon")
      hideElement(this,"gh_star_icon")
    }
    try {
      this.cachedData = await GithubCard.fetchRepository(this.owner, this.repo);
      localStorage.setItem(cachedDataKey, JSON.stringify(this.cachedData));
      this.update_string();
    } catch (error) {
      console.error('Failed to fetch repository data:', error);
    }
  }
}

customElements.define('gh-card', GithubCard);

document.querySelectorAll('gh-card').forEach(async (card) => {
    if (card instanceof GithubCard) {
        await card.update();
    }
});

function setString(card: GithubCard, elementID: string, value: string | number) {
  const element = card.querySelector(`#${elementID}`);
  if (element) {
    element.textContent = value.toString();
  }
}

function hideElement(card: GithubCard, elementID: string) {
  const element: HTMLElement = card.querySelector(`#${elementID}`);
  if (element) {
    element.style.visibility = "hidden"
  }
}
