
import { memo } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface SkeletonGalleryProps {
  itemCount?: number;
}

// Create a single skeleton item component for better memoization
const SkeletonItem = memo(({ index, className }: { index: number, className: string }) => (
  <motion.div 
    key={`skeleton-${index}`} 
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}
    className={`overflow-hidden ${className}`}
  >
    <Skeleton className="w-full h-full rounded-none" />
  </motion.div>
));
SkeletonItem.displayName = 'SkeletonItem';

// Memoize the full component to prevent unnecessary re-renders
const SkeletonGallery = memo(({ itemCount = 12 }: SkeletonGalleryProps) => {
  // Get a predictable pattern based on index for the skeleton layout
  const getRandomAspectRatio = (index: number) => {
    if (index % 5 === 0) return "col-span-2";
    if (index % 7 === 0) return "row-span-2";
    if (index % 11 === 0) return "col-span-2 row-span-2";
    return "";
  };

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-[300px] lg:auto-rows-[350px] grid-flow-dense"
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <SkeletonItem 
          key={index} 
          index={index} 
          className={getRandomAspectRatio(index)} 
        />
      ))}
    </motion.div>
  );
});
SkeletonGallery.displayName = 'SkeletonGallery';

export default SkeletonGallery;
