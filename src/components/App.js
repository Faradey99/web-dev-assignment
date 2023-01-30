import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Toolbar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getSources, getTopHeadlines } from '../api/newsApi';
import { getFromStorage, saveToStorage } from '../api/sessionStorageApi';
import NavBar from './NavBar';
import NewsCard from './NewsCard';
import NewsSearch from './NewsSearch';
import OptionSet from './OptionSet';

function App() {
  const selectedTopicsStorageKey = 'selectedTopics';
  const selectedDomainsStorageKey = 'selectedDomains';

  const topicOptions = [
    {
      label: 'Business',
      name: 'business',
    },
    {
      label: 'Entertainment',
      name: 'entertainment',
    },
    {
      label: 'General',
      name: 'general',
    },
    {
      label: 'Health',
      name: 'health',
    },
    {
      label: 'Science',
      name: 'science',
    },
    {
      label: 'Sports',
      name: 'sports',
    },
    {
      label: 'Technology',
      name: 'technology',
    },
  ];

  const [domains, setDomains] = useState([]);

  useEffect(() => {
    getSources().then((response) => {
      const sources = response.sources;

      setDomains(sources ? sources.map(({ id, name }) => ({ label: name, name: id })) : []);
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedTopics, selectTopics] = useState(getFromStorage(selectedTopicsStorageKey) || ['general']);

  useEffect(() => {
    saveToStorage(selectedTopicsStorageKey, selectedTopics);
  });

  const [selectedDomains, selectDomains] = useState(getFromStorage(selectedDomainsStorageKey) || []);

  useEffect(() => {
    saveToStorage(selectedDomainsStorageKey, selectedDomains);
  });

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const loadMore = () => {
    setPage(page + 1);
  };

  const pageReset = () => {
    setPage(1);
  };

  const [topHeadlines, setTopHeadlines] = useState([]);

  useEffect(() => {
    const q = searchQuery;
    const category = selectedTopics.join(',');
    const sources = selectedDomains.join(',');

    getTopHeadlines({ q, category, sources, page }).then((response) => {
      const articles = response.articles;

      setTopHeadlines((topHeadlines) => (page === 1 ? articles : topHeadlines.concat(articles)) || []);
      setIsLoading(false);
    });
  }, [page, searchQuery, selectedTopics, selectedDomains]);

  const getUpdatedSelection = (state, target) => {
    const targetName = target.name;

    let newState = [...state, targetName];

    if (!target.checked) {
      newState = newState.filter((name) => name !== targetName);
    }

    return newState;
  }

  const handleTopicsChange = (event) => {
    selectDomains([]);

    pageReset();

    selectTopics(getUpdatedSelection(selectedTopics, event.target));
  };

  const handleDomainsChange = (event) => {
    selectTopics([]);

    pageReset();

    selectDomains(getUpdatedSelection(selectedDomains, event.target));
  };

  const newsCards = topHeadlines.map(({ title, description, url, urlToImage }, index) =>
    <Grid item xs={6} key={index}>
      <NewsCard title={title} description={description} url={url} urlToImage={urlToImage} />
    </Grid>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar></NavBar>

      <Container fixed component="main" sx={{ p: 3 }}>
        <Toolbar />

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <OptionSet label="Topics" options={topicOptions} selectedOptions={selectedTopics}
                       onChange={handleTopicsChange} />

            <Divider />

            <OptionSet label="Domains" options={domains} selectedOptions={selectedDomains}
                       onChange={handleDomainsChange} />
          </Grid>

          <Grid item xs={9}>
            <NewsSearch value={searchQuery} debounceTime={500} onCancelResearch={() => setSearchQuery('')}
                        onChange={setSearchQuery} />

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>{newsCards}</Grid>

            {newsCards.length !== 0 && <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button variant="contained" disabled={isLoading} onClick={loadMore}>Load more</Button>
            </Box>}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
