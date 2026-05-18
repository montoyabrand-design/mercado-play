"use client";

import React from "react";

interface TabOption<T extends string> {
  value: T;
  label: React.ReactNode;
}

interface PillTabsProps<T extends string> {
  tabs: TabOption<T>[];
  active: T;
  onChange: (value: T) => void;
  fullWidth?: boolean;
  className?: string;
}

export function PillTabs<T extends string>({ tabs, active, onChange, fullWidth, className }: PillTabsProps<T>) {
  return (
    <div
      className={`flex items-center gap-2 p-1 rounded-full ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
      style={{ background: "#343434" }}
    >
      {tabs.map(({ value, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`font-ui font-semibold cursor-pointer rounded-full transition-all duration-200 whitespace-nowrap ${fullWidth ? "flex-1" : ""}`}
            style={{
              fontSize: 14,
              padding: "8px 16px",
              background: isActive ? "#f7f8f8" : "transparent",
              color: isActive ? "#08090a" : "#f7f8f8",
              boxShadow: isActive ? "0 4px 8px rgba(0,0,0,0.12)" : "none",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
