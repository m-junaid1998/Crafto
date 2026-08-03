import React from 'react';
import { NavLink } from 'react-router-dom';

export interface BreadcrumbItem { label: string; link?: string; }

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
  <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium py-3 text-gray-400">
    {items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      return (
        <React.Fragment key={idx}>
          {isLast || !item.link ? (
            <span className="text-[#055038] font-bold">{item.label}</span>
          ) : (
            <NavLink to={item.link} className="hover:text-[#055038] transition-colors">{item.label}</NavLink>
          )}
          {!isLast && (
            <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </React.Fragment>
      );
    })}
  </nav>
);