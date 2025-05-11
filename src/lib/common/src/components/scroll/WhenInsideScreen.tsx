import { useRef } from "react";

export const WhenInsideScreen = ({ onInside }: { onInside: () => unknown }) => {
  const uns = useRef(() => {});
  const prev = useRef(false);

  return (
    <div
      style={{
        height: "10px",
        width: "10px",
        position: "absolute",
        pointerEvents: "none",
      }}
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && !prev.current) {
                  prev.current = true;
                  onInside();
                }
                prev.current = entry.isIntersecting;
              });
            },
            {
              root: null,
              rootMargin: "0px",
              threshold: 0,
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
