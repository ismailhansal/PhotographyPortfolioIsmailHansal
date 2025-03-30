
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../components/AnimatedSection';
import CategoryFilter from '../components/CategoryFilter';
import ImageViewer from '../components/ImageViewer';

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
  
  // Image viewer state
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
    
    return () => {
      scrollTrigger.kill();
    };
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

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };
  
  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
    setViewerOpen(true);
  };
  
  const closeImageViewer = () => {
    setViewerOpen(false);
  };
  
  // Prepare images for the viewer
  const viewerImages = filteredItems.map(item => ({
    id: item.id,
    src: item.image,
    alt: item.title
  }));

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
        
        {/* Dynamic Masonry Layout */}
        <div className="masonry-grid">
          {filteredItems.map((item, index) => (
            <AnimatedSection 
              key={item.id} 
              className={`masonry-item ${item.aspectRatio === 'portrait' ? 'row-span-2' : ''} 
                          overflow-hidden cursor-pointer hover:z-10 transition-all duration-300`}
              delay={index * 100}
            >
              <div 
                className="group transform transition-all duration-500 hover:scale-[1.02]"
                onClick={() => openImageViewer(index)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className={`w-full transition-all duration-700 ease-out 
                               group-hover:scale-105 ${item.aspectRatio === 'portrait' ? 'h-[500px]' : 'h-[300px]'} 
                               object-cover`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-lg uppercase tracking-wider font-light">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      
      {/* Full-screen Image Viewer */}
      <ImageViewer 
        images={viewerImages}
        initialIndex={selectedImageIndex}
        isOpen={viewerOpen}
        onClose={closeImageViewer}
      />
    </main>
  );
};

export default Portfolio;
