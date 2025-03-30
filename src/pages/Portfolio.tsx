
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import CategoryFilter from '../components/CategoryFilter';
import ParallaxImage from '../components/ParallaxImage';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const portfolioData: PortfolioItem[] = [
  // Portrait
  {
    id: 1,
    title: "Mountain Portrait",
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    description: "Portrait in nature"
  },
  {
    id: 2,
    title: "Urban Portrait",
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    description: "City portrait session"
  },
  
  // Restaurant
  {
    id: 3,
    title: "Fine Dining",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    description: "Luxury restaurant setup"
  },
  {
    id: 4,
    title: "Culinary Art",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    description: "Food presentation"
  },
  
  // Café
  {
    id: 5,
    title: "Morning Coffee",
    category: "Café",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    description: "Café ambiance"
  },
  {
    id: 6,
    title: "Café Culture",
    category: "Café",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    description: "Social café environment"
  },
  
  // Landscape
  {
    id: 7,
    title: "Mountain Range",
    category: "Landscape",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    description: "Majestic mountain view"
  },
  {
    id: 8,
    title: "Coastal Sunset",
    category: "Landscape",
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
    description: "Sunset by the ocean"
  }
];

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category')?.toLowerCase();
  
  const categories = ["All", "Portrait", "Restaurant", "Café", "Landscape"];
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(portfolioData);

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

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-6">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl uppercase tracking-wider mb-4">Portfolio</h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            A selection of my professional photography work across various categories
          </p>
          <div className="w-16 h-px bg-white/40 mx-auto"></div>
        </AnimatedSection>
        
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={handleCategorySelect} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <AnimatedSection 
              key={item.id} 
              className="card-shine overflow-hidden"
              delay={index * 100}
            >
              <div className="group cursor-pointer">
                <div className="overflow-hidden">
                  <ParallaxImage 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-[400px]"
                  />
                </div>
                <div className="pt-4 pb-6">
                  <h3 className="text-xl uppercase tracking-wider mb-1 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
