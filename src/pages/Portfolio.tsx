
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../components/AnimatedSection';
import CategoryFilter from '../components/CategoryFilter';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

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
  // Portrait
  {
    id: 1,
    title: "Mountain Portrait",
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    aspectRatio: "portrait"
  },
  {
    id: 2,
    title: "Urban Portrait",
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    aspectRatio: "landscape"
  },
  
  // Restaurant
  {
    id: 3,
    title: "Fine Dining",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    aspectRatio: "landscape"
  },
  {
    id: 4,
    title: "Culinary Art",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    aspectRatio: "portrait"
  },
  
  // Café
  {
    id: 5,
    title: "Morning Coffee",
    category: "Café",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    aspectRatio: "landscape"
  },
  {
    id: 6,
    title: "Café Culture",
    category: "Café",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    aspectRatio: "portrait"
  },
  
  // Landscape
  {
    id: 7,
    title: "Mountain Range",
    category: "Landscape",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    aspectRatio: "landscape"
  },
  {
    id: 8,
    title: "Coastal Sunset",
    category: "Landscape",
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
    aspectRatio: "landscape"
  }
];

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category')?.toLowerCase();
  
  const categories = ["All", "Portrait", "Restaurant", "Café", "Landscape"];
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(portfolioData);
  
  // Enhanced image viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
  }, [categoryParam]);

  useEffect(() => {
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
  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
    setViewerOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when viewer is open
  };
  
  // Close the enhanced image carousel viewer
  const closeImageViewer = () => {
    setViewerOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

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
          onSelectCategory={setActiveCategory} 
        />
        
        {/* Clean Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 ${
                item.aspectRatio === 'portrait' ? 'masonry-item-tall' : ''
              } ${
                item.aspectRatio === 'landscape' ? 'sm:col-span-2' : ''
              } ${
                index % 3 === 0 ? 'sm:col-span-2' : index % 5 === 0 ? 'masonry-item-tall' : ''
              }`}
              onClick={() => openImageViewer(index)}
            >
              <div className="h-full w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Full-screen Carousel Viewer with Improved Arrow Visibility */}
      {viewerOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button 
            onClick={closeImageViewer} 
            className="absolute top-6 right-6 z-50 text-white hover:text-gray-300 transition-colors"
            aria-label="Close image viewer"
          >
            <X size={32} />
          </button>
          
          <Carousel className="w-full max-w-6xl">
            <CarouselContent>
              {filteredItems.map((item, index) => (
                <CarouselItem key={item.id}>
                  <div className="flex items-center justify-center h-[80vh] p-1">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/20 text-white left-4 hover:bg-white/40" size="lg">
              <ArrowLeft className="h-8 w-8" />
            </CarouselPrevious>
            <CarouselNext className="bg-white/20 text-white right-4 hover:bg-white/40" size="lg">
              <ArrowRight className="h-8 w-8" />
            </CarouselNext>
          </Carousel>
        </div>
      )}
    </main>
  );
};

export default Portfolio;
