import SearchBar from '@mkyy/mui-search-bar';
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function NewsSearch({ value, debounceTime, onCancelResearch, onChange, onSearch }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(inputValue), debounceTime || 0);

    return () => clearTimeout(timeout);
  });

  return (
    <Paper>
      <SearchBar value={value} onCancelResearch={onCancelResearch} onChange={setInputValue} onSearch={onSearch}
                 width="100%" />
    </Paper>
  )
}

NewsSearch.propTypes = {
  value: PropTypes.string.isRequired,
  debounceTime: PropTypes.number,
  onCancelResearch: PropTypes.func,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
}
