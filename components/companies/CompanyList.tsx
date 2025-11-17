import React, { useCallback, useRef, useEffect } from "react";
import type { Company } from "@/types/company";
import { CompanyCard } from "./CompanyCard";

interface CompanyListProps {
  companies: Company[];
  activeIndex: number;
  onSelectCompany: (company: Company, index: number) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const CompanyList = React.memo<CompanyListProps>(
  ({ companies, activeIndex, onSelectCompany, onKeyDown }) => {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Auto-scroll active item into view
    useEffect(() => {
      if (itemRefs.current[activeIndex]) {
        itemRefs.current[activeIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, [activeIndex]);

    const handleCardKeyDown = useCallback(
      (e: React.KeyboardEvent, index: number) => {
        // Handle Enter key to select
        if (e.key === "Enter") {
          e.preventDefault();
          onSelectCompany(companies[index], index);
          return;
        }

        // Delegate other key handling to parent
        onKeyDown(e);
      },
      [companies, onSelectCompany, onKeyDown],
    );

    if (companies.length === 0) {
      return null;
    }

    return (
      <section aria-label="Company List">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {companies.map((company, index) => (
            <div
              key={company.name}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="animate-scaleIn"
              style={{
                animationDelay: `${(index % 12) * 0.05}s`,
              }}
            >
              <CompanyCard
                company={company}
                isActive={index === activeIndex}
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => onSelectCompany(company, index)}
                onKeyDown={(e) => handleCardKeyDown(e, index)}
                staggerIndex={index % 4}
              />
            </div>
          ))}
        </div>
      </section>
    );
  },
);

CompanyList.displayName = "CompanyList";
