import { useEffect, useRef, useState } from "react";

export function useScrollPosition() {
  const [pos, setPos] = useState(0);

  const sub = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setPos(document.scrollingElement!.scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    sub.current = () => {
      window.removeEventListener("scroll", handleScroll);
    };

    return () => sub.current?.();
  }, []);

  return pos;
}
