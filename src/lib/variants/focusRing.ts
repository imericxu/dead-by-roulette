import { tv } from "tailwind-variants";

const focusRing = tv({
  base: "outline outline-offset-2 outline-focus forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

export default focusRing;
