import { WeatherFiveDays } from './Interfaces';
import TimeWindowWeatherDisplay from './TimeWindowWeatherDisplay';
import './weather-display.css';
import './five-days-display.css';
import StartScreen from './StartScreen';

function FiveDayForecastDisplay(weatherFiveDays: WeatherFiveDays): JSX.Element {
    if (!weatherFiveDays.list
        || weatherFiveDays.list.length === 0
        || !weatherFiveDays.city)
        return (
            <StartScreen
                displayStr='Wrong data from server!'
            />
        );

    const createTimeWindowDisplays = (weatherFiveDays: WeatherFiveDays): JSX.Element[] => {
        let timeWindows: JSX.Element[] = new Array<JSX.Element>;
        weatherFiveDays.list.forEach((item) => {
            if (item.dt_txt !== undefined 
                    && item.dt_txt.split(' ')[1] === '00:00:00') {
                timeWindows.push(
                    <div className='date-display' 
                        key={item.dt + 1}
                    >
                        <p>
                            {item.dt_txt.split(' ')[0]
                                        .split('-')
                                        .reverse()
                                        .join('.')}
                        </p>
                    </div>
                );
            }
            if (item.main 
                    && item.weather 
                    && item.wind
                    && item.weather.length > 0) {
                timeWindows.push(
                    <TimeWindowWeatherDisplay
                        key={item.dt} 
                        {...item}
                    />
                );
            }
        });
        return timeWindows;
    }

    return (
        <div className='five-days-display'>
            <div className='five-days-container'>
                {createTimeWindowDisplays(weatherFiveDays)}
            </div>
        </div>
    );
};

export default FiveDayForecastDisplay;