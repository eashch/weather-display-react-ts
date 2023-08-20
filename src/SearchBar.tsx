import './weather-display.css';
import searchIcon from './header-icons/header__search-icon.svg';
import { useState } from 'react';

export interface SearchBarInfo {
    getWeatherForArbitraryLocation: (location: string) => void;
}

function SearchBar(props: SearchBarInfo): JSX.Element {
    const [locationName, setLocationName] = useState<string>('');

    const searchByLocationName = (locationRaw: string): void => {
        if (props.getWeatherForArbitraryLocation !== undefined)
            props.getWeatherForArbitraryLocation(locationRaw);
        setLocationName('');
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            searchByLocationName(event.currentTarget.value);
        }
    };

    return (
        <div className='searchbar'>
            <input className='searchbar__input'
                type="search"
                placeholder="Enter location"
                value={locationName}
                onChange={(event: React.FormEvent<HTMLInputElement>) => setLocationName(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
            ></input>
            <button className='button searchbar__search-button'
                onClick={() => {
                    searchByLocationName(locationName);
                }}
            >
                <img src={searchIcon} 
                    className="comments__option-arrow-down" 
                    alt="magnifing glass icon" 
                    width="20" 
                    height="20"
                ></img>
            </button>
        </div>
    );
};

export default SearchBar;