
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface SkeletonGalleryProps {
  count?: number;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const SkeletonGallery = ({ count = 8, isLoading = true, children }: SkeletonGalleryProps) => {
  // Staggered animation configuration
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] // ease-out-expo
      }
    },
  };

  if (!isLoading) {
    return (
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-[300px] lg:auto-rows-[350px] grid-flow-dense"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {Array.isArray(children) 
          ? children.map((child, i) => (
              <motion.div key={i} variants={item}>
                {child}
              </motion.div>
            ))
          : children 
            ? <motion.div variants={item}>{children}</motion.div> 
            : null
        }
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-[300px] lg:auto-rows-[350px] grid-flow-dense">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className={`overflow-hidden ${i % 3 === 0 ? 'lg:col-span-2' : ''}`}
        >
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonGallery;
