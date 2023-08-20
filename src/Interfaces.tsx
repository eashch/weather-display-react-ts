export interface WeatherDescription {
    id: number,
    main: string,
    description: string,
    icon: string
}

export interface WeatherMain {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
}

export interface WeatherWind {
    speed: number,
    deg: number,
    gust: number
}

export interface WeatherCurrent {
    weather: WeatherDescription[],
    main: WeatherMain,
    visibility: number,
    wind: WeatherWind,
    dt: number,
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    name: string
}

export interface WeatherTimeWindow {
    dt: number,
    main: WeatherMain,
    weather: WeatherDescription[],
    wind: WeatherWind,
    dt_txt: string
}

export interface WeatherFiveDays {
    cnt: number,
    list: WeatherTimeWindow[],
    city: {
        name: string,
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        sunrise: number,
        sunset: number
    }
}

export interface LocationByName {
    name: string,
    lat: number,
    lon: number,
    country: string,
    state: string
};

export type WeatherCurrentOrNull = WeatherCurrent | null;
export type WeatherFiveDaysOrNull = WeatherFiveDays | null;