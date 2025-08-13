// Program to fetch weather by city
import axios from 'axios'

const API_BASE = 'https://api.openweathermap.org/data/2.5/weather'

export const fetchWeatherByCity = async (city)=>{
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  if(!apiKey){
    if(import.meta.env.DEV){
      // eslint-disable-next-line no-console
      console.warn('[weather] Missing VITE_OPENWEATHER_API_KEY')
    }
    return { ok:false, error:'Missing VITE_OPENWEATHER_API_KEY' }
  }
  try{
    const { data } = await axios.get(API_BASE, {
      params: {
        q: `${city},IN`,
        appid: apiKey,
        units: 'metric'
      }
    })
    const weather = {
      tempC: Math.round(data.main?.temp ?? 0),
      condition: data.weather?.[0]?.main || 'NA',
      icon: data.weather?.[0]?.icon || '',
      windKph: Math.round((data.wind?.speed || 0) * 3.6),
      humidity: data.main?.humidity ?? null
    }
    return { ok:true, weather }
  }catch(err){
    const message = err?.response?.data?.message || err.message
    if(import.meta.env.DEV){
      // eslint-disable-next-line no-console
      console.warn('[weather] Fetch failed for', city, message)
    }
    return { ok:false, error: message }
  }
}

export const generateDummyWeather = (city)=>{
  const conditions = ['Clear', 'Clouds', 'Haze', 'Mist', 'Rain', 'Drizzle']
  let hash = 0
  for(let i=0; i<city.length; i++) hash = (hash * 31 + city.charCodeAt(i)) >>> 0
  const tempC = 22 + (hash % 15) // 22..36
  const condition = conditions[hash % conditions.length]
  return { tempC, condition, icon: '' }
}

