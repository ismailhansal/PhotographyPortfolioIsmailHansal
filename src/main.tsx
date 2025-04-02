
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance metrics logging
if (process.env.NODE_ENV === 'development') {
  const reportWebVitals = (metric: any) => {
    console.log(metric);
  };
  
  // @ts-ignore - Import web vitals only in development
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  });
}

// Optimize initial render
const container = document.getElementById("root");
if (!container) throw new Error('Root element not found');

// Use createRoot instead of ReactDOM.render
const root = createRoot(container);

// Render function that can be deferred
const renderApp = () => {
  root.render(<App />);
};

// If the browser is not busy, render immediately
if (
  // @ts-ignore - Check for requestIdleCallback compatibility
  'requestIdleCallback' in window && 
  document.readyState !== 'complete'
) {
  // Prioritize rendering after the page has loaded
  window.addEventListener('load', () => {
    // @ts-ignore - TypeScript doesn't recognize requestIdleCallback
    window.requestIdleCallback(renderApp, { timeout: 2000 });
  });
} else {
  // Render directly for browsers without idle callback
  renderApp();
}
