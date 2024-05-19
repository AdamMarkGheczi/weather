export interface City {
    name: string,
    region: string,
    country: string,
    id: number
}

export interface SearchInfo {
    id: number,
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    url: string    
}

interface SnapshotWeatherData {
    temp_c: number, 
    feelslike_c: number,
    condition: {
        text: string,
        icon: string,
    },

    humidity: number,
    wind_kph: number,
    wind_dir: string,
    precip_mm: number,
    uv: number
}

export interface CurrentWeather extends SnapshotWeatherData {
    last_updated: string
}

export interface HourWeather extends SnapshotWeatherData {
    time: string,
    chance_of_rain: number,
    chance_of_snow: number
}

export interface DailyAverage {
    avgtemp_c: number,
    daily_chance_of_rain: number,
    daily_chance_of_snow: number,
    totalprecip_mm: number,
    totalsnow_cm: number,
    avghumidity: number,
    maxwind_kph: number,
    condition: {
        text: string,
        icon: string,
    },
    uv: number
}

export interface DailyAverageWithDate extends DailyAverage{
    date: string
}

export interface LargeApiReturnObject {
    location: {
        name: string,
        region: string,
        country: string
    },
    current: CurrentWeather,
    forecast: {
        forecastday: {
            date: string,
            day: DailyAverage
            hour: HourWeather[]
        }[]
    }
}

export interface ServiceReturnObject {
    location: string,
    current: CurrentWeather,
    forecast: {
        day: DailyAverageWithDate,
        hour: HourWeather[]
    }[]
}

export interface ApiErrorObject {
    error: {
        code: number,
        message: string
    }
}
