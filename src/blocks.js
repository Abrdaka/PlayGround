import { T } from './textures.js'

export const B = {
  AIR: 0, GRASS: 1, DIRT: 2, STONE: 3, LOG: 4, LEAVES: 5, SAND: 6, PLANKS: 7,
  COBBLE: 8, IRON: 9, WATER: 10, CONCRETE: 11, GLASS: 12, CRATE: 13,
  GRAVEL: 14, ASPHALT: 15, BEDROCK: 16, METAL: 17, PATH: 18, TALLGRASS: 19,
  FLOWER_R: 20, FLOWER_Y: 21, MOSS: 22,
}

// tiles: [top, bottom, side] atlas indices
export const BLOCKS = {
  [B.AIR]: { name: 'Air', solid: false, transparent: true, tile: T.DIRT },
  [B.GRASS]: { name: 'Grass', solid: true, tiles: [T.GRASS_TOP, T.DIRT, T.GRASS_SIDE], hp: 12, power: 10, tool: 'axe', drop: null, color: 0x568a35 },
  [B.DIRT]: { name: 'Dirt', solid: true, tile: T.DIRT, hp: 12, power: 10, tool: 'pick', drop: 'dirt', dropCount: 1, color: 0x6b4f31 },
  [B.STONE]: { name: 'Stone', solid: true, tile: T.STONE, hp: 52, power: 7, tool: 'pick', drop: 'stone', dropCount: 2, color: 0x83868a },
  [B.LOG]: { name: 'Wood Log', solid: true, tiles: [T.LOG_TOP, T.LOG_TOP, T.LOG_SIDE], hp: 48, power: 6, tool: 'axe', drop: 'wood', dropCount: 3, color: 0x5a4026 },
  [B.LEAVES]: { name: 'Leaves', solid: true, tile: T.LEAVES, alphaTest: true, hp: 4, power: 4, tool: 'axe', drop: 'wood', dropChance: 0.18, dropCount: 1, color: 0x35612a },
  [B.SAND]: { name: 'Sand', solid: true, tile: T.SAND, hp: 10, power: 10, tool: 'pick', drop: null, color: 0xcdbb84 },
  [B.PLANKS]: { name: 'Wood Planks', solid: true, tile: T.PLANKS, hp: 36, power: 8, tool: 'axe', drop: 'planks', dropCount: 1, color: 0xa37d4c },
  [B.COBBLE]: { name: 'Cobblestone', solid: true, tile: T.COBBLE, hp: 64, power: 8, tool: 'pick', drop: 'cobble', dropCount: 1, color: 0x7b7e82 },
  [B.IRON]: { name: 'Iron Ore', solid: true, tile: T.IRON, hp: 110, power: 5, tool: 'pick', needsPick: true, drop: 'iron', dropCount: 2, color: 0x9c7c68 },
  [B.WATER]: { name: 'Water', solid: false, transparent: true, water: true, tile: T.WATER, color: 0x2f739f },
  [B.CONCRETE]: { name: 'Concrete', solid: true, tile: T.CONCRETE, hp: 80, power: 6, tool: 'pick', drop: 'stone', dropCount: 1, color: 0x9c9a92 },
  [B.GLASS]: { name: 'Glass', solid: true, transparent: true, glass: true, tile: T.GLASS, hp: 6, power: 30, tool: 'pick', color: 0xa9d0d8 },
  [B.CRATE]: { name: 'Supply Crate', solid: true, tiles: [T.CRATE_TOP, T.CRATE_TOP, T.CRATE_SIDE], hp: 20, power: 12, tool: 'any', crate: true, color: 0x9a7540 },
  [B.GRAVEL]: { name: 'Gravel', solid: true, tile: T.GRAVEL, hp: 20, power: 8, tool: 'pick', drop: null, color: 0x77736c },
  [B.ASPHALT]: { name: 'Asphalt', solid: true, tile: T.ASPHALT, hp: 70, power: 6, tool: 'pick', drop: null, color: 0x3d3f42 },
  [B.BEDROCK]: { name: 'Bedrock', solid: true, tile: T.BEDROCK, hp: Infinity, power: 0, tool: 'none', color: 0x35373a },
  [B.METAL]: { name: 'Rusted Metal', solid: true, tile: T.METAL, hp: 95, power: 5, tool: 'pick', drop: 'iron', dropCount: 1, color: 0x5d666d },
  [B.PATH]: { name: 'Dirt Path', solid: true, tile: T.PATH, hp: 10, power: 10, tool: 'pick', drop: null, color: 0x8a7148 },
  [B.TALLGRASS]: { name: 'Tall Grass', solid: false, transparent: true, plant: T.TALLGRASS, color: 0x5b8d38 },
  [B.FLOWER_R]: { name: 'Poppy', solid: false, transparent: true, plant: T.FLOWER_R, color: 0xc94a3d },
  [B.FLOWER_Y]: { name: 'Dandelion', solid: false, transparent: true, plant: T.FLOWER_Y, color: 0xd9b23a },
  [B.MOSS]: { name: 'Mossy Stone', solid: true, tile: T.MOSS, hp: 60, power: 7, tool: 'pick', drop: 'stone', dropCount: 2, color: 0x5f7342 },
}

export function blockDef(id) { return BLOCKS[id] || BLOCKS[B.AIR] }
export function isSolid(id) { return blockDef(id).solid === true }
export function isOpaque(id) {
  const d = blockDef(id)
  return d.solid && !d.transparent
}
