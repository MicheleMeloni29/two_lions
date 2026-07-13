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
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
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
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
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
  const currentTextColor =
    textColors.length > 0
      ? textColors[currentTextIndex % textColors.length]
      : 'inherit';
  const componentClassName = `inline-block whitespace-pre-wrap tracking-tight ${className}`.trim();
  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < currentText.length || isDeleting);

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

    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (isDeleting) {
      if (displayedText === '') {
        timeout = setTimeout(() => {
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

      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, deletingSpeed);

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }

    if (currentCharIndex < processedText.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + processedText[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, variableSpeed ? getRandomSpeed() : typingSpeed);
    } else if (loop || currentTextIndex < textArray.length - 1) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }

    if (currentCharIndex === 0 && displayedText === '') {
      const delayedTimeout = timeout;
      timeout = setTimeout(() => {
        if (delayedTimeout) {
          clearTimeout(delayedTimeout);
        }

        if (processedText.length > 0) {
          setDisplayedText(processedText[0]);
          setCurrentCharIndex(1);
        }
      }, initialDelay);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [
    currentCharIndex,
    currentText,
    currentTextIndex,
    deletingSpeed,
    displayedText,
    getRandomSpeed,
    initialDelay,
    isDeleting,
    isVisible,
    loop,
    onSentenceComplete,
    pauseDuration,
    processedText,
    textArray.length,
    typingSpeed,
    variableSpeed
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
      className: componentClassName,
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
