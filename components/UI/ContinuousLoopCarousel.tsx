"use client";

import { motion } from "framer-motion";
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
  const loopItems = [...items, ...items];

  return (
    <div
      className={joinClasses(
        "relative overflow-hidden",
        viewportClassName
      )}
    >
      <motion.div
        className={joinClasses("flex w-max", trackClassName)}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loopItems.map((item, index) => (
          <article
            key={`${item.id}-${index}`}
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
      </motion.div>
    </div>
  );
}
