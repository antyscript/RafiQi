import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import GraphemeSplitter from "grapheme-splitter";

const SplitText = ({
  text = "",
  splitType = "chars", // أو "words"
  delay = 0.05,
  duration = 0.6,
  ease = "power3.out",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  className = "",
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef(null);
  const splitter = new GraphemeSplitter();

  // تقسيم النص بطريقة تدعم العربية والإيموجي
  const parts =
    splitType === "words"
      ? text.split(" ")
      : splitter.splitGraphemes(text); // هنا الفرق المهم

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const letters = container.querySelectorAll(".letter");

    gsap.fromTo(
      letters,
      from,
      {
        ...to,
        ease,
        duration,
        stagger: delay > 1 ? delay / 1000 : delay,
        onComplete: onLetterAnimationComplete,
      }
    );
  }, [text]);

  return (
    <div ref={containerRef} className={className} dir="rtl">
      {parts.map((part, i) => (
        <span key={i} className="letter inline-block">
          {splitType === "words" ? part + " " : part}
        </span>
      ))}
    </div>
  );
};

export default SplitText;