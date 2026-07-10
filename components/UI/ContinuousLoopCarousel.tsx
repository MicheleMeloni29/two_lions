"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export type ContinuousLoopCarouselItem = {
  id: number | string;
  title?: string;
  description: string;
  content?: ReactNode;
};

type ContinuousLoopCarouselProps = {
  items: ContinuousLoopCarouselItem[];
  duration?: number;
  viewportClassName?: string;
  trackClassName?: string;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ContinuousLoopCarousel({
  items,
  duration = 24,
  viewportClassName,
  trackClassName,
  cardClassName,
  titleClassName,
  descriptionClassName,
}: ContinuousLoopCarouselProps) {
  const groupRef = useRef<HTMLDivElement | null>(null);
  const [groupWidth, setGroupWidth] = useState(0);

  useEffect(() => {
    const node = groupRef.current;

    if (!node) {
      return;
    }

    const updateWidth = () => {
      setGroupWidth(node.scrollWidth);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(node);
    window.addEventListener("resize", updateWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [items, trackClassName, cardClassName, titleClassName, descriptionClassName]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={joinClasses(
        "relative overflow-hidden",
        viewportClassName
      )}
    >
      <motion.div
        className="flex w-max"
        animate={groupWidth > 0 ? { x: -groupWidth } : undefined}
        transition={
          groupWidth > 0
            ? {
                duration,
                repeat: Infinity,
                ease: "linear",
              }
            : undefined
        }
      >
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            ref={groupIndex === 0 ? groupRef : undefined}
            aria-hidden={groupIndex === 1 ? true : undefined}
            className={joinClasses("flex shrink-0 w-max", trackClassName)}
          >
            {items.map((item, itemIndex) => (
              <article
                key={`${groupIndex}-${item.id}-${itemIndex}`}
                className={joinClasses(
                  "flex shrink-0 items-center text-center",
                  cardClassName
                )}
              >
                {item.content ? (
                  item.content
                ) : (
                  <div className="flex h-full w-full flex-col">
                    {item.title ? (
                      <h4
                        className={joinClasses(
                          "mb-3 text-[1.06rem] font-black leading-[1.12] text-[color:var(--color-thirdary)] sm:mb-4 sm:text-[1.12rem] md:text-[1.2rem]",
                          titleClassName
                        )}
                      >
                        {item.title}
                      </h4>
                    ) : null}
                    <p
                      className={joinClasses(
                        "w-full text-[13px] leading-6 sm:text-sm md:text-[15px] md:leading-7",
                        descriptionClassName
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
