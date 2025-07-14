import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react'
import { useState, useEffect } from 'react'

const WeatherWidget = ({ location }) => {
  const [weather, setWeather] = useState({
    temperature: 24,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    description: 'Partly cloudy'
  })

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return Sun
      case 'cloudy': return Cloud
      case 'rainy': return CloudRain
      default: return Sun
    }
  }

  const Icon = getWeatherIcon(weather.condition)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Weather in {location}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{weather.temperature}°C</div>
            <div className="text-sm text-muted-foreground">{weather.description}</div>
          </div>
          <Icon className="h-8 w-8 text-yellow-500" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-3 w-3" />
            <span>Wind: {weather.windSpeed} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherWidget