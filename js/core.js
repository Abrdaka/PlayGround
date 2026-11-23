/* LAST LIGHT — shared world data & math helpers */
export const CELL = 2;
export const MAPW = 36;
export const MAPH = 36;
export const WALL_H = 3.0;
export const WALL_T = 0.34;

export const MAP_ROWS = [
'ffffffffffffffffffffffffffffffffffff',
'fgggggggggggggg;....;gggggggggggggxf',
'fg#W####W#ggggg;....;||W||%%%%%%%%gf',
'fg#tttttt#ggggg;....;|FFF|%tttttt%gf',
'fg#tttttt#ggggg;....;|FFFD%tttttt%gf',
'fg#tttttt#ggggg;....;|FFF|%tttttt%gf',
'fg#tttttt#ggggg;....;|||||%tttttt%gf',
'fg###D####ggggg;....;ggggg%tttttt%gf',
'fgggggggggggggx;....;ggggg%W%D%W%%gf',
'fggggggggg||||g;....;|||||gggggggggf',
'fg||D|||gg|FF|g;....;|FFF|gggggggggf',
'fg|FFFF|ggDFF|g;....;|FFFDgggggggggf',
'fg|FFFF|gg|FF|g;....;|FFF|gggggggggf',
'fg||||W|gg||W|g;....;||W||gggggggggf',
'fgggggggggggggg;....;gxggggggggggggf',
'f;;;;;;;;;;;;;;;....;;;;;;;;;;;;;;;f',
'f..................................f',
'f..................................f',
'f..................................f',
'f..................................f',
'f;;;;;;;;;;;;;;;....;;;x;;;;;;;;;;;f',
'fgggggggggggggg;....;ggggggggggggggf',
'fg||||ggggggggg;....;ggggggggggggggf',
'fg|cc|ggggggggg;....;ggggggggggggggf',
'fg|ccDggggggggg;....;gggg###d##d##ggf',
'fg|cc|###D####g;....;ggg#FFFFFFF#ggf',
'fg||||#FFFFFF#g;....;ggg#FFFFFFF#ggf',
'fggggg#FFFFFF#g;....;gggDFFFFFFF#ggf',
'fggggg#FFFFFF#g;....;|D||FFFFFFFdggf',
'fggggg#FFFFFF#g;....;|cc|FFFFFFF#ggf',
'fggggg#FFFFFF#g;....;|cc|FFFFFFF#ggf',
'fggggg#FFFFFF#g;....;|cc|##W#####ggf',
'fggggg##W##W##g;....;||||ggggggggggf',
'fxggggggggggggg;....;ggggggggggggxgf',
'fggggggggggggggx....;ggggggggggggggf',
'ffffffffffffffffffffffffffffffffffff'
];

const WALLS = new Set(['#', '%', '|', 'f']);
export const isWallChar = c => WALLS.has(c);
export const cellAt = (x, y) => (x < 0 || y < 0 || x >= MAPW || y >= MAPH) ? '#' : MAP_ROWS[y][x];
export const isWall = (x, y) => WALLS.has(cellAt(x, y));
export const isSolid = (x, y) => {
  const c = cellAt(x, y);
  return WALLS.has(c) || c === 'x';
};
// Path planning treats doors and windows as passable: the dead are drawn to them.
export const pathBlocked = (x, y) => {
  const c = cellAt(x, y);
  return WALLS.has(c) || c === 'x';
};
export const blocksSight = (x, y) => {
  const c = cellAt(x, y);
  return WALLS.has(c) || c === 'x' || c === 'D' || c === 'W';
};
export const worldX = gx => (gx - MAPW / 2) * CELL;
export const worldZ = gy => (gy - MAPH / 2) * CELL;
export const gridX = wx => wx / CELL + MAPW / 2;
export const gridZ = wz => wz / CELL + MAPH / 2;
export const worldToGrid = (x, z) => ({ gx: gridX(x), gy: gridZ(z) });
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const damp = (a, b, rate, dt) => lerp(a, b, 1 - Math.exp(-rate * dt));
export const smoothstep = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
export function dist(x1, y1, x2, y2) { return Math.hypot(x1 - x2, y1 - y2); }
export function angleDiff(a, b) { return Math.atan2(Math.sin(a - b), Math.cos(a - b)); }

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function hash2(x, y) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Landmark metadata used by the HUD and world props.
export const LANDMARKS = {
  safehouse: { gx: 9.5, gy: 28.5, name: 'SAFEHOUSE' },
  pickup: { gx: 17.5, gy: 23.5, name: 'DEAD PICKUP' },
  police: { gx: 18.5, gy: 6.5, name: 'POLICE CRUISER' },
  store: { gx: 28.5, gy: 5.5, name: 'CORNER STORE' },
  hardware: { gx: 4.5, gy: 4.5, name: 'HARDWARE STORE' },
  ransacked: { gx: 27.5, gy: 27.5, name: 'RANSACKED HOUSE' },
  shed: { gx: 3.5, gy: 23.5, name: 'TOOL SHED' },
};

export const LOOT_SPOTS = [
  { gx: 4.5, gy: 4.5, label: 'Hardware store · supplies', loot: { wood: 4, scrap: 2, parts: 1 } },
  { gx: 28.5, gy: 5.5, label: 'Corner store · provisions', loot: { food: 2, cloth: 1, chem: 1 } },
  { gx: 27.5, gy: 27.5, label: 'Ransacked house · cabinets', loot: { cloth: 2, chem: 1, food: 1 } },
  { gx: 3.5, gy: 23.5, label: 'Tool shed · workbench', loot: { wood: 3, scrap: 2, parts: 1 } },
  { gx: 18.5, gy: 6.5, label: 'Police cruiser · evidence', loot: { ammo: 2, scrap: 2, parts: 1 } },
  { gx: 18.5, gy: 25.5, label: 'Roadside duffel', loot: { food: 1, ammo: 1, fuel: 1 } },
  { gx: 28.5, gy: 18.5, label: 'Overturned cart', loot: { scrap: 1, chem: 1, cloth: 1 } },
  { gx: 4.5, gy: 11.5, label: 'House · kitchen drawers', loot: { fuel: 1, cloth: 1 } },
  { gx: 23.5, gy: 11.5, label: 'House · hallway closet', loot: { wood: 2, food: 1 } },
];

export const ZOMBIE_SPAWNS = [
  [17.5, 8.5], [17.5, 13.5], [25.5, 17.5], [30.5, 17.5],
  [17.5, 30.5], [10.5, 17.5], [2.5, 14.5], [23.5, 21.5],
  [12.5, 21.5], [33.0, 23.5]
];

export const NIGHT_SPAWNS = [
  [17.5, 1.8], [17.5, 34.0], [1.8, 17.5], [34.0, 17.5],
  [10.0, 17.5], [26.0, 17.5], [17.5, 14.0], [17.5, 26.5]
];
