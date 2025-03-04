async function baseRequest(url: string, options?: RequestInit) {
  if (!options) {
    options = {} as RequestInit;
  }

  options.headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

export async function GetUsername(username: string) {
  const url = `${process.env.NEXT_PUBLIC_GITHUB_API}/search/users?q=${username}&per_page=5`;
  return baseRequest(url);
}

export async function GetRepository(username: string) {
  const url = `${process.env.NEXT_PUBLIC_GITHUB_API}/users/${username}/repos`;
  return baseRequest(url);
}