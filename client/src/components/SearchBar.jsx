/* text input, search icon */
/* need to validate input, if empty, show error message */
import React from 'react';
import { useState } from 'react';
import searchIcon from '../assets/images/icon-search.svg';
import './SearchBar.css';
import '../typography.css'; // Import typography styles


const SearchBar = ({ onSearch, error }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchTerm);
        }
    }


    return (
        <div className={`search-bar ${isFocused ? 'focused ' : ''} ${error ? 'error': ''}`}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search for any word..."
            />
            <img
                src={searchIcon}
                alt="Search"
                className="search-icon"
                onClick={() => onSearch(searchTerm)}
            />
        </div>
    );
}

export default SearchBar;