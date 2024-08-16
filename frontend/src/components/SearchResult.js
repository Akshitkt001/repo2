import React from 'react';
import PropTypes from 'prop-types';
import { formatContent } from '../utils/formatContent'; // Ensure the path is correct
import './SearchResult.css'; // Import the CSS for styling

function SearchResult({ result }) {
  const { title, snippet, url } = result;

  return (
    <div className="search-result-card">
      <h3 className="result-title">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="result-snippet" dangerouslySetInnerHTML={{ __html: formatContent(snippet) }}></p>
      {url && <a className="result-link" href={url} target="_blank" rel="noopener noreferrer">Read more</a>}
    </div>
  );
}

SearchResult.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    snippet: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default SearchResult;
