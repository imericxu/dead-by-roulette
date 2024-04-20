import { tv } from "tailwind-variants";
import { Rarity } from "../dbd";

const rarityVariants = tv({
  variants: {
    rarity: {
      common: "bg-gradient-to-b from-yellow-900 to-yellow-950",
      uncommon: "bg-gradient-to-b from-yellow-600/90 to-yellow-800/90",
      rare: "bg-gradient-to-b from-green-800/90 to-green-950/90",
      veryRare: "bg-gradient-to-b from-violet-800/90 to-violet-950/85",
      ultraRare: "bg-gradient-to-b from-rose-700 to-rose-950",
    },
  },
});

export default function rarityBg(rarity: Rarity): string {
  return rarityVariants({ rarity });
}
