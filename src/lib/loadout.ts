import {
  type AddOn,
  type Character,
  type GameEntity,
  type Item,
  type Offering,
  type Perk,
} from "@/lib/dbd";

export default interface Loadout {
  character: Character;
  ability: GameEntity | Item;
  addOns: AddOn[];
  offering: Offering;
  perks: Perk[];
}

export enum LoadoutPart {
  all = "all",
  character = "character",
  ability = "ability",
  addOns = "addOns",
  addOn = "addOn",
  offering = "offering",
  perks = "perks",
  perk = "perk",
}
