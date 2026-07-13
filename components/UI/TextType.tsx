'use client';

import {
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { gsap } from 'gsap';

interface TextTypeProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 48,
  initialDelay = 300,
  pauseDuration = 4000,
  deletingSpeed = 99999,
  loop = false,
  className = '',
  showCursor = false,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps) => {
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [hasEntered, setHasEntered] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) {
      return typingSpeed;
    }

    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [typingSpeed, variableSpeed]);

  const currentText = textArray[currentTextIndex] ?? '';
  const processedText = reverseMode
    ? currentText.split('').reverse().join('')
    : currentText;
  const displayedText = processedText.slice(0, currentCharIndex);
  const currentTextColor =
    textColors.length > 0
      ? textColors[currentTextIndex % textColors.length]
      : 'inherit';
  const componentClassName = `inline-block whitespace-pre-wrap tracking-tight ${className}`.trim();
  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < currentText.length || isDeleting);
  const typingSchedule = useMemo(
    () =>
      Array.from({ length: processedText.length }).reduce<number[]>(
        (schedule) => [
          ...schedule,
          (schedule[schedule.length - 1] ?? 0) +
            (variableSpeed ? getRandomSpeed() : typingSpeed)
        ],
        []
      ),
    [getRandomSpeed, processedText.length, typingSpeed, variableSpeed]
  );

  useEffect(() => {
    if (!startOnVisible || !observerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!isVisible || hasEntered) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setHasEntered(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [hasEntered, isVisible]);

  useEffect(() => {
    if (!showCursor || !cursorRef.current) {
      return;
    }

    gsap.set(cursorRef.current, { opacity: 1 });
    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    return () => {
      tween.kill();
    };
  }, [cursorBlinkDuration, showCursor]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let frameId: number | undefined;

    const updateDeleting = () => {
      const startedAt = performance.now();
      const initialCount = currentCharIndex;

      const tick = (now: number) => {
        const elapsed = now - startedAt;
        const removedChars = Math.floor(elapsed / deletingSpeed);
        const nextCount = Math.max(0, initialCount - removedChars);

        if (nextCount !== initialCount) {
          setCurrentCharIndex((prev) => (prev === nextCount ? prev : nextCount));
        }

        if (nextCount > 0) {
          frameId = window.requestAnimationFrame(tick);
          return;
        }

        timeoutId = setTimeout(() => {
          setIsDeleting(false);

          if (onSentenceComplete) {
            onSentenceComplete(currentText, currentTextIndex);
          }

          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        }, 0);
      };

      frameId = window.requestAnimationFrame(tick);
    };

    const updateTyping = () => {
      const startedAt = performance.now();
      const initialCount = currentCharIndex;
      const initialOffset = initialCount > 0 ? typingSchedule[initialCount - 1] ?? 0 : 0;

      const tick = (now: number) => {
        const elapsed = now - startedAt + initialOffset;
        const nextCount = typingSchedule.filter((time) => time <= elapsed).length;

        if (nextCount !== initialCount) {
          setCurrentCharIndex((prev) => (prev === nextCount ? prev : nextCount));
        }

        if (nextCount < processedText.length) {
          frameId = window.requestAnimationFrame(tick);
          return;
        }

        if (loop || currentTextIndex < textArray.length - 1) {
          timeoutId = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    if (isDeleting) {
      if (currentCharIndex === 0) {
        timeoutId = setTimeout(() => {
          setIsDeleting(false);

          if (onSentenceComplete) {
            onSentenceComplete(currentText, currentTextIndex);
          }

          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        }, 0);
        return;
      }

      updateDeleting();
    } else if (currentCharIndex < processedText.length) {
      timeoutId = setTimeout(updateTyping, currentCharIndex === 0 ? initialDelay : 0);
    } else if (loop || currentTextIndex < textArray.length - 1) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [
    currentCharIndex,
    currentText,
    currentTextIndex,
    deletingSpeed,
    initialDelay,
    isDeleting,
    isVisible,
    loop,
    onSentenceComplete,
    pauseDuration,
    processedText,
    textArray.length,
    typingSchedule
  ]);

  const renderedContent = (
    <>
      <span className="inline" style={{ color: currentTextColor }}>
        {displayedText}
      </span>
      {showCursor ? (
        <span
          ref={cursorRef}
          className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`.trim()}
        >
          {cursorCharacter}
        </span>
      ) : null}
    </>
  );

  const typedElement = createElement(
    Component,
    {
      className: `${componentClassName} transition-[opacity,transform,filter] duration-700 ease-out will-change-transform motion-reduce:transition-none ${
        hasEntered ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-2 blur-[2px] opacity-0'
      }`.trim(),
      ...props
    },
    renderedContent
  );

  if (!startOnVisible) {
    return typedElement;
  }

  return (
    <div ref={observerRef} className="w-full">
      {typedElement}
    </div>
  );
};

export default TextType;
