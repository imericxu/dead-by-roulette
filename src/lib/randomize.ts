import {
  dbd,
  type AddOn,
  type GameEntity,
  type Item,
  type ItemType,
  type Killer,
  type Offering,
  type Perk,
  type Survivor,
} from "@/lib/dbd";
import DbdRole from "@/lib/dbdRole";
import type Loadout from "@/lib/loadout";
import { type LoadoutConfig } from "@/lib/settings";
import {
  binarySearchFind,
  pickNRandomWithoutReplacement,
  pickRandom,
} from "@/lib/utils";
import binarySearch from "binary-search";
import { match } from "ts-pattern";

/**
 * Randomize a loadout based on the given configuration and role.
 */
export function randomizeLoadout(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
): Loadout {
  const character: Killer | Survivor = _randomizeCharacter(config, role);

  const ability: GameEntity | Item = match(role)
    .with(DbdRole.killer, (): GameEntity => {
      const killer: Killer = character as Killer;
      return {
        id: killer.id,
        name: killer.power,
        img: killer.powerImg,
      };
    })
    .with(DbdRole.survivor, (): Item => _randomizeSurvivorItem(config))
    .exhaustive();

  const addOns: AddOn[] = match(role)
    .with(DbdRole.killer, () =>
      _randomizeKillerAddOns(config, character as Killer),
    )
    .with(DbdRole.survivor, () =>
      _randomizeSurvivorAddOns(config, ability as Item),
    )
    .exhaustive();

  const offering: Offering = _randomizeOffering(config, role);

  const perks: Perk[] = _randomizePerks(config, role);

  return {
    character,
    ability,
    addOns,
    offering,
    perks,
  };
}

/**
 * Randomize the character of a loadout.
 *
 * If the role is killer, the power will be updated and the add-ons will be
 * randomized as well.
 */
export function randomizeCharacter(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
  loadout: Readonly<Loadout>,
): Loadout {
  const randomCharacter: Killer | Survivor = _randomizeCharacter(config, role);

  return match(role)
    .with(DbdRole.killer, () => {
      const killer: Killer = randomCharacter as Killer;
      const ability: GameEntity = {
        id: killer.id,
        name: killer.power,
        img: killer.powerImg,
      };
      const addOns: AddOn[] = _randomizeKillerAddOns(config, killer);
      return { ...loadout, character: killer, ability, addOns };
    })
    .with(DbdRole.survivor, () => ({
      ...loadout,
      character: randomCharacter,
    }))
    .exhaustive();
}

/**
 * Randomize the ability of a loadout.
 *
 * If the role is killer, this will be equivalent to randomizing the character.
 *
 * If the role is survivor, this will randomize the item and its add-ons.
 */
export function randomizeAbility(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
  loadout: Readonly<Loadout>,
): Loadout {
  return match(role)
    .with(DbdRole.killer, (role) => randomizeCharacter(config, role, loadout))
    .with(DbdRole.survivor, () => {
      const ability: Item = _randomizeSurvivorItem(config);
      const addOns: AddOn[] = _randomizeSurvivorAddOns(config, ability);
      return { ...loadout, ability, addOns };
    })
    .exhaustive();
}

/**
 * Randomize the add-ons of a loadout.
 */
export function randomizeAddOns(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
  loadout: Readonly<Loadout>,
): Loadout {
  return {
    ...loadout,
    addOns: match(role)
      .with(DbdRole.killer, () =>
        _randomizeKillerAddOns(config, loadout.character as Killer),
      )
      .with(DbdRole.survivor, () =>
        _randomizeSurvivorAddOns(config, loadout.ability as Item),
      )
      .exhaustive(),
  };
}

export function randomizeAddOn(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
  loadout: Readonly<Loadout>,
  index: number,
): Loadout {
  const addOns: AddOn[] = loadout.addOns.slice();
  const selection: number[] = match(role)
    .with(DbdRole.killer, () => (loadout.character as Killer).addOnIds)
    .with(
      DbdRole.survivor,
      () => _itemTypeFromItem(loadout.ability as Item).addOnIds,
    )
    .exhaustive()
    .filter(
      (id) =>
        !config.disabledEntities.addOns.has(id) &&
        !addOns.some((addOn) => addOn.id === id),
    );
  if (selection.length === 0) return loadout;
  const newAddOn: AddOn = binarySearchFind(
    match(role)
      .with(DbdRole.killer, () => dbd.killerRelated.addOns)
      .with(DbdRole.survivor, () => dbd.survivorRelated.addOns)
      .exhaustive(),
    pickRandom(selection),
    (value, needle) => value.id - needle,
  );
  addOns.splice(index, 1, newAddOn);
  return { ...loadout, addOns };
}

export function randomizeOffering(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
  loadout: Readonly<Loadout>,
): Loadout {
  return {
    ...loadout,
    offering: _randomizeOffering(config, role),
  };
}

export function randomizePerks(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
  loadout: Readonly<Loadout>,
): Loadout {
  return {
    ...loadout,
    perks: _randomizePerks(config, role),
  };
}

export function randomizePerk(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
  loadout: Readonly<Loadout>,
  index: number,
): Loadout {
  const perks: Perk[] = loadout.perks.slice();
  const newPerk: Perk = pickRandom(
    match(role)
      .with(DbdRole.killer, () => dbd.killerRelated.perks)
      .with(DbdRole.survivor, () => dbd.survivorRelated.perks)
      .exhaustive()
      .filter(
        (perk) =>
          !config.disabledEntities.perks.has(perk.id) &&
          !perks.some((p) => p.id === perk.id),
      ),
  );
  perks.splice(index, 1, newPerk);
  return {
    ...loadout,
    perks,
  };
}

function _randomizeCharacter(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
): Killer | Survivor {
  return pickRandom(
    match(role)
      .with(DbdRole.killer, () => dbd.killerRelated.killers)
      .with(DbdRole.survivor, () => dbd.survivorRelated.survivors)
      .exhaustive()
      .filter(
        (character) => !config.disabledEntities.characters.has(character.id),
      ),
  );
}

function _randomizeKillerAddOns(
  config: Readonly<LoadoutConfig>,
  killer: Readonly<Killer>,
): AddOn[] {
  return pickNRandomWithoutReplacement(
    killer.addOnIds.filter((id) => !config.disabledEntities.addOns.has(id)),
    2,
  ).map<AddOn>((id) =>
    binarySearchFind(
      dbd.killerRelated.addOns,
      id,
      (value, needle) => value.id - needle,
    ),
  );
}

function _randomizeSurvivorItem(config: Readonly<LoadoutConfig>): Item {
  const itemType: ItemType = pickRandom(
    dbd.survivorRelated.itemTypes.filter(
      (itemType) => !config.disabledEntities.itemTypes.has(itemType.id),
    ),
  );
  return binarySearchFind(
    dbd.survivorRelated.items,
    pickRandom(itemType.itemIds),
    (value, needle) => {
      return value.id - needle;
    },
  );
}

function _randomizeSurvivorAddOns(
  config: Readonly<LoadoutConfig>,
  item: Readonly<Item>,
): AddOn[] {
  const itemType: ItemType = _itemTypeFromItem(item);
  return pickNRandomWithoutReplacement(
    itemType.addOnIds.filter((id) => !config.disabledEntities.addOns.has(id)),
    2,
  ).map<AddOn>((id) =>
    binarySearchFind(
      dbd.survivorRelated.addOns,
      id,
      (value, needle) => value.id - needle,
    ),
  );
}

function _randomizeOffering(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
): Offering {
  return pickRandom(
    match(role)
      .with(DbdRole.killer, () => dbd.killerRelated.offerings)
      .with(DbdRole.survivor, () => dbd.survivorRelated.offerings)
      .exhaustive()
      .concat(dbd.sharedOfferings)
      .filter(
        (offering) => !config.disabledEntities.offerings.has(offering.id),
      ),
  );
}

function _randomizePerks(
  config: Readonly<LoadoutConfig>,
  role: Readonly<DbdRole>,
): Perk[] {
  return pickNRandomWithoutReplacement(
    match(role)
      .with(DbdRole.killer, () => dbd.killerRelated.perks)
      .with(DbdRole.survivor, () => dbd.survivorRelated.perks)
      .exhaustive()
      .filter((perk) => !config.disabledEntities.perks.has(perk.id)),
    4,
  );
}

function _itemTypeFromItem(item: Readonly<Item>): ItemType {
  // Go through each item type and binary search for the item id.
  for (const itemType of dbd.survivorRelated.itemTypes) {
    if (
      binarySearch(itemType.itemIds, item.id, (id, needle) => id - needle) >= 0
    ) {
      return itemType;
    }
  }
  throw new Error("Item type not found for item.");
}
