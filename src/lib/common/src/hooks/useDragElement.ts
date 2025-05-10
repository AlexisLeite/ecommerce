import { useCallback, useRef } from "react";

const isTarget = (el: HTMLElement, ev: MouseEvent) => {
  const cl = (ev.target as HTMLElement).closest(
    '[data-resizable="true"], [data-draggable="true"]',
  );
  return cl === el || cl === null;
};

export function useDragElement() {
  const isEnabled = useRef(true);
  const sourceRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const unSubscribe = useRef(() => {});
  const unSubscribe2 = useRef(() => {});

  return {
    disable: () => (isEnabled.current = false),
    enable: () => (isEnabled.current = true),
    /**
     * El elemento que comienza el drag (generalmente, un heading)
     */
    dragSourceRef: useCallback((el: HTMLElement | null) => {
      sourceRef.current = el;
      unSubscribe.current();

      if (el) {
        let origin: { x: number; y: number } | null = null;
        let elementOrigin: { x: number; y: number } | null = null;
        const handleMouseMove = (ev: MouseEvent) => {
          if (!isTarget(targetRef.current!, ev)) return;
          if (targetRef.current?.dataset.isResizing === "true") return;

          targetRef.current!.style.left = `${elementOrigin!.x + (ev.clientX - origin!.x)}px`;
          targetRef.current!.style.top = `${elementOrigin!.y + (ev.clientY - origin!.y)}px`;
        };

        const handleMouseUp = (ev: MouseEvent) => {
          if (elementOrigin && ev.clientY <= 40) {
            targetRef.current!.style.height = "100vh";
            targetRef.current!.style.top = "0";
          }
          if (elementOrigin && ev.clientX <= 40) {
            targetRef.current!.style.left = "0";
          }
          if (elementOrigin && ev.clientX >= window.innerWidth - 40) {
            const rect = targetRef.current!.getBoundingClientRect();
            targetRef.current!.style.left = `${window.innerWidth - rect.width}px`;
          }
          document.removeEventListener("mouseup", handleMouseUp);
          document.removeEventListener("mousemove", handleMouseMove);
          elementOrigin = null;
        };

        const handleMouseDown = (ev: MouseEvent) => {
          if (!isTarget(targetRef.current!, ev)) return;

          ev.preventDefault();
          origin = { x: ev.clientX, y: ev.clientY };
          const rect = targetRef.current!.getBoundingClientRect();
          elementOrigin = { x: rect.left, y: rect.top };
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        };

        el.addEventListener("mousedown", handleMouseDown);
        unSubscribe.current = () => {
          el.removeEventListener("mousedown", handleMouseDown);
        };
      }
    }, []),

    /**
     * El elemento que es arrastrado
     */
    dragTargetRef: useCallback((el: HTMLElement | null) => {
      const bringToTop = () => {
        if (el) {
          el.parentElement
            ?.querySelector<HTMLElement>(".dragElementOnTop")
            ?.classList.remove("dragElementOnTop");
          el.classList.add("dragElementOnTop");
        }
      };

      if (el && !targetRef.current) {
        bringToTop();
      } else if (!el) {
        targetRef.current?.parentElement
          ?.querySelector<HTMLElement>("& > *")
          ?.classList.add("dragElementOnTop");
      }
      unSubscribe2.current();
      if (el) {
        el.dataset.draggable = "true";

        const handleMouseDown = (ev: MouseEvent) => {
          if (!isTarget(el!, ev)) return;
          bringToTop();
        };

        el.addEventListener("mousedown", handleMouseDown);
        unSubscribe2.current = () => {
          el.removeEventListener("mousedown", handleMouseDown);
        };
      }
      targetRef.current = el;
    }, []),
  };
}
