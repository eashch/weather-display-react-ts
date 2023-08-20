import IconBlock from './IconBlock';
import './weather-display.css';
import './time-window-weather-display.css';
import { WeatherTimeWindow } from './Interfaces';
import { getIconAndAltByWeatherID, WeatherParameterIcons } from './Icons';

function TimeWindowWeatherDisplay(props: WeatherTimeWindow): JSX.Element {

    const getTimeHHMM = (timeFull: string) => {
        const dateAndTime = timeFull.split(' ');
        if (dateAndTime.length !== 2)
            return "unknown";
        if (dateAndTime[1].length !== 8)
            return "unknown";
        return dateAndTime[1].slice(0, 5);
    }

    const getShowParameter = (param: number | undefined) => {
        if (param === undefined)
            return "missing";
        return param.toString();
    }

    const iconAndAlt = getIconAndAltByWeatherID(props.weather[0].id);

    return (
        <div className="time-window-weather">
            <p className="text time-window-weather__time">
                {getTimeHHMM(props.dt_txt)}
            </p>
            <p className="text time-window-weather__temperature">
                {Math.round(props.main.temp).toString() + "°C"}
            </p>
            <IconBlock
                iconPath={iconAndAlt[0]}
                description={iconAndAlt[1]}
                value={props.weather[0].main}
                sizepx={60}
            />
            <div className='additional-parameters-block'>
                <IconBlock
                    iconPath={WeatherParameterIcons.humidity}
                    description="Humidity"
                    value={getShowParameter(props.main.humidity) + "%"}
                    sizepx={20}
                />
                <IconBlock 
                    iconPath={WeatherParameterIcons.pressure}
                    description="Pressure"
                    value={getShowParameter(props.main.pressure) + " hPa"}
                    sizepx={20}
                />
                <IconBlock
                    iconPath={WeatherParameterIcons.windSpeed}
                    description="Wind speed"
                    value={getShowParameter(props.wind.speed) + " m/s"}
                    sizepx={20}
                />
            </div>
        </div>
    );
};

export default TimeWindowWeatherDisplay;