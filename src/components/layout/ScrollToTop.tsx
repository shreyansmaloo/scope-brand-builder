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
    if (navigationType === "POP") {
      const saved = scrollPositions.get(key);
      if (saved !== undefined) {
        window.scrollTo(0, saved);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, key, navigationType]);

  return null;
};

export default ScrollToTop;
