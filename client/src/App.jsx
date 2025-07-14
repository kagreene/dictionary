import { useState, useContext, useEffect } from 'react'
import Header from './components/Header'
import ResultCard from './components/ResultCard'
import SearchBar from './components/SearchBar'
import { fetchDefinition } from './api/dictionaryAPI'
import { ThemeProvider, ThemeContext } from './components/ThemeContext'
import './App.css'


function App() {
  const [definition, setDefinition] = useState(null)
  const [error, setError] = useState('')
  const theme = useContext(ThemeContext)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const htmlElement = document.documentElement;

    if (prefersDark) {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    }
  }, []);

  const handleSearch = async (term) => {
    if (!term.trim()) {
      setError("Whoops, can't be empty...");
      setDefinition(null);
      return;
    }

    try {
      setError('');
      const data = await fetchDefinition(term);
      setDefinition(data);
    } catch (err) {
      console.error(err);
      setError('no-definitions');
      setDefinition(null);
    }
  };

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme, font }) => (
          <div className={`app-container`} style={{ fontFamily: font }}>
            <Header />
            <div className="search-block">
            <SearchBar onSearch={handleSearch} error={error} />
            {error && error !== 'no-definitions' && (
              <p className="body-m error-message">{error}</p>
            )}
            {error === 'no-definitions' ? (
              <ResultCard definition={null} />
            ) : (
              definition && <ResultCard definition={definition} />
            )}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  )
}
export default App
