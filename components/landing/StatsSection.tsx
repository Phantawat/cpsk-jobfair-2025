import React, { useEffect, useState } from 'react';
import { Company } from '@/types/company';

interface StatsSectionProps {
  companies: Company[];
}

interface Stat {
  label: string;
  value: number;
  icon: JSX.Element;
  suffix?: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ companies }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  // Calculate statistics from companies data
  const stats: Stat[] = React.useMemo(() => {
    const totalCompanies = companies.length;
    
    // Count unique positions
    const allPositions = companies.flatMap(c => c.positions);
    const uniquePositions = new Set(allPositions).size;
    
    // Count unique employment types
    const allEmploymentTypes = companies.flatMap(c => c.employmentTypes);
    const uniqueEmploymentTypes = new Set(allEmploymentTypes).size;
    
    // Count year levels offered
    const allYearLevels = companies.flatMap(c => c.yearLevels);
    const uniqueYearLevels = new Set(allYearLevels).size;

    return [
      {
        label: 'Companies',
        value: totalCompanies,
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        ),
      },
      {
        label: 'Job Positions',
        value: uniquePositions,
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        suffix: '+',
      },
      {
        label: 'Employment Types',
        value: uniqueEmploymentTypes,
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        label: 'Year Levels',
        value: uniqueYearLevels,
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
      },
    ];
  }, [companies]);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16 animate-fadeInUp">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ku-pine mb-4">
            Event at a Glance
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Join us to discover opportunities from leading companies across diverse industries
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              hasAnimated={hasAnimated}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Individual stat card component with counter animation
interface StatCardProps {
  stat: Stat;
  index: number;
  hasAnimated: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index, hasAnimated }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = stat.value / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasAnimated, stat.value]);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-2 border-transparent hover:border-ku-fresh animate-slideDown hover-lift focus-shadow"
      style={{
        animationDelay: `${0.1 + index * 0.08}s`,
      }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-ku-pine/10 rounded-full text-ku-pine group-hover:bg-ku-fresh/20 group-hover:text-ku-fresh transition-all duration-300">
          {stat.icon}
        </div>
      </div>

      {/* Value with pulse animation */}
      <div className="text-4xl sm:text-5xl font-bold text-ku-pine text-center mb-2 group-hover:text-ku-fresh transition-colors duration-300 inline-block w-full">
        <span className="group-hover:animate-pulseSlow">
          {count}
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <div className="text-base sm:text-lg text-gray-600 text-center font-medium">
        {stat.label}
      </div>

      {/* Decorative corner accent with better animation */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-ku-fresh/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100 origin-top-right"></div>
    </div>
  );
};
