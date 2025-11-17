import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  count?: number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  circle = false,
  count = 1,
  className = '',
}) => {
  const skeletons = Array.from({ length: count });

  const baseStyles = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <>
      {skeletons.map((_, i) => (
        <div
          key={i}
          style={baseStyles}
          className={`
            bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200
            background-size-200 animate-shimmer
            ${circle ? 'rounded-full' : 'rounded-lg'}
            ${className}
            ${count > 1 ? 'mb-4' : ''}
          `}
        />
      ))}
    </>
  );
};

// Skeleton Card Component (for company cards)
export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  const cards = Array.from({ length: count });

  return (
    <>
      {cards.map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-md animate-pulse">
          {/* Avatar */}
          <div className="flex flex-col items-center text-center mb-4">
            <Skeleton circle width={64} height={64} className="mb-3" />
            <Skeleton width="80%" height="16px" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-3">
            <Skeleton width="45%" height="24px" className="rounded-full" />
            <Skeleton width="45%" height="24px" className="rounded-full" />
          </div>

          {/* Button */}
          <Skeleton width="100%" height="32px" className="mt-2" />
        </div>
      ))}
    </>
  );
};

// Skeleton Modal Component
export const ModalSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <Skeleton circle width={80} height={80} className="mx-auto mb-3" />
        <Skeleton width="70%" height="24px" className="mx-auto mb-2" />
        <Skeleton width="40%" height="16px" className="mx-auto" />
      </div>

      {/* Content sections */}
      <div className="space-y-4">
        <Skeleton width="100%" height="80px" className="rounded-lg" />
        <Skeleton width="100%" height="80px" className="rounded-lg" />
        <Skeleton width="100%" height="100px" className="rounded-lg" />
      </div>
    </div>
  );
};
