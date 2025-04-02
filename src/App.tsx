
import { useEffect, lazy, Suspense, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PopupButton from '@/components/PopupButton';
import Preloader from '@/components/Preloader';
import gsap from "gsap";

// Lazy load the pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-dark">
    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Configure queryClient with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Optimize GSAP config for better performance
    gsap.config({
      nullTargetWarn: false,
      autoSleep: 60,
      force3D: true
    });
    
    // Start preloading the pages when idle
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        import("./pages/Portfolio");
        import("./pages/About");
        import("./pages/Contact");
      });
    }
    
    // Simulate app initialization delay
    setTimeout(() => {
      setAppReady(true);
    }, 1500);
    
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
