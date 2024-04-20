"use client";

import { buildReturnUrl } from "@/lib/utils";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { Route } from "next";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { Button } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import ButtonLink from "../../../components/ButtonLink";

export interface LinkTabberProps {
  className?: string;
  layoutRoute: Route;
  tabs: Array<{ label: string; segment: string }>;
}

export default function LinkTabber(props: LinkTabberProps): ReactElement {
  const segment: string | null = useSelectedLayoutSegment();
  if (segment === null) throw new Error("There shouldn't be a page here.");
  const tabsRef = useRef<HTMLUListElement>(null);

  const currentTabIdx: number = useMemo(() => {
    return props.tabs.findIndex((tab) => tab.segment === segment);
  }, [segment, props.tabs]);

  const searchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /**
   * Scroll the next out of bounds tab to the right side of the bar
   */
  function scrollLeft(): void {
    if (!tabsRef.current) return;

    const styles = getComputedStyle(tabsRef.current);
    const padding: number = parseInt(styles.paddingLeft);

    // Find the first non-fully visible tab (w/ padding to spare) from right
    let tab: HTMLLIElement | null = null;
    for (let i = tabsRef.current.children.length - 1; i >= 0; --i) {
      const child = tabsRef.current.children[i] as HTMLLIElement;
      if (child.offsetLeft - padding < tabsRef.current.scrollLeft) {
        tab = child;
        break;
      }
    }

    // Scroll tab to the right side w/ padding
    if (tab === null) {
      tabsRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      tabsRef.current.scrollTo({
        left:
          tab.offsetLeft +
          tab.clientWidth +
          padding -
          tabsRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }

  /**
   * Scroll the next out of bounds tab to the left side of the bar
   */
  function scrollRight(): void {
    if (!tabsRef.current) return;

    const styles = getComputedStyle(tabsRef.current);
    const padding: number = parseInt(styles.paddingLeft);

    // Find the first non-fully visible tab (w/ padding to spare) from left
    let tab: HTMLLIElement | null = null;
    for (let i = 0; i < tabsRef.current.children.length; ++i) {
      const child = tabsRef.current.children[i] as HTMLLIElement;
      if (
        child.offsetLeft + child.clientWidth + padding >
        tabsRef.current.scrollLeft + tabsRef.current.clientWidth
      ) {
        tab = child;
        break;
      }
    }

    // Scroll tab to the left side w/ padding
    if (tab === null) {
      tabsRef.current.scrollBy({
        left: tabsRef.current.scrollWidth - tabsRef.current.scrollLeft,
        behavior: "smooth",
      });
    } else {
      const leftBound = tabsRef.current.scrollLeft;
      const tabStart = tab.offsetLeft;
      const scrollDistance = tabStart - leftBound - padding;
      tabsRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  }

  /**
   * Check if we can scroll left or right
   */
  function checkScroll(): void {
    if (!tabsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // -1 to account for rounding errors
  }

  // Try to center the current tab
  useEffect(() => {
    if (!tabsRef.current) return;
    const currentTabEl = tabsRef.current.children[currentTabIdx];
    if (!currentTabEl) return;
    currentTabEl.scrollIntoView({
      block: "center",
      inline: "center",
      behavior: "smooth",
    });
  }, [tabsRef, currentTabIdx]);

  /**
   * Call checkScroll on scroll and resize
   */
  useEffect(() => {
    if (!tabsRef.current) return;

    checkScroll();

    const current = tabsRef.current;
    current.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [tabsRef]);

  return (
    <nav className={twMerge("relative", props.className)}>
      {/* Scroll-Left Button */}
      <Button
        excludeFromTabOrder
        onPress={scrollLeft}
        isDisabled={!canScrollLeft}
        className={
          "group absolute left-0 top-0 h-full w-10 border-2 border-transparent bg-black/60 backdrop-blur-[2px] transition duration-300 gradient-mask-r-10 hover:bg-black/90 focus-visible:border-focus disabled:pointer-events-none disabled:opacity-0"
        }
      >
        <LucideChevronLeft
          size={20}
          className="relative float-left transition group-pressed:translate-x-1"
        />
      </Button>
      {/* Scroll-Right Button */}
      <Button
        excludeFromTabOrder
        onPress={scrollRight}
        isDisabled={!canScrollRight}
        className={
          "first-line:group absolute right-0 top-0 h-full w-10 border-2 border-transparent bg-black/60 backdrop-blur-[2px] transition duration-300 gradient-mask-l-10 hover:bg-black/90 focus-visible:border-focus disabled:pointer-events-none disabled:opacity-0"
        }
      >
        <LucideChevronRight
          size={20}
          className="relative float-right transition group-pressed:-translate-x-1"
        />
      </Button>

      {/* Tabs */}
      <ul
        ref={tabsRef}
        className="hide-scrollbar flex h-10 w-full items-stretch overflow-x-scroll px-4"
      >
        {props.tabs.map(({ label, segment }, i) => (
          <li key={label} className="group">
            <ButtonLink
              href={buildReturnUrl(
                `${props.layoutRoute}/${segment}` as Route,
                returnUrl,
              )}
              prefetch
              variant={currentTabIdx === i ? "active" : "default"}
              className={"-outline-offset-2"}
            >
              {label}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
