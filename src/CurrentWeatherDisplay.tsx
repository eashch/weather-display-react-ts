import IconBlock from './IconBlock';
import './weather-display.css';
import './current-weather-display.css';
import backMissing from './backgrounds/background-space.jpg'
import backThunderstorm from './backgrounds/background-thunder.jpg'
import backClouds from './backgrounds/background-rain-clouds.jpg'
import backRain from './backgrounds/background-rain.jpg'
import backSnow from './backgrounds/background-snow.jpg'
import backClearSky from './backgrounds/background-clear-sky.jpg'
import backMist from './backgrounds/background-mist.jpg'
import { WeatherCurrent } from './Interfaces';
import { WeatherParameterIcons, getIconAndAltByWeatherID } from './Icons';
import StartScreen from './StartScreen';


function CurrentWeatherDisplay(props: WeatherCurrent): JSX.Element {
    if (!props.main 
            || !props.sys 
            || !props.weather 
            || props.weather.length === 0)
        return (
            <StartScreen 
                displayStr='Wrong data from server!'
            />
        );

    const iconSizeSecondary = 40;

    const getShowParameter = (param: number | undefined): string => {
        if (param === undefined)
            return "missing";
        return param.toString();
    }

    const getHHMMFromTimestamp = (timestamp: number | undefined): string => {
        if (timestamp === undefined)
            return "missing";
        const date = new Date((timestamp) * 1000);
        let minutes = date.getMinutes().toString();
        minutes = minutes.length === 1 
            ? ("0" + minutes) : minutes;
        return (date.getHours().toString() 
            + ':' + minutes + "(UTC)");
    }

    const getBackgroundByWeatherID = (id: number): string => {
        if (id < 100)
            return backMissing;
        const idGroup = parseInt(id.toString()[0]);
        if (id === 800) {
            return backClearSky;
        } else {
            switch (idGroup) {
                case 2:
                    return backThunderstorm;
                case 3:
                    return backRain;
                case 5:
                    return backRain;
                case 6:
                    return backSnow;
                case 7:
                    return backMist;
                case 8:
                    return backClouds;
            };
        }
        return backMissing;
    }

    const iconAndAlt = getIconAndAltByWeatherID(props.weather[0].id);

    return (
        <div className="current-weather-display"
            style={{ backgroundImage: `url(${getBackgroundByWeatherID(props.weather[0].id)})` }}
        >
            <div className='current-weather-block'>
                <div className='main-parameters-block'>
                    <p className="text main-parameters-block__temperature">
                        {Math.round(props.main.temp).toString() + "°C"}
                    </p>
                    <IconBlock
                        iconPath={iconAndAlt[0]}
                        description={iconAndAlt[1]}
                        value={props.weather[0].main}
                        sizepx={80}
                    />
                </div>
                <div className='secondary-parameters-block'>
                    <IconBlock
                        iconPath={WeatherParameterIcons.humidity}
                        description="Humidity"
                        value={getShowParameter(props.main.humidity) + "%"}
                        sizepx={iconSizeSecondary}
                    />
                    <IconBlock
                        iconPath={WeatherParameterIcons.pressure}
                        description="Pressure"
                        value={getShowParameter(props.main.pressure) + " hPa"}
                        sizepx={iconSizeSecondary}
                    />
                    <IconBlock
                        iconPath={WeatherParameterIcons.windSpeed}
                        description="Wind speed"
                        value={getShowParameter(props.wind.speed) + " m/s"}
                        sizepx={iconSizeSecondary}
                    />
                </div>
                <div className='secondary-parameters-block'>
                    <IconBlock
                        iconPath={WeatherParameterIcons.sunrise}
                        description="Sunrise"
                        value={getHHMMFromTimestamp(props.sys.sunrise)}
                        sizepx={iconSizeSecondary}
                    />
                    <IconBlock
                        iconPath={WeatherParameterIcons.sunset}
                        description="Sunset"
                        value={getHHMMFromTimestamp(props.sys.sunset)}
                        sizepx={iconSizeSecondary}
                    />
                </div>
            </div>
        </div>
    );
};

export default CurrentWeatherDisplay;