
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance-optimized loading sequence
const container = document.getElementById("root");
if (!container) throw new Error('Root element not found');

// Create root once
const root = createRoot(container);

// Define a function to start hydration when ready
const startHydration = () => {
  root.render(<App />);
  
  // Log core web vitals only in development
  if (process.env.NODE_ENV === 'development') {
    // Dynamically import web-vitals only when needed
    import('web-vitals').then((webVitals) => {
      const reportWebVitals = (metric: any) => {
        console.log(metric);
      };
      
      // Use proper method calls based on the actual exports
      webVitals.onCLS(reportWebVitals);
      webVitals.onFID(reportWebVitals);
      webVitals.onFCP(reportWebVitals);
      webVitals.onLCP(reportWebVitals);
      webVitals.onTTFB(reportWebVitals);
    });
  }
};

// Optimize initial render timing
if (document.readyState === 'loading') {
  // Wait for the document to be ready
  document.addEventListener('DOMContentLoaded', () => {
    // If requestIdleCallback is available, use it for non-critical rendering
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(startHydration, { timeout: 1000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(startHydration, 0);
    }
  });
} else {
  // Document already loaded, render immediately
  startHydration();
}
