const apiUrl = 'https://newsapi.org/v2';
const apiKey = process.env.REACT_APP_NEWS_API_KEY;
const topHeadlinesApiUrl = `${apiUrl}/top-headlines`;

let topHeadlinesController;

export async function getTopHeadlines(reqParams) {
  if (topHeadlinesController) {
    topHeadlinesController.abort();
  }

  try {
    const url = new URL(topHeadlinesApiUrl);
    const params = { ...reqParams, apiKey };

    url.search = new URLSearchParams(params).toString();

    topHeadlinesController = new AbortController();

    const signal = topHeadlinesController.signal;
    const response = await fetch(url, { signal });

    return await response.json();
  } catch (e) {
    console.error(e);

    return [];
  }
}

let getSourcesController;

export async function getSources(reqParams) {
  if (getSourcesController) {
    getSourcesController.abort();
  }

  try {
    const url = new URL(`${topHeadlinesApiUrl}/sources`);
    const params = { ...reqParams, apiKey };

    url.search = new URLSearchParams(params).toString();

    getSourcesController = new AbortController();

    const signal = getSourcesController.signal;
    const response = await fetch(url, { signal });

    return await response.json();
  } catch (e) {
    console.error(e);

    return [];
  }
}
