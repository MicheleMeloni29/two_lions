import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, PanInfo, useMotionValue } from 'motion/react';
import React, { JSX } from 'react';

// replace icons with your own if needed
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';
export interface CarouselItem {
    title: string;
    description: string;
    id: number;
    icon: React.ReactNode;
}

export interface CarouselProps {
    items?: CarouselItem[];
    baseWidth?: number;
    baseHeight?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    pauseOnHover?: boolean;
    loop?: boolean;
    round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
    {
        title: 'Text Animations',
        description: 'Cool text animations for your projects.',
        id: 1,
        icon: <FiFileText className="h-[16px] w-[16px] text-white" />
    },
    {
        title: 'Animations',
        description: 'Smooth animations for your projects.',
        id: 2,
        icon: <FiCircle className="h-[16px] w-[16px] text-white" />
    },
    {
        title: 'Components',
        description: 'Reusable components for your projects.',
        id: 3,
        icon: <FiLayers className="h-[16px] w-[16px] text-white" />
    },
    {
        title: 'Backgrounds',
        description: 'Beautiful backgrounds and patterns for your projects.',
        id: 4,
        icon: <FiLayout className="h-[16px] w-[16px] text-white" />
    },
    {
        title: 'Common UI',
        description: 'Common UI components are coming soon!',
        id: 5,
        icon: <FiCode className="h-[16px] w-[16px] text-white" />
    }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 };

interface CarouselItemProps {
    item: CarouselItem;
    itemWidth: number;
    round: boolean;
}

function CarouselItem({ item, itemWidth, round }: CarouselItemProps) {
    return (
        <motion.div
            key={item.id}
            className={`relative shrink-0 flex flex-col items-center justify-center text-center ${round
                ? 'bg-[#120F17]'
                : 'bg-secondary'
                } overflow-hidden cursor-grab active:cursor-grabbing`}
            style={{
                width: itemWidth,
                height: round ? itemWidth : '100%',
                minHeight: '100%',
                ...(round && { borderRadius: '50%' })
            }}
        >
            <div className="flex h-full w-full flex-col items-center justify-center px-4 py-4 text-center sm:px-5 sm:py-5 md:px-6 md:py-6">
                <div className="mb-3 text-[1.06rem] leading-[1.12] font-black text-[color:var(--color-thirdary)] sm:mb-4 sm:text-[1.12rem] md:text-[1.2rem]">
                    {item.title}
                </div>
                <p className="w-full text-[13.5px] leading-[1.42] text-white line-clamp-7 sm:text-[14.5px] sm:line-clamp-7 md:text-[15px] md:line-clamp-8">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function Carousel({
    items = DEFAULT_ITEMS,
    baseWidth = 300,
    baseHeight = 280,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false
}: CarouselProps): JSX.Element {
    const containerPadding = round ? (baseWidth < 340 ? 8 : 16) : 0;
    const trackGap = round ? GAP : 0;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + trackGap;
    const cardHeight = baseHeight;
    const itemsForRender = useMemo(() => {
        if (!loop) return items;
        if (items.length === 0) return [];
        return [items[items.length - 1], ...items, items[0]];
    }, [items, loop]);

    const initialPosition = loop ? 1 : 0;
    const [position, setPosition] = useState<number>(initialPosition);
    const maxPosition = Math.max(itemsForRender.length - 1, 0);
    const currentPosition = loop ? position : Math.min(position, maxPosition);
    const x = useMotionValue(-initialPosition * trackItemOffset);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isJumping, setIsJumping] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return undefined;
        if (pauseOnHover && isHovered) return undefined;

        const timer = setInterval(() => {
            setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
        }, autoplayDelay);

        return () => clearInterval(timer);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    useEffect(() => {
        x.set(-(currentPosition * trackItemOffset));
    }, [currentPosition, trackItemOffset, x]);

    const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationStart = () => {
        setIsAnimating(true);
    };

    const handleAnimationComplete = () => {
        if (!loop || itemsForRender.length <= 1) {
            setIsAnimating(false);
            return;
        }
        const lastCloneIndex = itemsForRender.length - 1;

        if (position === lastCloneIndex) {
            setIsJumping(true);
            const target = 1;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        if (position === 0) {
            setIsJumping(true);
            const target = items.length;
            setPosition(target);
            x.set(-target * trackItemOffset);
            requestAnimationFrame(() => {
                setIsJumping(false);
                setIsAnimating(false);
            });
            return;
        }

        setIsAnimating(false);
    };

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
        const { offset, velocity } = info;
        const direction =
            offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
                ? 1
                : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
                    ? -1
                    : 0;

        if (direction === 0) return;

        setPosition(prev => {
            const next = prev + direction;
            const max = itemsForRender.length - 1;
            return Math.max(0, Math.min(next, max));
        });
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * maxPosition,
                right: 0
            }
        };

    return (
        <div
            ref={containerRef}
            className={`relative mx-auto flex items-center justify-center overflow-hidden ${round ? 'p-3 sm:p-5' : ''}`}
            style={{
                width: '100%',
                maxWidth: `${baseWidth}px`,
                height: `${cardHeight}px`,
                ...(round && { height: `${baseWidth}px` })
            }}
        >
            <motion.div
                className="flex h-full items-center"
                drag={isAnimating ? false : 'x'}
                {...dragProps}
                style={{
                    width: itemWidth,
                    height: '100%',
                    gap: `${trackGap}px`,
                    x
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(currentPosition * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationStart={handleAnimationStart}
                onAnimationComplete={handleAnimationComplete}
            >
                {itemsForRender.map((item, index) => (
                    <CarouselItem
                        key={`${item?.id ?? index}-${index}`}
                        item={item}
                        itemWidth={itemWidth}
                        round={round}
                    />
                ))}
            </motion.div>
        </div>
    );
}

