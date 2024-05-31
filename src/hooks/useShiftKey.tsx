import { useEffect, useState } from "react";

export default function useShiftKey(): boolean {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Shift") setIsShiftPressed(true);
    };
    const onKeyUp = (e: KeyboardEvent): void => {
      if (e.key === "Shift") setIsShiftPressed(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return isShiftPressed;
}
