import ReactGA from 'react-ga4';
import { Location } from 'react-router-dom';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn('⚠️  VITE_GA_MEASUREMENT_ID is not set. Analytics disabled.');
    }
    return;
  }

  ReactGA.initialize(GA_MEASUREMENT_ID);
}

export function trackPageView(location: Location) {
  if (!GA_MEASUREMENT_ID) return;

  ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
} 