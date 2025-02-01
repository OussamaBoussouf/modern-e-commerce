import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handler = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };

      handler();

      window.addEventListener("resize", handler);

      return () => window.removeEventListener("resize", handler);
    }
  }, []);

  return { width, height };
};
