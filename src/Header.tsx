import SearchBar from './SearchBar';
import './weather-display.css';
import './header.css';
import locationIcon from './header-icons/header__location-icon.svg';

export interface HeaderInfo {
    location: string;
    isCurrentWeather: boolean;
    onTypeChanged: (isCurrentWeather: boolean) => void;
    getWeatherForArbitraryLocation: (location: string) => void;
    getWeatherForCurrentLocation: () => void;
}

function Header(props: HeaderInfo): JSX.Element {
    return (
        <div className='header'>
            <h1 className='text title'>
                Weather now
            </h1>
            <div className='header-container'>
                <p className='text text_regular header-container__location-text'>
                    {props.location}
                </p>
                <SearchBar 
                    getWeatherForArbitraryLocation={props.getWeatherForArbitraryLocation}
                />
                <button className='button header-container__use-current-location-button'
                    onClick={(event) => { props.getWeatherForCurrentLocation() }}
                >
                    <img src={locationIcon} className="comments__option-arrow-down" alt="pin icon" width="20" height="20"></img>
                </button>
                <div className='forecast-duration'>
                    <button className={'forecast-duration__switcher' 
                            + (props.isCurrentWeather ? '' : ' forecast-duration__switcher_inactive')
                        }
                        onClick={(event) => { props.onTypeChanged(true) }}
                    >
                        now
                    </button>
                    <button className={'forecast-duration__switcher'
                            + (props.isCurrentWeather ? ' forecast-duration__switcher_inactive' : '')
                        }
                        onClick={(event) => { props.onTypeChanged(false) }}
                    >
                        5 days
                    </button>
                </div>
            </div>            
        </div>
    );
};

export default Header;