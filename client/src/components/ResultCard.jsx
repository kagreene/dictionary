/* word, button to play audio file, and pronunciation go in result header */
/* definition blocks: part of speech in header, 'meaning', bulleted definitions, 'synonyms' and returned synonyms */
/*'Source' and link to definition source */
import React, { useRef } from 'react';
import './ResultCard.css';
import playIcon from '../assets/images/icon-play.svg';
import windowIcon from '../assets/images/icon-new-window.svg';
import '../typography.css'; // Import typography styles
/* Consider further modularizing this component; look for an example of nested components from bootcamp */

const ResultCard = ({ definition }) => {
    // Check if definition is null or undefined
    if (!definition || definition.length === 0) {
        return <div className="no-result">
            <p className="emoji">😕</p>
            <h2 className="no-def">No Definitions Found</h2>
            <p className="body-m subheading">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at a later time or head to the web instead.</p>
        </div>;
    }

    // dictionary API returns an array of definitions, so we can map through it
    const entry = definition[0];
    const { word, phonetics = [], meanings = [] } = entry;

    // Extract the first phonetic pronunciation and audio file if available
    const audioSrc = phonetics.find(p => p.audio)?.audio || '';
    const pronunciation = phonetics.find(p => p.text)?.text || '';
    const audioRef = useRef(null);
    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };
    return (
        <div className="result-card">
            <div className='result-header'>
                <div className='result-header-word'>
                    <h1 className='heading-l bold'>{word}</h1>
                    <p className="heading-m purple-accent regular">{pronunciation}</p>
                </div>
                {audioSrc && (
                    <>
                        <button className="play-audio-btn" onClick={handlePlay} aria-label="Play pronunciation">
                            <svg className='play-icon' xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fillRule="evenodd"><circle className= 'play-bg' cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path className='play-triangle' d="M29 27v21l21-10.5z"/></g></svg>
                        </button>
                        <audio ref={audioRef} src={audioSrc} />
                    </>
                )}
            </div>
            <div className="meanings">
                {meanings.map((meaning, index) => (
                    <div key={index} className="meaning">
                        <div className='pos-header'>
                            <h3 className='heading-m'>{meaning.partOfSpeech}</h3>
                            <div className='pos-line' />
                        </div>
                        <h4 className='heading-s regular subheading'>Meaning</h4>
                        <ul className='body-m meanings-list'>
                            {meaning.definitions.map((def, i) => (
                                <li key={i}>
                                    <p>{def.definition}</p>
                                    {def.example && <p className='example'>"{def.example}"</p>}
                                </li>
                            ))}
                        </ul>
                        {meaning.synonyms && meaning.synonyms.length > 0 && (
                            <div className="synonyms-line">
                                <h4 className='heading-s regular subheading'>Synonyms</h4>
                                <ul className='synonyms-list'>
                                    {meaning.synonyms.map((synonym, i) => (
                                        <li key={i} className='synonym bold'>{synonym}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='pos-line' />
            {entry.sourceUrls && entry.sourceUrls.length > 0 && (
                <div className="body-s regular subheading source">
                    <p>Source</p>
                    <a href={entry.sourceUrls[0]} target="_blank" rel="noopener noreferrer" className='body-s regular source-link'>
                        {entry.sourceUrls[0]}
                        <img src={windowIcon} alt="Open in new window" />
                    </a>
                </div>
            )}
        </div>
    )
}

export default ResultCard;