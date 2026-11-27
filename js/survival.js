/* LAST LIGHT — survival data: loot, items, weapons, books, perks, traders
 *
 * The design borrows the loop from two games the survivor would recognise:
 *  - 7 Days to Die : loot containers, magazines that unlock recipes, trader
 *                    outposts, weapon tiers, XP + perks, base upgrades.
 *  - Project Zomboid: weight-based carry, weapon condition, bleeding, reading
 *                    skill books, scarce ammo, one bad fight ends the run.
 *
 * Everything here is pure data / pure functions so the main loop stays readable.
 */

/* ---------------------------------------------------------------- resources */
export const RES_KEYS = [
  'wood', 'scrap', 'cloth', 'leather', 'nails', 'parts',
  'electronics', 'chem', 'food', 'fuel', 'ammo', 'dukes',
];

export const ITEMS = {
  wood:        { name: 'Planks',      desc: 'Walls, boards, weapon handles', weight: 1,   value: 2,  cat: 'mat' },
  scrap:       { name: 'Scrap',       desc: 'Bent metal, salvage',           weight: 1,   value: 3,  cat: 'mat' },
  cloth:       { name: 'Cloth',       desc: 'Bandages and padding',          weight: .6,  value: 2,  cat: 'mat' },
  leather:     { name: 'Leather',     desc: 'Jacket panels, grips',          weight: .7,  value: 4,  cat: 'mat' },
  nails:       { name: 'Nails',       desc: 'Fasteners for upgrades',        weight: .3,  value: 2,  cat: 'mat' },
  parts:       { name: 'Parts',       desc: 'Mechanical salvage',            weight: 1,   value: 6,  cat: 'mat' },
  electronics: { name: 'Electronics', desc: 'Wire, cells, sights',           weight: .5,  value: 8,  cat: 'mat' },
  chem:        { name: 'Medicine',    desc: 'Antiseptic and painkillers',    weight: .5,  value: 5,  cat: 'med' },
  food:        { name: 'Food',        desc: 'Cans, jerky, clean water',      weight: 1,   value: 4,  cat: 'food' },
  fuel:        { name: 'Fuel',        desc: 'One can, for the pickup',       weight: 2,   value: 8,  cat: 'mat' },
  ammo:        { name: 'Ammo',        desc: 'Makeshift rounds',              weight: .25, value: 2,  cat: 'ammo' },
  dukes:       { name: 'Dukes',       desc: 'Trader currency',               weight: 0,   value: 1,  cat: 'money' },
};

/* ---------------------------------------------------------------- gear items */
/* Books, weapon drops and anything else that is not a stackable material.
   `weapon` items are converted into the owned-weapon list on pickup. */
export const GEAR = {
  book_handy:   { name: 'Handyman Weekly', kind: 'book', weight: .4, value: 45, unlock: 'handy', xp: 30,
                  desc: 'Unlocks the nailed bat, sledgehammer and padded jacket.' },
  book_guns:    { name: 'Guns & Ammo',     kind: 'book', weight: .4, value: 55, unlock: 'guns', xp: 35,
                  desc: 'Unlocks the sidearm, ammo and gunsmithing.' },
  book_blades:  { name: 'Blade Craft',     kind: 'book', weight: .4, value: 50, unlock: 'blades', xp: 30,
                  desc: 'Unlocks the machete. A clean edge beats a club.' },
  book_med:     { name: 'First Aid Today', kind: 'book', weight: .4, value: 40, unlock: 'med', xp: 30,
                  desc: 'Unlocks field dressings and better healing.' },
  book_mech:    { name: "Mechanic's Manual", kind: 'book', weight: .4, value: 45, unlock: 'mech', xp: 30,
                  desc: 'Vehicle repairs cost less scrap.' },
  book_scav:    { name: "Scavenger's Guide", kind: 'book', weight: .4, value: 55, perk: 'scavenger', xp: 25,
                  desc: 'Permanently gain a level of Scavenger.' },
  book_combat:  { name: 'Close Combat',    kind: 'book', weight: .4, value: 55, perk: 'brawler', xp: 25,
                  desc: 'Permanently gain a level of Brawler.' },
  book_marksman:{ name: 'Marksmanship',    kind: 'book', weight: .4, value: 60, perk: 'marksman', xp: 25,
                  desc: 'Permanently gain a level of Marksman.' },

  w_shiv:    { name: 'Scrap shiv',    kind: 'weapon', weapon: 'shiv',    weight: 0, value: 40 },
  w_bat:     { name: 'Nailed bat',    kind: 'weapon', weapon: 'bat',     weight: 0, value: 100 },
  w_machete: { name: 'Machete',       kind: 'weapon', weapon: 'machete', weight: 0, value: 170 },
  w_sledge:  { name: 'Sledgehammer',  kind: 'weapon', weapon: 'sledge',  weight: 0, value: 220 },
  w_pistol:  { name: 'Sidearm',       kind: 'weapon', weapon: 'pistol',  weight: 0, value: 260 },
  w_shotgun: { name: 'Pump shotgun',  kind: 'weapon', weapon: 'shotgun', weight: 0, value: 420 },
  w_rifle:   { name: 'Hunting rifle', kind: 'weapon', weapon: 'rifle',   weight: 0, value: 520 },
};

/* ---------------------------------------------------------------- weapons */
/* dmg: base per hit / pellet.  wear: condition lost per use.
   dur: uses at 100 condition (roughly).  crit: chance of a critical. */
export const WEAPONS = {
  fists: {
    name: 'Fists', kind: 'melee', dmg: 24, cd: .46, range: 2.05, cone: .95,
    st: 4, crit: .06, noise: 0, wear: 0, value: 0,
    desc: 'Quiet, free, and a good way to die.',
  },
  shiv: {
    name: 'Scrap shiv', kind: 'melee', dmg: 44, cd: .38, range: 2.0, cone: 1.0,
    st: 3, crit: .18, noise: 2, wear: 1.5, value: 45,
    desc: 'Fast and fragile. Aim for the throat.',
  },
  bat: {
    name: 'Nailed bat', kind: 'melee', dmg: 82, cd: .74, range: 2.35, cone: .98,
    st: 8, crit: .12, noise: 5, wear: .9, value: 110,
    desc: 'Heavy swing. Staggers almost anything.',
  },
  machete: {
    name: 'Machete', kind: 'melee', dmg: 68, cd: .42, range: 2.2, cone: .92,
    st: 5, crit: .25, noise: 3, wear: 1.2, value: 165,
    desc: 'A real blade. High critical chance.',
  },
  sledge: {
    name: 'Sledgehammer', kind: 'melee', dmg: 165, cd: 1.05, range: 2.55, cone: 1.2,
    st: 14, crit: .1, noise: 9, wear: .65, value: 225,
    desc: 'Slow. Breaks bones and barricades alike.',
  },
  pistol: {
    name: 'Sidearm', kind: 'gun', dmg: 120, cd: .5, range: 26, cone: .1,
    st: 1, crit: .14, noise: 34, wear: 1.1, ammo: 1, value: 260,
    desc: 'Loud, accurate, one round at a time.',
  },
  shotgun: {
    name: 'Pump shotgun', kind: 'gun', dmg: 64, cd: .9, range: 14, cone: .32,
    st: 2, crit: .1, noise: 42, wear: 1.6, ammo: 1, pellets: 3, value: 420,
    desc: 'Three pellets. Devastating in a hallway.',
  },
  rifle: {
    name: 'Hunting rifle', kind: 'gun', dmg: 210, cd: 1.05, range: 34, cone: .07,
    st: 2, crit: .22, noise: 46, wear: 1.2, ammo: 1, pierce: 2, value: 520,
    desc: 'Long range, punches through two bodies.',
  },
};

/* ---------------------------------------------------------------- recipes */
/* book:  reading this book unlocks the recipe.
   bench: requires standing at the safehouse workbench.
   gives: weapon / resource / heal / armor. */
export const RECIPES = [
  {
    id: 'shiv', name: 'Scrap shiv', desc: 'A crude blade. Better than bare hands.',
    cost: { scrap: 2, cloth: 1 }, gives: { weapon: 'shiv' }, xp: 8,
  },
  {
    id: 'nails', name: 'Nails', desc: 'Hammer scrap into fasteners for upgrades.',
    cost: { scrap: 2 }, gives: { nails: 6 }, xp: 4,
  },
  {
    id: 'bat', name: 'Nailed bat', desc: 'Heavy, slow, devastating up close.',
    cost: { wood: 3, scrap: 1, nails: 1 }, gives: { weapon: 'bat' }, book: 'handy', xp: 12,
  },
  {
    id: 'machete', name: 'Machete', desc: 'A sharpened leaf spring. Fast and lethal.',
    cost: { scrap: 3, leather: 1, parts: 1 }, gives: { weapon: 'machete' },
    book: 'blades', bench: true, xp: 16,
  },
  {
    id: 'sledge', name: 'Sledgehammer', desc: 'The answer to a locked door and a crowd.',
    cost: { wood: 2, scrap: 4, parts: 2, nails: 2 }, gives: { weapon: 'sledge' },
    book: 'handy', bench: true, xp: 22,
  },
  {
    id: 'ammo', name: 'Makeshift ammo', desc: 'Six rounds. Keep the brass.',
    cost: { scrap: 1, chem: 1, nails: 1 }, gives: { ammo: 6 }, book: 'guns', xp: 6,
  },
  {
    id: 'pistol', name: 'Repaired sidearm', desc: 'A police pistol brought back from the dead.',
    cost: { parts: 2, scrap: 2, electronics: 1 }, gives: { weapon: 'pistol' },
    book: 'guns', bench: true, xp: 24,
  },
  {
    id: 'med', name: 'Field dressing', desc: 'Restore 40 health and stop the bleeding.',
    cost: { cloth: 2, chem: 1 }, gives: { heal: 40, bandage: true }, book: 'med', xp: 6,
  },
  {
    id: 'armor', name: 'Padded jacket', desc: 'Leather and cloth over the vitals. Armor +1.',
    cost: { cloth: 4, leather: 2 }, gives: { armor: 1 }, book: 'handy', bench: true, xp: 20,
  },
];

/* ---------------------------------------------------------------- perks */
export const PERKS = [
  { id: 'brawler',   name: 'Brawler',   max: 5, desc: '+8% melee damage per level' },
  { id: 'marksman',  name: 'Marksman',  max: 5, desc: '+8% firearm damage, tighter spread' },
  { id: 'scavenger', name: 'Scavenger', max: 5, desc: '+8% loot quantity and rare finds' },
  { id: 'builder',   name: 'Builder',   max: 5, desc: '+12% barricade durability' },
  { id: 'runner',    name: 'Runner',    max: 5, desc: '+8 stamina and faster recovery' },
  { id: 'medic',     name: 'Medic',     max: 5, desc: '+20% healing from supplies' },
  { id: 'mechanic',  name: 'Mechanic',  max: 5, desc: 'Repairs and upgrades cost less' },
  { id: 'toughness', name: 'Toughness', max: 5, desc: '+8 maximum health per level' },
  { id: 'dealer',    name: 'Dealer',    max: 5, desc: 'Better buy and sell prices' },
];

export const PERK_BY_ID = Object.fromEntries(PERKS.map(p => [p.id, p]));

/* ---------------------------------------------------------------- loot */
/* Weighted containers. Rare entries have low weights; tier adds one roll. */
export const LOOT_TABLES = {
  starter: [
    { id: 'w_shiv', qty: [1, 1], w: 10 },
    { id: 'scrap', qty: [2, 3], w: 8 },
    { id: 'cloth', qty: [2, 3], w: 8 },
    { id: 'food', qty: [1, 2], w: 6 },
    { id: 'dukes', qty: [10, 20], w: 5 },
  ],
  hardware: [
    { id: 'wood', qty: [2, 4], w: 7 },
    { id: 'scrap', qty: [1, 3], w: 7 },
    { id: 'nails', qty: [2, 5], w: 6 },
    { id: 'parts', qty: [1, 2], w: 4 },
    { id: 'electronics', qty: [1, 1], w: 2 },
    { id: 'dukes', qty: [5, 15], w: 3 },
    { id: 'book_handy', qty: [1, 1], w: 1.2 },
    { id: 'w_bat', qty: [1, 1], w: .6 },
  ],
  tools: [
    { id: 'wood', qty: [2, 4], w: 5 },
    { id: 'scrap', qty: [2, 4], w: 6 },
    { id: 'nails', qty: [2, 4], w: 5 },
    { id: 'parts', qty: [1, 2], w: 4 },
    { id: 'book_handy', qty: [1, 1], w: 1 },
    { id: 'w_sledge', qty: [1, 1], w: .35 },
  ],
  store: [
    { id: 'food', qty: [1, 3], w: 7 },
    { id: 'chem', qty: [1, 2], w: 4 },
    { id: 'cloth', qty: [1, 2], w: 3 },
    { id: 'dukes', qty: [5, 15], w: 4 },
    { id: 'fuel', qty: [1, 1], w: 1.5 },
    { id: 'book_med', qty: [1, 1], w: 1 },
    { id: 'book_scav', qty: [1, 1], w: .8 },
  ],
  medical: [
    { id: 'chem', qty: [2, 3], w: 7 },
    { id: 'cloth', qty: [2, 4], w: 5 },
    { id: 'food', qty: [1, 1], w: 3 },
    { id: 'dukes', qty: [5, 10], w: 2 },
    { id: 'book_med', qty: [1, 1], w: 1.1 },
  ],
  house: [
    { id: 'cloth', qty: [1, 3], w: 6 },
    { id: 'food', qty: [1, 2], w: 5 },
    { id: 'chem', qty: [1, 1], w: 2 },
    { id: 'leather', qty: [1, 2], w: 3 },
    { id: 'dukes', qty: [4, 12], w: 3 },
    { id: 'book_scav', qty: [1, 1], w: .8 },
    { id: 'book_combat', qty: [1, 1], w: .7 },
  ],
  police: [
    { id: 'ammo', qty: [4, 8], w: 7 },
    { id: 'parts', qty: [1, 2], w: 4 },
    { id: 'dukes', qty: [10, 20], w: 3 },
    { id: 'book_guns', qty: [1, 1], w: 1.2 },
    { id: 'w_pistol', qty: [1, 1], w: .8 },
  ],
  hunting: [
    { id: 'ammo', qty: [3, 6], w: 5 },
    { id: 'food', qty: [1, 2], w: 3 },
    { id: 'cloth', qty: [1, 2], w: 3 },
    { id: 'book_marksman', qty: [1, 1], w: 1 },
    { id: 'w_rifle', qty: [1, 1], w: .5 },
    { id: 'w_shotgun', qty: [1, 1], w: .4 },
  ],
  duffel: [
    { id: 'food', qty: [1, 2], w: 4 },
    { id: 'ammo', qty: [2, 4], w: 3 },
    { id: 'fuel', qty: [1, 1], w: 2 },
    { id: 'cloth', qty: [1, 2], w: 3 },
    { id: 'dukes', qty: [3, 10], w: 2 },
    { id: 'w_shiv', qty: [1, 1], w: 1 },
  ],
};

function weightedPick(table) {
  let total = 0;
  for (const e of table) total += e.w;
  let r = Math.random() * total;
  for (const e of table) {
    r -= e.w;
    if (r <= 0) return e;
  }
  return table[table.length - 1];
}

export function rollLoot(type, tier = 1, luck = 1) {
  const table = LOOT_TABLES[type] || LOOT_TABLES.house;
  const rolls = 2 + Math.max(1, tier) + (Math.random() < Math.min(.55, (luck - 1) * .55) ? 1 : 0);
  const out = {};
  for (let i = 0; i < rolls; i++) {
    const e = weightedPick(table);
    let q = e.qty[0] + Math.floor(Math.random() * (e.qty[1] - e.qty[0] + 1));
    if (Math.random() < Math.min(.6, (luck - 1) * .5)) q += 1;
    out[e.id] = (out[e.id] || 0) + Math.max(1, q);
  }
  return out;
}

/* ---------------------------------------------------------------- trader */
export const TRADER_STOCK = [
  { key: 'ammo',        type: 'res',     qty: 24, price: 4 },
  { key: 'food',        type: 'res',     qty: 4,  price: 10 },
  { key: 'chem',        type: 'res',     qty: 3,  price: 14 },
  { key: 'nails',       type: 'res',     qty: 12, price: 3 },
  { key: 'leather',     type: 'res',     qty: 5,  price: 8 },
  { key: 'electronics', type: 'res',     qty: 3,  price: 16 },
  { key: 'fuel',        type: 'res',     qty: 2,  price: 18 },
  { key: 'wood',        type: 'res',     qty: 10, price: 3 },
  { key: 'book_handy',  type: 'gear',    qty: 1,  price: 90 },
  { key: 'book_guns',   type: 'gear',    qty: 1,  price: 120 },
  { key: 'book_med',    type: 'gear',    qty: 1,  price: 80 },
  { key: 'book_blades', type: 'gear',    qty: 1,  price: 95 },
  { key: 'book_mech',   type: 'gear',    qty: 1,  price: 85 },
  { key: 'book_scav',   type: 'gear',    qty: 1,  price: 110 },
  { key: 'w_bat',       type: 'weapon',  qty: 1,  price: 120 },
  { key: 'w_machete',   type: 'weapon',  qty: 1,  price: 190 },
  { key: 'w_pistol',    type: 'weapon',  qty: 1,  price: 300 },
  { key: 'w_shotgun',   type: 'weapon',  qty: 1,  price: 480 },
  { key: 'w_rifle',     type: 'weapon',  qty: 1,  price: 620 },
  { key: 'service_repair', type: 'service', qty: 99, price: 45 },
  { key: 'service_armor',  type: 'service', qty: 3,  price: 180 },
];

export const QUESTS = [
  {
    id: 'cull', name: 'Cull the herd', desc: 'Put down 8 infected inside the county.',
    reward: { dukes: 90, xp: 70, ammo: 8 },
  },
  {
    id: 'supply', name: 'Supply run', desc: 'Deliver 4 cloth and 2 food to the camp.',
    cost: { cloth: 4, food: 2 }, reward: { dukes: 80, xp: 60, gear: 'book_scav' },
  },
];

/* ---------------------------------------------------------------- curves */
export function xpToNext(level) {
  return 90 + Math.max(0, level - 1) * 55;
}
