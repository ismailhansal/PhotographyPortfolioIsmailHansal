
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonGalleryProps {
  count?: number;
}

const SkeletonGallery = ({ count = 8 }: SkeletonGalleryProps) => {
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
