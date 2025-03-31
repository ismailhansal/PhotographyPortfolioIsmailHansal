
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../components/AnimatedSection';
import CategoryFilter from '../components/CategoryFilter';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

import ducasse from '@/assets/ducasse.webp'
import burgermobile from '@/assets/mobile/burger-mobile.webp';
import ducassemobile from '@/assets/mobile/ducasse-mobile.webp';
import immomobile from '@/assets/mobile/immo-mobile.webp';
import packomobile from '@/assets/mobile/packo-mobile.webp';
import pizzamobile from '@/assets/mobile/pizza-mobile.webp';


import image05 from '@/assets/tout/culinaire/Image05.webp'
import image06 from '@/assets/tout/culinaire/Image06.webp'
import image07 from '@/assets/tout/culinaire/Image07.webp'
import image08 from '@/assets/tout/culinaire/Image08.webp'
import image09 from '@/assets/tout/culinaire/Image09.webp'
import image10 from '@/assets/tout/culinaire/Image10.webp'
import image11 from '@/assets/tout/culinaire/Image11.webp'
import image26 from '@/assets/tout/culinaire/Image26.webp'
import image27 from '@/assets/tout/culinaire/Image27.webp'
import image28 from '@/assets/tout/culinaire/Image28.webp'
import image29 from '@/assets/tout/culinaire/Image29.webp'
import image30 from '@/assets/tout/culinaire/Image30.webp'


//Restaurant
import image03 from '@/assets/tout/restaurant/Image03.webp'
import image04 from '@/assets/tout/restaurant/Image04.webp'
import image24 from '@/assets/tout/restaurant/Image24.webp'
import image25 from '@/assets/tout/restaurant/Image25.webp'


//Portrait

import image01 from '@/assets/tout/portrait/Image01.webp'
import image02 from '@/assets/tout/portrait/Image02.webp'
import image31 from '@/assets/tout/portrait/Image31.webp'
import image32 from '@/assets/tout/portrait/Image32.webp'
import image33 from '@/assets/tout/portrait/Image33.webp'
import image34 from '@/assets/tout/portrait/Image34.webp'
import image35 from '@/assets/tout/portrait/Image35.webp'
import image36 from '@/assets/tout/portrait/Image36.webp'
import image37 from '@/assets/tout/portrait/Image37.webp'
import image38 from '@/assets/tout/portrait/Image38.webp'
import image39 from '@/assets/tout/portrait/Image39.webp'

//Real-estate

import image12 from '@/assets/tout/real-estate/Image12.webp'
import image13 from '@/assets/tout/real-estate/Image13.webp'
import image14 from '@/assets/tout/real-estate/Image14.webp'
import image15 from '@/assets/tout/real-estate/Image15.webp'
import image16 from '@/assets/tout/real-estate/Image16.webp'
import image17 from '@/assets/tout/real-estate/Image17.webp'
import image18 from '@/assets/tout/real-estate/Image19.webp'
import image19 from '@/assets/tout/real-estate/Image20.webp'
import image20 from '@/assets/tout/real-estate/Image21.webp'
import image21 from '@/assets/tout/real-estate/Image22.webp'
import image22 from '@/assets/tout/real-estate/Image23.webp'














// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
}

const portfolioData: PortfolioItem[] = [
  
  
  // Restaurant


  {
    id: 42,
    title: "Culinary Art",
    category: "Restaurant",
    image: ducasse,
    aspectRatio: "landscape"
  },




  {
    id: 45,
    title: "Culinary Art",
    category: "Restaurant",
    image: image03,
    aspectRatio: "landscape"
  },

  {
    id: 50,
    title: "Culinary Art",
    category: "Restaurant",
    image: image04,
    aspectRatio: "landscape"
  },




  {
    id: 3,
    title: "Fine Dining",
    category: "Restaurant",
    image: ducassemobile,
    aspectRatio: "portrait"
  },


  {
    id: 51,
    title: "Culinary Art",
    category: "Restaurant",
    image: image24
    ,
    aspectRatio: "portrait"
  },
  
  {
    id: 52,
    title: "Culinary Art",
    category: "Restaurant",
    image: image25,
    aspectRatio: "portrait"
  },



  
 
  
  // Culinaire
  {
    id: 5,
    title: "Morning Coffee",
    category: "Culinaire",
    image: burgermobile,
    aspectRatio: "portrait"
  },
  {
    id: 6,
    title: "Café Culture",
    category: "Culinaire",
    image: pizzamobile,
    aspectRatio: "portrait"
  },


  {
    id: 7,
    title: "Culinaire Image 05",
    category: "Culinaire",
    image: image05,
    aspectRatio: "portrait"
  },
  {
    id: 8,
    title: "Culinaire Image 06",
    category: "Culinaire",
    image: image06,
    aspectRatio: "portrait"
  },
  {
    id: 9,
    title: "Culinaire Image 07",
    category: "Culinaire",
    image: image07,
    aspectRatio: "portrait"
  },
  {
    id: 10,
    title: "Culinaire Image 08",
    category: "Culinaire",
    image: image08,
    aspectRatio: "portrait"
  },
  {
    id: 11,
    title: "Culinaire Image 09",
    category: "Culinaire",
    image: image09,
    aspectRatio: "landscape"
  },
  {
    id: 12,
    title: "Culinaire Image 10",
    category: "Culinaire",
    image: image10,
    aspectRatio: "portrait"
  },
  {
    id: 13,
    title: "Culinaire Image 11",
    category: "Culinaire",
    image: image11,
    aspectRatio: "portrait"
  },
  {
    id: 14,
    title: "Culinaire Image 26",
    category: "Culinaire",
    image: image26,
    aspectRatio: "portrait"
  },
  {
    id: 15,
    title: "Culinaire Image 27",
    category: "Culinaire",
    image: image27,
    aspectRatio: "portrait"
  },
  {
    id: 16,
    title: "Culinaire Image 28",
    category: "Culinaire",
    image: image28,
    aspectRatio: "portrait"
  },
  {
    id: 17,
    title: "Culinaire Image 29",
    category: "Culinaire",
    image: image29,
    aspectRatio: "portrait"
  },
  {
    id: 18,
    title: "Culinaire Image 30",
    category: "Culinaire",
    image: image30,
    aspectRatio: "portrait"
  },





// Portrait
  
  
{
  id: 80,
  title: "Mountain Portrait",
  category: "Portrait",
  image: packomobile,
  aspectRatio: "portrait"
},


 {
  id: 19,
  title: "Portrait Image 01",
  category: "Portrait",
  image: image01,
  aspectRatio: "portrait"
},
{
  id: 20,
  title: "Portrait Image 02",
  category: "Portrait",
  image: image02,
  aspectRatio: "portrait"
},
{
  id: 21,
  title: "Portrait Image 31",
  category: "Portrait",
  image: image31,
  aspectRatio: "portrait"
},
{
  id: 22,
  title: "Portrait Image 32",
  category: "Portrait",
  image: image32,
  aspectRatio: "portrait"
},
{
  id: 23,
  title: "Portrait Image 33",
  category: "Portrait",
  image: image33,
  aspectRatio: "portrait"
},
{
  id: 24,
  title: "Portrait Image 34",
  category: "Portrait",
  image: image34,
  aspectRatio: "portrait"
},
{
  id: 25,
  title: "Portrait Image 35",
  category: "Portrait",
  image: image35,
  aspectRatio: "portrait"
},
{
  id: 26,
  title: "Portrait Image 36",
  category: "Portrait",
  image: image36,
  aspectRatio: "portrait"
},
{
  id: 27,
  title: "Portrait Image 37",
  category: "Portrait",
  image: image37,
  aspectRatio: "portrait"
},
{
  id: 28,
  title: "Portrait Image 38",
  category: "Portrait",
  image: image38,
  aspectRatio: "portrait"
},
{
  id: 29,
  title: "Portrait Image 39",
  category: "Portrait",
  image: image39,
  aspectRatio: "portrait"
},










  
  // Real-Estate
  {
    id: 81,
    title: "Mountain Range",
    category: "Real-Estate",
    image: immomobile,
    aspectRatio: "portrait"
  },
  


  {
    id: 30,
    title: "Real Estate Image 12",
    category: "Real-Estate",
    image: image12,
    aspectRatio: "landscape"
  },
  {
    id: 31,
    title: "Real Estate Image 13",
    category: "Real-Estate",
    image: image13,
    aspectRatio: "landscape"
  },
  {
    id: 32,
    title: "Real Estate Image 14",
    category: "Real-Estate",
    image: image14,
    aspectRatio: "portrait"
  },
  {
    id: 33,
    title: "Real Estate Image 15",
    category: "Real-Estate",
    image: image15,
    aspectRatio: "portrait"
  },
  {
    id: 34,
    title: "Real Estate Image 16",
    category: "Real-Estate",
    image: image16,
    aspectRatio: "portrait"
  },
  {
    id: 35,
    title: "Real Estate Image 17",
    category: "Real-Estate",
    image: image17,
    aspectRatio: "landscape"
  },
  {
    id: 36,
    title: "Real Estate Image 18",
    category: "Real-Estate",
    image: image18,
    aspectRatio: "portrait"
  },
  {
    id: 37,
    title: "Real Estate Image 19",
    category: "Real-Estate",
    image: image19,
    aspectRatio: "portrait"
  },
  {
    id: 38,
    title: "Real Estate Image 20",
    category: "Real-Estate",
    image: image20,
    aspectRatio: "portrait"
  },
  {
    id: 39,
    title: "Real Estate Image 21",
    category: "Real-Estate",
    image: image21,
    aspectRatio: "portrait"
  },
  {
    id: 40,
    title: "Real Estate Image 22",
    category: "Real-Estate",
    image: image22,
    aspectRatio: "portrait"
  },



];







const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category')?.toLowerCase();
  
  const categories = useMemo(() => ["All", "Portrait", "Restaurant", "Culinaire", "Real-Estate"], []);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(portfolioData);
  
  // Enhanced image viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Memoize category selection handler to prevent recreating on each render
  const handleCategorySelect = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (categoryParam) {
      const matchedCategory = categories.find(
        cat => cat.toLowerCase() === categoryParam
      );
      
      if (matchedCategory) {
        setActiveCategory(matchedCategory);
      }
    }
  }, [categoryParam, categories]);

  // Memoize filtered items calculation to avoid recalculation on every render
  useEffect(() => {
    // Only update filtered items when category changes
    if (activeCategory === "All") {
      setFilteredItems(portfolioData);
    } else {
      setFilteredItems(
        portfolioData.filter(item => item.category === activeCategory)
      );
    }
    
    // Update URL with category
    if (activeCategory !== "All") {
      setSearchParams({ category: activeCategory.toLowerCase() });
    } else {
      setSearchParams({});
    }
  }, [activeCategory, setSearchParams]);

  // Open the enhanced image carousel viewer
  const openImageViewer = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setViewerOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when viewer is open
  }, []);
  
  // Close the enhanced image carousel viewer
  const closeImageViewer = useCallback(() => {
    setViewerOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-6">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl uppercase tracking-wider mb-4">Portfolio</h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            A selection of my professional photography work
          </p>
          <div className="w-16 h-px bg-white/40 mx-auto"></div>
        </AnimatedSection>
        
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={handleCategorySelect} 
        />
        
        {/* Improved Grid Layout with proper aspect ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-[300px] lg:auto-rows-[350px] grid-flow-dense">
  {filteredItems.map((item, index) => (
    <div 
      key={item.id} 
      className={`group overflow-hidden cursor-pointer transition-all duration-300 hover:z-10 will-change-transform 
        ${item.aspectRatio === 'landscape' ? 'lg:col-span-2' : ''}`}
      onClick={() => openImageViewer(index)}
    >
      <img 
        src={item.image} 
        alt={item.title} 
        loading="lazy"
        className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110 will-change-transform"
      />
    </div>
  ))}
</div>
      </div>
      
      {/* Full-screen Carousel Viewer with Better Visibility */}
      {viewerOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button 
            onClick={closeImageViewer} 
            className="absolute top-6 right-6 z-50 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
            aria-label="Close image viewer"
          >
            <X size={32} />
          </button>
          
          <Carousel className="w-full max-w-7xl">
            <CarouselContent>
              {filteredItems.map((item, index) => (
                <CarouselItem key={item.id}>
                  <div className={`flex items-center justify-center h-[80vh] p-4 ${
                    item.aspectRatio === 'landscape' ? 'max-h-screen' : ''
                  }`}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={`max-h-full ${
                        item.aspectRatio === 'landscape' ? 'w-auto h-auto max-w-full' : 'max-w-full'
                      } object-contain transition-all duration-300`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 md:left-10 bg-white/30 text-white hover:bg-white/60 hover:text-black w-12 h-12 rounded-full">
              <ArrowLeft className="h-8 w-8" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-4 md:right-10 bg-white/30 text-white hover:bg-white/60 hover:text-black w-12 h-12 rounded-full">
              <ArrowRight className="h-8 w-8" />
            </CarouselNext>
          </Carousel>
        </div>
      )}
    </main>
  );
};

export default Portfolio;
