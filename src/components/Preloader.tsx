
import { useEffect, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onLoadingComplete?: () => void;
}

const Preloader = ({ onLoadingComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress 
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(timer);
          
          // Create exit animation
          const tl = gsap.timeline({
            onComplete: () => {
              if (onLoadingComplete) {
                onLoadingComplete();
              }
            }
          });
          
          tl.to(".preloader-content", {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut"
          })
          .to(".preloader", {
            y: "-100%",
            duration: 0.8,
            ease: "power3.inOut"
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="preloader fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center">
      <div className="preloader-content flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-light mb-8 tracking-wider uppercase">
          ISMAIL HANSAL
        </h1>
        <div className="w-72 md:w-96 h-px bg-white/20 mb-2 relative overflow-hidden">
          <div 
            className="h-full bg-white" 
            style={{ 
              width: `${progress}%`, 
              transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          ></div>
        </div>
        <p className="text-sm uppercase tracking-widest">{progress.toFixed(0)}%</p>
      </div>
    </div>
  );
};

export default Preloader;
