import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked'; // Corrected import
import './SearchBar.css';
import SearchResult from './SearchResult';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiResponse, setAIResponse] = useState('');
  const [references, setReferences] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:8000/search', {
        params: { q: query },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setAIResponse(response.data.ai_response || 'No AI response available.');
      setReferences(response.data.results || []);
    } catch (err) {
      console.error('Search Error:', err);

      if (err.response) {
        setError(`Server Error: ${err.response.status} - ${err.response.data.detail}`);
      } else if (err.request) {
        setError('Network Error: Unable to connect to the server.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const spokenQuery = event.results[0][0].transcript;
      setQuery(spokenQuery);
      handleSearch();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const renderMarkdown = (markdown) => {
    const html = marked(markdown, { breaks: true });
    return { __html: html };
  };

  return (
    <div className="search-engine">
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            id="search-input"
            type="text"
            value={query}
            placeholder="Search for something..."
            title="Search input"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch} disabled={loading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.442 1.733a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
            </svg>
          </button>
          <button className="voice-button" onClick={startVoiceSearch} disabled={loading || isListening}>
            🎙️
          </button>
        </div>
      </div>

      <div className="results-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {aiResponse && (
          <div className="ai-response" dangerouslySetInnerHTML={renderMarkdown(aiResponse)} />
        )}

        <div className="references-container">
          {references.length > 0 ? (
            references.map((reference, index) => (
              <SearchResult key={index} result={reference} />
            ))
          ) : (
            <p>No references found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
