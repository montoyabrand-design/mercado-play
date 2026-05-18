"use client";

import { DrawerProvider } from "@/contexts/DrawerContext";
import { SideDrawer } from "@/components/drawers/SideDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DrawerProvider>
      {children}
      <SideDrawer />
    </DrawerProvider>
  );
}
