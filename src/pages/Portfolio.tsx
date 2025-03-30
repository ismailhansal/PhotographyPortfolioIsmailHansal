
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
    
    // Initialize scroll animations
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    });
    
    // Set up masonry animations
    gsap.set(".masonry-item", { y: 100, opacity: 0 });
    
    const items = document.querySelectorAll(".masonry-item");
    items.forEach((item, index) => {
      gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      });
    });
    
    return () => {
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [categoryParam, filteredItems]);

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
        
        {/* Dynamic Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`masonry-item 
                ${item.aspectRatio === 'portrait' ? 'masonry-item-tall' : ''} 
                ${item.aspectRatio === 'landscape' ? 'sm:col-span-2' : ''}
                relative group overflow-hidden cursor-pointer transform transition-all duration-500 hover:z-10 ${
                  index % 3 === 0 ? 'sm:col-span-2' : index % 5 === 0 ? 'masonry-item-tall' : ''
                }`}
              onClick={() => openImageViewer(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 z-10">
                <h3 className="text-white text-lg font-light tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
              </div>
              <div className="h-full w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="h-full w-full object-cover transition-all duration-700 ease-out transform group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Full-screen Enhanced Carousel Viewer */}
      {viewerOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button 
            onClick={closeImageViewer} 
            className="absolute top-6 right-6 z-50 text-white hover:text-gray-300 transition-colors"
            aria-label="Close image viewer"
          >
            <X size={32} />
          </button>
          
          <Carousel className="w-full max-w-6xl px-8">
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
            <CarouselPrevious className="lg:-left-20 left-4" variant="outline" size="lg">
              <ArrowLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="lg:-right-20 right-4" variant="outline" size="lg">
              <ArrowRight className="h-6 w-6" />
            </CarouselNext>
          </Carousel>
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <div className="flex space-x-2">
              {filteredItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === selectedImageIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Portfolio;
