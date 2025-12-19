
import { WeatherData, PredictionResult } from '../types';

export const predictDelay = (weather: WeatherData, isTrafficDelayed: boolean = false): PredictionResult => {
  let delayHours = 0;
  let confidence = 95;
  let reason = 'Optimal conditions for delivery.';

  // Traffic takes precedence in this rule-based engine if explicitly flagged
  if (isTrafficDelayed) {
    return {
      delayHours: 8,
      confidence: 90,
      reason: 'Heavy traffic congestion detected along the main transit highway.'
    };
  }

  switch (weather.condition) {
    case 'Thunderstorm':
      delayHours = 24;
      confidence = 88;
      reason = 'Severe thunderstorm activity detected in the transit path.';
      break;
    case 'Rain':
    case 'Drizzle':
      delayHours = 12;
      confidence = 92;
      reason = 'Moderate rain may slow down road transport transit.';
      break;
    case 'Clouds':
      delayHours = 4;
      confidence = 94;
      reason = 'High cloud cover might slightly affect logistics scheduling.';
      break;
    case 'Clear':
    default:
      delayHours = 0;
      confidence = 98;
      reason = 'Clear weather detected. On-time delivery expected.';
      break;
  }

  return { delayHours, confidence, reason };
};
