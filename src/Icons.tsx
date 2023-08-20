import iconClearDay from './weather-icons/clear-day.svg'
import iconThunderstorm from './weather-icons/thunderstorms.svg'
import iconDrizzle from './weather-icons/rainy-1-day.svg'
import iconRain from './weather-icons/rainy-3-day.svg'
import iconSnow from './weather-icons/snowy-1-day.svg'
import iconMist from './weather-icons/fog-day.svg'
import iconClouds from './weather-icons/cloudy-1-day.svg'

import iconHumidity from './weather-parameters-icons/weather-parameter-humidity.svg'
import iconPressure from './weather-parameters-icons/weather-parameter-pressure.svg'
import iconWind from './weather-parameters-icons/weather-parameter-wind.svg'
import iconSunrise from './weather-parameters-icons/weather-parameter-sunrise.svg'
import iconSunset from './weather-parameters-icons/weather-parameter-sunset.svg'

export function getIconAndAltByWeatherID(id: number): string[] {
    if (id < 100)
        return ['', 'missing'];
    const idGroup = parseInt(id.toString()[0]);
    if (id === 800) {
        return [iconClearDay, 'clear sky'];
    } else {
        switch(idGroup) {
            case 2:
                return [iconThunderstorm, 'thunderstorm'];
            case 3:
                return [iconDrizzle, 'drizzle'];
            case 5:
                return [iconRain, 'rain'];
            case 6:
                return [iconSnow, 'snow'];
            case 7:
                return [iconMist, 'mist'];
            case 8:
                return [iconClouds, 'clouds'];
        };
    }
    return ['', 'missing'];
}

export enum WeatherParameter {
    Humidity,
    Pressure,
    WindSpeed,
    Sunrise,
    Sunset,
};

export class WeatherParameterIcons {
    static readonly humidity: string = iconHumidity;
    static readonly pressure: string = iconPressure;
    static readonly windSpeed: string = iconWind;
    static readonly sunrise: string = iconSunrise;
    static readonly sunset: string = iconSunset;
};