import { useRef } from "react";

export const WhenInsideScreen = ({ onInside }: { onInside: () => unknown }) => {
  const uns = useRef(() => {});
  return (
    <div
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  onInside();
                }
              });
            },
            {
              root: null, // viewport
              rootMargin: "0px", // margin around the root
              threshold: 0, // fire as soon as even one pixel is visible
            },
          );

          uns.current();
          observer.observe(el);
          uns.current = () => {
            observer.disconnect();
          };
        }
      }}
    />
  );
};
