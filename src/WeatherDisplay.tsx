import Header from './Header';
import React, { useState, useEffect } from 'react'
import { WeatherCurrentOrNull, WeatherCurrent, WeatherFiveDaysOrNull, WeatherFiveDays, LocationByName } from './Interfaces';
import FiveDayForecastDisplay from './FiveDayForecastDisplay';
import StartScreen from './StartScreen';
import CurrentWeatherDisplay from './CurrentWeatherDisplay';

function WeatherDisplay(): JSX.Element {
    const apiKey = `ffc1cf898454b5a6336762c7c1ddd99d`;
    const [isCurrentWeather, setIsCurrentWeather] = useState<boolean>(true);
    const [location, setLocation] = useState<string>("Location unknown");
    const [weatherCurrent, setWeatherCurrent] = useState<WeatherCurrentOrNull>(null);
    const [weatherFiveDays, setWeatherFiveDays] = useState<WeatherFiveDaysOrNull>(null);
    const [locationName, setLocationName] = useState<string>("");
    const [isCurrentLocation, setIsCurrentLocation] = useState<boolean>(true);

    const requestWeatherFiveDays = (latitude: number, longitude: number): void => {
        apiCall(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
            (result: any): void => {
                var parsedResult = result as WeatherFiveDays;
                setWeatherFiveDays(parsedResult);
            }
        );
    }

    const requestWeatherCurrent = (latitude: number, longitude: number, updateLocationName: boolean = true): void => {
        apiCall(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
            (result: any): void => {
                var parsedResult = result as WeatherCurrent;
                setWeatherCurrent(parsedResult);
                if (updateLocationName) {
                    setLocationName(parsedResult.name 
                        + ", " + parsedResult.sys.country);
                }
            }
        );
    }

    const apiCall = (linkStr: string, 
                    onFetch: (result: any) => void): void => {
        fetch(linkStr)
            .then(response => response.json())
            .then(result => {
                onFetch(result);
            });
    }

    const getWeatherForCurrentLocation = (): void => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                requestWeatherFiveDays(position.coords.latitude,
                    position.coords.longitude);
                requestWeatherCurrent(position.coords.latitude, 
                    position.coords.longitude);
                setIsCurrentLocation(true);
            }, () => {
                setLocation("Couldn't retrieve location");
            });
        } else {
            setLocation("Geolocation is not supported.");
        }
    }

    const getWeatherForArbitraryLocation = (locationName: string): void => {
        let location = locationName.trim();
        if (location === "") {
            return;
        }
        apiCall(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`,
            (result: any): void => {
                if (result === undefined 
                        || result.length === 0) {
                    setLocation(`Invalid location`);
                    return;
                }
                const parsedResult = result[0] as LocationByName;
                const fullName = parsedResult.name + ", " + parsedResult.country;
                if (locationName === fullName)
                    return;
                setIsCurrentLocation(false);
                requestWeatherFiveDays(parsedResult.lat,
                    parsedResult.lon);
                requestWeatherCurrent(parsedResult.lat,
                    parsedResult.lon, false);
                setLocationName(fullName);
            }
        );
    }

    const setWeatherDisplay = () => {
        if ((isCurrentWeather && !weatherCurrent) 
            || (!isCurrentWeather && !weatherFiveDays)) {
            return <StartScreen 
                displayStr = {'Where are you?..'}
            />;
        } else if (isCurrentWeather && weatherCurrent) {
            return <CurrentWeatherDisplay 
                {...weatherCurrent}
            />;
        } else if (!isCurrentWeather && weatherFiveDays) {
            return <FiveDayForecastDisplay 
                {...weatherFiveDays}
            />;
        }
    }

    const setValidLocation = (isCurrentWeather: boolean, isCurrentLocation: boolean, locationName: string) => {
        setLocation(`${isCurrentWeather ? "Now" : "5 days"}. ${isCurrentLocation ? "Current location." : ""} ${locationName}`);
    };
    
    useEffect(() => {
        getWeatherForCurrentLocation();
    }, [])

    useEffect(() => {
        if (locationName)
            setValidLocation(isCurrentWeather, isCurrentLocation, locationName);
    }, [locationName])

    return (
        <div className='weather-display'>
            <Header
                location={location}
                isCurrentWeather={isCurrentWeather}
                onTypeChanged={(isCurrentWeather: boolean) => {
                    setIsCurrentWeather(isCurrentWeather);
                    setValidLocation(isCurrentWeather, isCurrentLocation, locationName);
                    //setLocation(`${isCurrentWeather ? "Now" : "5 days"}. ${isCurrentLocation ? "Current location." : ""} ${locationName}`);
                }}
                getWeatherForArbitraryLocation={getWeatherForArbitraryLocation}
                getWeatherForCurrentLocation={getWeatherForCurrentLocation}
            />
            <div className='days-container'>
                {setWeatherDisplay()}
            </div>
        </div>
    );
}

export default WeatherDisplay;