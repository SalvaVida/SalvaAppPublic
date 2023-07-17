import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

import location from '../../images/icons/location--filled.svg';
import search from '../../images/icons/search.svg';
import clearIcon from '../../images/icons/close--outline.svg';

import './_index.scss'

// returns true if the element is clicked outside
const useClickOutside = (elementRef) => {
    const [isClickedOutside, setIsClickedOutside] = useState(false);
  
    useEffect(() => {
      // checks if the click target is inside the element
      const handleClickOutside = (event) => {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
          setIsClickedOutside(true);
        } else {
          setIsClickedOutside(false);
        }
      };
  
      // Add the event listener to the document
      document.addEventListener("click", handleClickOutside);
  
      // Remove the event listener on cleanup
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [elementRef]);
  
    return isClickedOutside;
};
  
  
const SearchBar = ({ value, onChange, results, onSelect, placeholder, setValue, setSelectedHospital }) => {
    const searchBarRef = useRef(null); // ref for the search bar div
    const isClickedOutside = useClickOutside(searchBarRef); // use the custom hook and pass the ref
    const [showDropdown, setShowDropdown] = useState(false);

    /* ANIMATION */
    const [isFocused, setIsFocused] = useState(false);

    const titleProps = useSpring({
      top: isFocused || value ? '0px' : '10px',
      fontSize: isFocused || value ? '14px' : '16px',
      paddingLeft: isFocused || value ? '2.5rem' : '2.5rem',
      opacity: isFocused || value ? '0.65' : '1',
    });

    // Toggle the dropdown based on the value of isClickedOutside
    useEffect(() => {
        if (isClickedOutside) {
            setShowDropdown(false);
        } else {
            setShowDropdown(true);
        }
    }, [isClickedOutside]);

    const handleClear = () => {
        setValue('');
    };

    return (
        <div className="search-bar flex-fill" ref={searchBarRef}>
            <div className='animated-form search ibm-plex'>
                <div className="form-group" style={{ position: 'relative', margin: 0}}>
                    {/* LABEL */}
                    <animated.label style={titleProps} className={isFocused ? 'focused' : ''}>
                        {placeholder}
                    </animated.label>

                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`search-input form-control search-form bg-light`}
                        style={{ paddingLeft: '3rem!important' }}
                    />

                    {/* BUTTON */}
                    {value && ( // Render the clear button only if there is an input value
                    <button
                        type="button"
                        onClick={handleClear}
                        className='search-button'
                    >
                        <img src={clearIcon} className="search-icon" alt="limpar" />
                    </button>
                    )}
                    {!value && ( // Render the search button if there is no input value
                    <button
                        type="button"
                        className='search-button'
                    >
                        <img src={search} className="search-icon" alt="buscar" />
                    </button>
                    )}

                </div>
            </div>
            {showDropdown && results.length > 0 && (
                <div className="search-results py-2">
                {results.map((result) => (
                    <div
                    key={result.id}
                    className="search-result d-flex flex-row align-items-center px-3 py-2"
                    onClick={() => onSelect(result)}
                    >
                        {/* <div className="search-result-type">{result.place_type[0]}</div> */}
                        <img src={location} className="result-icon ms-1 me-3 mt-1 opacity-50" alt="map" />
                        <div>
                            <div className="fw-600">{result.text}</div>
                            <div className="fw-400 work-sans">{result.place_name.replace(result.text + ", ", "")}</div>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
