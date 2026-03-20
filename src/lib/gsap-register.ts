import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Client-only; avoids touching ScrollTrigger during SSR module evaluation. */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
