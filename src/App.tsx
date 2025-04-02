
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

// More efficient lazy loading with appropriate chunks
const Home = lazy(() => import(/* webpackChunkName: "home" */ "./pages/Home"));
const Portfolio = lazy(() => import(/* webpackChunkName: "portfolio" */ "./pages/Portfolio"));
const About = lazy(() => import(/* webpackChunkName: "about" */ "./pages/About"));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ "./pages/Contact"));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ "./pages/NotFound"));

// Create loading fallback with reduced motion
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
      staleTime: 10 * 60 * 1000, // 10 minutes to reduce refetches
      gcTime: 15 * 60 * 1000, // 15 minutes garbage collection time
      retry: 1, // Limit retries to improve perceived performance
    },
  },
});

// Route-based code splitting component
const LazyRouteLoader = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Prioritize loading the current route's chunk first
    const currentPath = location.pathname;
    
    // Preload current route immediately
    if (currentPath === '/' || currentPath === '') {
      import("./pages/Home");
    } else if (currentPath.includes('/portfolio')) {
      import("./pages/Portfolio");
    } else if (currentPath.includes('/about')) {
      import("./pages/About");
    } else if (currentPath.includes('/contact')) {
      import("./pages/Contact");
    }
    
    // Then lazily preload other routes when idle
    if ('requestIdleCallback' in window) {
      const idleCallback = window.requestIdleCallback(() => {
        if (currentPath !== '/' && currentPath !== '') import("./pages/Home");
        if (!currentPath.includes('/portfolio')) import("./pages/Portfolio");
        if (!currentPath.includes('/about')) import("./pages/About");
        if (!currentPath.includes('/contact')) import("./pages/Contact");
      }, { timeout: 2000 });
      
      return () => {
        if ('cancelIdleCallback' in window) {
          window.cancelIdleCallback(idleCallback);
        }
      };
    }
  }, [location]);
  
  return null;
};

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Optimize GSAP config for better performance
    gsap.config({
      nullTargetWarn: false,
      autoSleep: 60,
      force3D: true
    });
    
    // Use setTimeout with a shorter delay for faster app initialization
    setTimeout(() => {
      setAppReady(true);
    }, 1000);
    
    return () => {
      gsap.killTweensOf(window);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {/* Show preloader until app is ready */}
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
