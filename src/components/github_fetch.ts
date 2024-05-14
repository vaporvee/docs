import colors from './colors.json';

interface Repository {
  stargazers_count: number;
  forks_count: number;
  description: string;
  language: string;
}
//TODO: less dynamic typecript more script in astro head
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
      setString(this, "gh_description", this.cachedData.description);
      setString(this, "gh_language", this.cachedData.language);
      setString(this, "gh_stars", this.cachedData.stargazers_count.toString());
      setString(this, "gh_forks", this.cachedData.forks_count.toString());
      const element = this.querySelector('#gh_language_color');
      if (element instanceof HTMLElement) {
          element.style.backgroundColor = colors[this.cachedData.language].color;
        }
    }
  }

  async update(): Promise<void> {
    const cachedDataKey = `githubCardData_${this.owner}_${this.repo}`;
    const cachedData = localStorage.getItem(cachedDataKey);
    if (cachedData) {
      this.cachedData = JSON.parse(cachedData);
      this.update_string();
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
