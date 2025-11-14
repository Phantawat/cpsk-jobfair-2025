import React, { useEffect, useState } from 'react';
import { Company } from '@/types/company';
import { getCompanyLogoFilename } from '@/lib/companyLogoMap';

export default function QuickHighlights({ companies }: { companies: Company[] }) {
  const [featuredCompanies, setFeaturedCompanies] = useState<Company[]>([]);

  // Get random featured companies only on client side
  useEffect(() => {
    const shuffled = [...companies].sort(() => Math.random() - 0.5);
    setFeaturedCompanies(shuffled.slice(0, 6));
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

  // Don't render carousel until client is hydrated
  if (featuredCompanies.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16 animate-fadeInUp">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ku-pine mb-4">
            Quick Highlights
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most sought-after industries and positions at the fair
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Featured Companies Carousel */}
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-ku-pine mb-6 flex items-center gap-3">
              <svg className="w-7 h-7 text-ku-fresh" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Featured Companies
            </h3>
            
            {/* Scrolling carousel */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-ku-pine/10 to-ku-fresh/10 p-6 border-2 border-ku-fresh/20">
              <div className="flex gap-8 animate-scroll">
                {/* Duplicate the array for seamless loop */}
                {[...featuredCompanies, ...featuredCompanies].map((company, index) => {
                  const logoFilename = getCompanyLogoFilename(company.name);
                  return (
                    <a
                      key={`${company.name}-${index}`}
                      href="/companies"
                      className="group flex-shrink-0 w-32 text-center hover-lift transition-transform duration-300 focus-shadow rounded-full outline-none focus:outline-offset-2 focus:outline-ku-pine"
                    >
                      {/* Company Logo Circle */}
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-ku-pine to-ku-fresh flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow overflow-hidden">
                        {logoFilename ? (
                          <img
                            src={`/logos/${logoFilename}.png`}
                            alt={company.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initials if logo fails to load
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const fallback = document.createElement('span');
                                fallback.textContent = company.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
                                fallback.className = 'text-white text-lg font-bold';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        ) : (
                          <span className="text-white text-lg font-bold">
                            {company.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      
                      {/* Position Count */}
                      <div className="text-sm font-semibold text-ku-pine group-hover:text-ku-fresh transition-colors">
                        {company.positions.length} position{company.positions.length !== 1 ? 's' : ''}
                      </div>
                    </a>
                  );
                })}
              </div>
              
              {/* Gradient fade on edges */}
              <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-ku-pine/10 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-ku-fresh/10 to-transparent pointer-events-none"></div>
            </div>
            
            <style jsx>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              .animate-scroll {
                animation: scroll 15s linear infinite;
              }
              
              .animate-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
          </div>

          {/* Top Positions */}
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
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
                  className="group relative overflow-hidden p-4 bg-gradient-to-br from-ku-pine/5 to-ku-fresh/5 hover:from-ku-pine/10 hover:to-ku-fresh/10 rounded-xl border-2 border-transparent hover:border-ku-fresh transition-all duration-300 transform hover-lift animate-scaleIn"
                  style={{
                    animationDelay: `${0.2 + index * 0.08}s`,
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
        <div className="mt-12 sm:mt-16 text-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            Ready to explore all opportunities?
          </p>
          <a
            href="/companies"
            className="inline-flex items-center gap-2 px-8 py-3 bg-ku-pine hover:bg-ku-pine-dark text-white font-semibold rounded-full transition-all duration-300 hover-lift shadow-lg hover:shadow-xl group"
          >
            View All Companies
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
