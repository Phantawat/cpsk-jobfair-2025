import React from 'react';
import { Company } from '@/types/company';

interface QuickHighlightsProps {
  companies: Company[];
}

export const QuickHighlights: React.FC<QuickHighlightsProps> = ({ companies }) => {
  // Calculate top business types
  const topBusinessTypes = React.useMemo(() => {
    const businessTypeCounts = companies.reduce((acc, company) => {
      const type = company.businessType;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(businessTypeCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));
  }, [companies]);

  // Calculate top positions
  const topPositions = React.useMemo(() => {
    const positionCounts = companies.reduce((acc, company) => {
      company.positions.forEach(position => {
        acc[position] = (acc[position] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(positionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([position, count]) => ({ position, count }));
  }, [companies]);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ku-pine mb-4">
            Quick Highlights
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most sought-after industries and positions at the fair
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Top Business Types */}
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-ku-pine mb-6 flex items-center gap-3">
              <svg className="w-7 h-7 text-ku-fresh" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Top Industries
            </h3>
            <div className="space-y-3">
              {topBusinessTypes.map((item, index) => (
                <div
                  key={item.type}
                  className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-ku-pine/5 rounded-xl border-2 border-transparent hover:border-ku-fresh transition-all duration-300 transform hover:translate-x-2"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 bg-ku-pine/10 group-hover:bg-ku-fresh/20 rounded-full flex items-center justify-center text-ku-pine group-hover:text-ku-fresh font-bold text-sm transition-colors duration-300">
                      {index + 1}
                    </div>
                    <span className="text-base sm:text-lg font-medium text-gray-800 group-hover:text-ku-pine transition-colors duration-300">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-ku-fresh/20 text-ku-pine group-hover:bg-ku-fresh group-hover:text-white transition-all duration-300">
                      {item.count} {item.count === 1 ? 'company' : 'companies'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Positions */}
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-ku-pine mb-6 flex items-center gap-3">
              <svg className="w-7 h-7 text-ku-fresh" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Popular Positions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topPositions.map((item, index) => (
                <div
                  key={item.position}
                  className="group relative overflow-hidden p-4 bg-gradient-to-br from-ku-pine/5 to-ku-fresh/5 hover:from-ku-pine/10 hover:to-ku-fresh/10 rounded-xl border-2 border-transparent hover:border-ku-fresh transition-all duration-300 transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="relative z-10">
                    <div className="text-sm font-semibold text-ku-fresh mb-1">
                      #{index + 1}
                    </div>
                    <div className="text-base font-semibold text-ku-pine mb-2 line-clamp-2">
                      {item.position}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.count} {item.count === 1 ? 'opening' : 'openings'}
                    </div>
                  </div>
                  
                  {/* Decorative gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ku-fresh/0 to-ku-pine/0 group-hover:from-ku-fresh/10 group-hover:to-ku-pine/10 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            Ready to explore all opportunities?
          </p>
          <a
            href="/companies"
            className="inline-flex items-center gap-2 px-8 py-3 bg-ku-pine hover:bg-ku-pine-dark text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Companies
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
