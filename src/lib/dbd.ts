import _dbd from "@/data/dbd.json";

export interface Dbd {
  killerRelated: DbdKillerRelated;
  survivorRelated: DbdSurvivorRelated;
  sharedOfferings: Offering[];
}

export interface DbdKillerRelated {
  killers: Killer[];
  addOns: AddOn[];
  offerings: Offering[];
  perks: Perk[];
}

export interface DbdSurvivorRelated {
  survivors: Survivor[];
  itemTypes: ItemType[];
  items: Item[];
  addOns: AddOn[];
  offerings: Offering[];
  perks: Perk[];
}

export enum Rarity {
  common = "common",
  uncommon = "uncommon",
  rare = "rare",
  veryRare = "veryRare",
  ultraRare = "ultraRare",
}

export interface GameEntity {
  id: number;
  name: string;
  img: string;
}

export interface GameEntityWithRarity extends GameEntity {
  rarity: Rarity;
}

export interface Character extends GameEntity {
  bigImg: string;
  perkIds: number[];
}

export interface Killer extends Character {
  power: string;
  powerImg: string;
  addOnIds: number[];
}

export interface Survivor extends Character {}

export interface ItemType extends GameEntity {
  itemIds: number[];
  addOnIds: number[];
}

export interface Item extends GameEntityWithRarity {}

export interface AddOn extends GameEntityWithRarity {}

export enum OfferingCategory {
  bloodpoints = "bloodpoints",
  luck = "luck",
  mapModifier = "mapModifier",
  mori = "mori",
  realm = "realm",
  shroud = "shroud",
  ward = "ward",
}

export interface Offering extends GameEntityWithRarity {
  category: OfferingCategory;
}

export interface Perk extends GameEntity {}

export const dbd: Dbd = _dbd as Dbd;
// Sort all arrays by id
dbd.killerRelated.killers.sort((a, b) => a.id - b.id);
dbd.killerRelated.killers.forEach((killer) => {
  killer.perkIds.sort((a, b) => a - b);
  killer.addOnIds.sort((a, b) => a - b);
});
dbd.killerRelated.addOns.sort((a, b) => a.id - b.id);
dbd.killerRelated.offerings.sort((a, b) => a.id - b.id);
dbd.killerRelated.perks.sort((a, b) => a.id - b.id);

dbd.survivorRelated.survivors.sort((a, b) => a.id - b.id);
dbd.survivorRelated.survivors.forEach((survivor) => {
  survivor.perkIds.sort((a, b) => a - b);
});
dbd.survivorRelated.itemTypes.sort((a, b) => a.id - b.id);
dbd.survivorRelated.itemTypes.forEach((itemType) => {
  itemType.itemIds.sort((a, b) => a - b);
  itemType.addOnIds.sort((a, b) => a - b);
});
dbd.survivorRelated.items.sort((a, b) => a.id - b.id);
dbd.survivorRelated.addOns.sort((a, b) => a.id - b.id);
dbd.survivorRelated.offerings.sort((a, b) => a.id - b.id);
dbd.survivorRelated.perks.sort((a, b) => a.id - b.id);

dbd.sharedOfferings.sort((a, b) => a.id - b.id);
