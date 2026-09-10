import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Per-history-entry scroll memory. The browser's own automatic
// history.scrollRestoration tries to do this too, but it races with React's
// render/mount timing (it restores against whatever height the page happens
// to have at that instant), which is what caused "back" to land at the
// bottom of a not-yet-fully-rendered list. Taking manual control avoids that race.
const scrollPositions = new Map<string, number>();

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const ScrollToTop = () => {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    return () => {
      scrollPositions.set(key, window.scrollY);
    };
  }, [key]);

  useLayoutEffect(() => {
    // behavior: "auto" is explicit here because the site sets `scroll-behavior:
    // smooth` globally in CSS, which browsers apply to scrollTo() calls that
    // don't specify a behavior — turning this route-change jump into a visible
    // animated scroll otherwise.
    if (navigationType === "POP") {
      const saved = scrollPositions.get(key);
      if (saved !== undefined) {
        window.scrollTo({ top: saved, left: 0, behavior: "auto" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, key, navigationType]);

  return null;
};

export default ScrollToTop;
