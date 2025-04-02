
import { lazy, Suspense, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PopupButton from '@/components/PopupButton';
import Preloader from '@/components/Preloader';
import gsap from "gsap";

// More efficient lazy loading with appropriate chunks and prefetching
const Home = lazy(() => {
  // Start preloading Home component assets
  const prefetch = import(/* webpackChunkName: "home" */ "./pages/Home");
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      // Prefetch images used on the Home page
      [
        '/assets/cabestan.webp',
        '/assets/ciel.webp', 
        '/assets/ducasse.webp'
      ].forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      });
    }
  };
  return prefetch;
});

// Optimize other page loads with hints
const Portfolio = lazy(() => import(/* webpackChunkName: "portfolio", webpackPrefetch: true */ "./pages/Portfolio"));
const About = lazy(() => import(/* webpackChunkName: "about" */ "./pages/About"));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ "./pages/Contact"));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ "./pages/NotFound"));

// Create a minimal loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-dark">
    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Configure queryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes to reduce refetches
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection time
      retry: 1, // Limit retries
    },
  },
});

// Optimized route-based code splitting component
const LazyRouteLoader = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Intelligently preload routes based on current location
    const currentPath = location.pathname;
    
    // Use requestIdleCallback for preloading to avoid blocking main thread
    if ('requestIdleCallback' in window) {
      // Immediately preload current route
      if (currentPath === '/' || currentPath === '') {
        import("./pages/Home");
      } else if (currentPath.includes('/portfolio')) {
        import("./pages/Portfolio");
      } else if (currentPath.includes('/about')) {
        import("./pages/About");
      } else if (currentPath.includes('/contact')) {
        import("./pages/Contact");
      }
      
      // Preload likely next routes during idle time
      window.requestIdleCallback(() => {
        // If on home, preload portfolio
        if (currentPath === '/' || currentPath === '') {
          import("./pages/Portfolio");
        }
        // If on portfolio, preload about
        else if (currentPath.includes('/portfolio')) {
          import("./pages/About");
        }
        // If on about, preload contact
        else if (currentPath.includes('/about')) {
          import("./pages/Contact");
        }
      }, { timeout: 2000 });
    }
  }, [location]);
  
  return null;
};

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Optimize GSAP config
    gsap.config({
      nullTargetWarn: false,
      autoSleep: 60,
      force3D: true
    });
    
    // Use shorter delay for faster app initialization
    setTimeout(() => {
      setAppReady(true);
    }, 800);
    
    return () => {
      // Clean up any GSAP animations
      gsap.killTweensOf(window);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        <Preloader />
        
        <BrowserRouter>
          <LazyRouteLoader />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <PopupButton />
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
