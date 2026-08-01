import { graphql } from "@octokit/graphql";

const githubToken = process.env.GITHUB_TOKEN;

const graphQL = graphql.defaults({
  headers: {
    ...(githubToken ? { authorization: `token ${githubToken}` } : {}),
  },
});

export interface githubStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalStars: number;
  totalContributions: number;
  followers: number;
  rank: number;
}

const statsQuery = `
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      commitContributions {
        totalCount
      }
      repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
        edges {
          node {
            stargazerCount
          }
        }
      }
      pullRequests { totalCount }
      issues { totalCount }
      followers { totalCount }
    }
  }
`

interface statsResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
      };
      commitContributions: {
        totalCount: number;
      };
    };
    repositories: {
      edges: Array<{
        node: {
          stargazerCount: number;
        };
      }>;
    };
    pullRequests: { totalCount: number };
    issues: { totalCount: number };
    followers: { totalCount: number };
  };
}

export async function fetchStats(username: string): Promise<githubStats | null> {
  try {
    const data = await graphQL<statsResponse>(statsQuery, { username });
    const totalStars = data.user.repositories.edges.reduce(
      (sum, edge) => sum + edge.node.stargazerCount, 0
    );

    const totalCommits = data.user.contributionsCollection.commitContributions.totalCount;

    const totalContributions = data.user.contributionsCollection.contributionCalendar.totalContributions;

    const totalPRs = data.user.pullRequests.totalCount;

    const totalIssues = data.user.issues.totalCount;

    const followers = data.user.followers.totalCount;

    return {
      totalStars,
      totalCommits,
      totalPRs,
      totalIssues,
      totalContributions,
      followers,
      rank: 0,
    }
  } catch (error) {
    console.error(`Failed to fetch github stats for "${username}"`, error);
    return null;
  }
}

interface langsResponse {
  user: {
    repositories: {
      edges: Array<{
        node: {
          languages: {
            edges: Array<{
              node: { name: string };
              size: number;
            }>;
          };
        };
      }>;
    };
  };

}

const langQuery = `
  query ($username: String!) {
    user(login: $username) {
      repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
        edges {
          node {
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                node { name }
                size
              }
            }
          }
        }
      }
    }
  }
`

export type LanguageMap = Map<string, number>;

export async function fetchLanguages(username: string): Promise<LanguageMap | null> {
  try {
    const data = await graphQL<langsResponse>(langQuery, { username });

    const repoEdges = data.user.repositories.edges;

    const langMap = new Map<string, number>();
    repoEdges.forEach(edge => {
      for (const langEdge of edge.node.languages.edges) {
        const name = langEdge.node.name;
        const size = langEdge.size;

        langMap.set(name, (langMap.get(name) || 0) + size);
      }
    });

    return langMap;
  } catch (error) {
    console.error(`Failed to fetch languages for "${username}"`, error);
    return null;
  }
}

interface miniResponse {

}

export async function fetchMiniMetric(username: string, metric: string): Promise<number | null> {
  try {
    const stats = await fetchStats(username);
    if (!stats) {
      return null;
    }
    switch (metric) {
      case "stars":
        return stats.totalStars;
      case "commits":
        return stats.totalCommits;
      case "prs":
        return stats.totalPRs;
      case "issues":
        return stats.totalIssues;
      case "followers":
        return stats.followers;
      case "contributions":
        return stats.totalContributions;
      default:
        return null;
    }
  } catch (error) {
    console.error(`Failed to fetch stats for "${username}"`, error);
    return null;
  }
}


