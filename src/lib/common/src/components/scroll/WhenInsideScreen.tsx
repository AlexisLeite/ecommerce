import { useRef } from "react";

export const WhenInsideScreen = ({ onInside }: { onInside: () => unknown }) => {
  const uns = useRef(() => {});
  const prev = useRef(false);

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: "10px",
          width: "10px",
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
    </div>
  );
};
