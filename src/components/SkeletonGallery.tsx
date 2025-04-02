
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface SkeletonGalleryProps {
  itemCount?: number;
}

const SkeletonGallery = ({ itemCount = 12 }: SkeletonGalleryProps) => {
  // Create a staggered animation for the skeleton items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Generate different aspect ratios for a more realistic skeleton
  const getRandomAspectRatio = (index: number) => {
    // Create a predictable pattern to make it look like a real gallery
    if (index % 5 === 0) return "col-span-2";
    if (index % 7 === 0) return "row-span-2";
    if (index % 11 === 0) return "col-span-2 row-span-2";
    return "";
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-[300px] lg:auto-rows-[350px] grid-flow-dense"
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <motion.div 
          key={`skeleton-${index}`} 
          variants={item}
          className={`overflow-hidden ${getRandomAspectRatio(index)}`}
        >
          <Skeleton className="w-full h-full rounded-none" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkeletonGallery;
