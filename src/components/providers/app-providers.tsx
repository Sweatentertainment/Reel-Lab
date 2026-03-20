"use client";

import "@/lib/gsap-register";
import { LightRaysBackground } from "@/components/light-rays-background";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { VideoBudgetProvider } from "@/contexts/video-budget";
import { GsapProvider } from "./gsap-provider";
import { SmoothScrollProvider } from "./smooth-scroll";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GsapProvider>
      <SmoothScrollProvider>
        <VideoBudgetProvider>
          <LightRaysBackground />
          <ScrollProgress />
          <CustomCursor />
          {children}
        </VideoBudgetProvider>
      </SmoothScrollProvider>
    </GsapProvider>
  );
}
