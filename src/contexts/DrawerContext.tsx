"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { ContentItem } from "@/types";

interface DrawerContextValue {
  isOpen: boolean;
  item: ContentItem | null;
  open: (item: ContentItem) => void;
  close: () => void;
}

const DrawerContext = createContext<DrawerContextValue>({
  isOpen: false,
  item: null,
  open: () => {},
  close: () => {},
});

export function useDrawer() {
  return useContext(DrawerContext);
}

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<ContentItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((newItem: ContentItem) => {
    setItem(newItem);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DrawerContext.Provider value={{ isOpen, item, open, close }}>
      {children}
    </DrawerContext.Provider>
  );
}
