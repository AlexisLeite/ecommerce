import { useRef } from "react";

export function useResizeElement() {
  const targetRef = useRef<HTMLElement | null>(null);
  const unSubscribe = useRef(() => {});

  return {
    targetRef: (el: HTMLElement | null) => {
      targetRef.current = el;
      unSubscribe.current();
      if (el) {
        el.dataset.resizable = "true";

        const style = document.createElement("style");
        let resize: "No" | "n" | "w" | "e" | "s" | "ne" | "nw" | "se" | "sw" =
          "No";
        let isResizing = false;
        let mouseDownOrigin: { x: number; y: number } = { x: 0, y: 0 };
        let originalRect: DOMRect = {} as DOMRect;

        const isTarget = (ev: MouseEvent) => {
          const cl = (ev.target as HTMLElement).closest(
            '[data-resizable="true"], [data-draggable="true"]',
          );
          return cl === el || cl === null;
        };

        const handleMouseDown = (ev: MouseEvent) => {
          if (!isTarget(ev)) return;

          originalRect = el.getBoundingClientRect();
          mouseDownOrigin = { x: ev.clientX, y: ev.clientY };
          isResizing = true;
        };
        const handleMouseUp = () => {
          isResizing = false;
        };
        const handleMouseMove = (ev: MouseEvent) => {
          if (isResizing) {
            ev.stopPropagation();
          }
          const currentRect = el.getBoundingClientRect();

          const bottom = currentRect.top + currentRect.height;
          const right = currentRect.left + currentRect.width;

          const isInside =
            ev.clientX >= currentRect.left - 10 &&
            ev.clientX <= right + 10 &&
            ev.clientY >= currentRect.top - 10 &&
            ev.clientY <= bottom + 10;

          const resizeTop =
            isInside &&
            ev.clientY <= currentRect.top + 10 &&
            ev.clientY >= currentRect.top - 10;
          const resizeBottom =
            isInside && ev.clientY <= bottom + 10 && ev.clientY >= bottom - 10;
          const resizeLeft =
            isInside &&
            ev.clientX <= currentRect.left + 10 &&
            ev.clientX >= currentRect.left - 10;
          const resizeRight =
            isInside && ev.clientX <= right + 10 && ev.clientX >= right - 10;

          if (!isResizing) {
            if (resizeTop) {
              if (resizeLeft) resize = "nw";
              else if (resizeRight) resize = "ne";
              else resize = "n";
            } else if (resizeBottom) {
              if (resizeLeft) resize = "sw";
              else if (resizeRight) resize = "se";
              else resize = "s";
            } else if (resizeLeft) {
              resize = "w";
            } else if (resizeRight) {
              resize = "e";
            } else {
              resize = "No";
            }
          }

          el.dataset.isResizing =
            isResizing && resize.match(/n|s|e|w/) ? "true" : "false";

          style.innerHTML = `body * { ${resize === "No" || !isTarget(ev) ? "" : `cursor: ${resize}-resize !important`}; }`;
          document.body.append(style);

          if (isResizing) {
            const diffX = ev.clientX - mouseDownOrigin.x;
            const diffY = ev.clientY - mouseDownOrigin.y;

            if (resize.match(/n/)) {
              el.style.top = `${originalRect.top + diffY}px`;
              el.style.height = `${originalRect.height - diffY}px`;
            } else if (resize.match(/s/)) {
              el.style.height = `${originalRect.height + diffY}px`;
            }
            if (resize.match(/w/)) {
              el.style.left = `${originalRect.left + diffX}px`;
              el.style.width = `${originalRect.width - diffX}px`;
            } else if (resize.match(/e/)) {
              el.style.width = `${originalRect.width + diffX}px`;
            }
          }
        };

        unSubscribe.current = () => {
          style.remove();
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mousedown", handleMouseDown);
          document.removeEventListener("mouseup", handleMouseUp);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
      }
    },
  };
}
