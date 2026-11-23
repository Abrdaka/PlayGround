export const ITEMS = {
  axe: { name: 'Stone Axe', kind: 'tool', desc: 'Chops wood fast. Also a decent club.' },
  pick: { name: 'Stone Pickaxe', kind: 'tool', desc: 'Mines stone and iron ore.' },
  pistol: { name: '9mm Pistol', kind: 'weapon', desc: 'Hits hard. Ammo is precious.' },
  food: { name: 'Canned Food', kind: 'food', desc: 'Restores 32 hunger.' },
  water: { name: 'Purified Water', kind: 'drink', desc: 'Restores 38 thirst.' },
  bandage: { name: 'Bandage', kind: 'heal', desc: 'Heals 30 health.' },
  wood: { name: 'Wood', kind: 'resource', desc: 'From logs and trees.' },
  stone: { name: 'Stone', kind: 'resource', desc: 'Mined from rock.' },
  iron: { name: 'Iron', kind: 'resource', desc: 'Smelted ore scrap.' },
  cloth: { name: 'Cloth', kind: 'resource', desc: 'Torn from the undead.' },
  ammo: { name: '9mm Rounds', kind: 'ammo', desc: 'Pistol ammunition.' },
  planks_block: { name: 'Wood Planks', kind: 'block', desc: 'Place with the building slot.' },
  cobble_block: { name: 'Cobblestone', kind: 'block', desc: 'Sturdy building block.' },
}

export const RECIPES = [
  { id: 'planks_block', out: 'planks_block', count: 4, cost: { wood: 1 }, label: 'Saw planks' },
  { id: 'cobble_block', out: 'cobble_block', count: 4, cost: { stone: 2 }, label: 'Split cobble' },
  { id: 'ammo', out: 'ammo', count: 12, cost: { iron: 2, stone: 1 }, label: 'Cast 9mm rounds' },
  { id: 'bandage', out: 'bandage', count: 1, cost: { cloth: 2 }, label: 'Wrap bandage' },
  { id: 'pick', out: 'pick', count: 1, cost: { wood: 3, stone: 3 }, label: 'Stone pickaxe' },
  { id: 'pistol', out: 'pistol', count: 1, cost: { iron: 8, wood: 4 }, label: 'Assemble pistol' },
]

export function starterInventory() {
  return { axe: 1, pick: 1, pistol: 1, ammo: 18, food: 2, water: 2, bandage: 2, wood: 8, stone: 6, iron: 2, cloth: 1, planks_block: 12, cobble_block: 8 }
}

export function canCraft(inv, recipe) {
  return Object.entries(recipe.cost).every(([k, n]) => (inv[k] || 0) >= n)
}

export function craft(inv, recipe) {
  if (!canCraft(inv, recipe)) return false
  for (const [k, n] of Object.entries(recipe.cost)) inv[k] -= n
  inv[recipe.out] = (inv[recipe.out] || 0) + recipe.count
  return true
}

const S = (inner, extra = '') => `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" ${extra}>${inner}</svg>`

export function iconSVG(key) {
  switch (key) {
    case 'axe': return S(`<rect x="14" y="7" width="4" height="21" rx="1.5" fill="#8a6236"/><path d="M17 6c6 0 9 4 9 4s-3 4-9 4z" fill="#a7abb0"/><path d="M17 6c4 1 6 4 6 4s-2 3-6 4z" fill="#c4c8cc"/>`)
    case 'pick': return S(`<rect x="14" y="7" width="4" height="21" rx="1.5" fill="#8a6236" transform="rotate(-8 16 16)"/><path d="M4 10c5-5 19-5 24 0-6-1-18-1-24 0z" fill="#a7abb0"/><path d="M4 10c3 2 6 3 9 3l-2 2c-3-1-5-3-7-5z" fill="#c4c8cc"/>`)
    case 'pistol': return S(`<rect x="5" y="10" width="21" height="7" rx="1.5" fill="#3b4147"/><rect x="7" y="11" width="19" height="2" fill="#586068"/><rect x="10" y="16" width="7" height="10" rx="2" fill="#2b2a28" transform="rotate(-10 13 20)"/><rect x="24" y="11" width="5" height="3" fill="#4b5258"/><rect x="25" y="9" width="2" height="2" fill="#c9ced3"/>`)
    case 'food': return S(`<rect x="9" y="6" width="14" height="21" rx="3" fill="#b34a35"/><rect x="9" y="11" width="14" height="10" fill="#d8c39b"/><rect x="12" y="14" width="8" height="4" rx="1" fill="#7a4b2e"/><rect x="9" y="6" width="14" height="3" rx="1.5" fill="#9aa1a7"/>`)
    case 'water': return S(`<path d="M13 5h6v4l3 4v14a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V13l3-4z" fill="#7fc4d8" stroke="#3d7f96" stroke-width="1.4"/><rect x="13" y="3" width="6" height="3" rx="1" fill="#2f6f8a"/><path d="M14 16h4v8h-4z" fill="#a9deec" opacity=".7"/>`)
    case 'bandage': return S(`<rect x="5" y="11" width="22" height="11" rx="5" fill="#ece5d6" stroke="#c3b9a4" stroke-width="1.2"/><circle cx="16" cy="16.5" r="3.2" fill="#d8ceba"/><path d="M22 18c3 1 5 4 5 8h-4c0-3-1-5-3-6z" fill="#f2ecdd"/>`)
    case 'wood': return S(`<rect x="5" y="12" width="22" height="7" rx="3" fill="#6b4a2a" transform="rotate(-10 16 16)"/><rect x="5" y="18" width="22" height="7" rx="3" fill="#7d5934" transform="rotate(-4 16 16)"/><circle cx="8" cy="16" r="2.2" fill="#a67c4e"/><circle cx="8" cy="21" r="2.2" fill="#a67c4e"/>`)
    case 'stone': return S(`<path d="M7 21l3-9 8-5 8 5 2 9-7 5H12z" fill="#85898d"/><path d="M10 12l8-5 8 5-8 3z" fill="#a3a7ab"/><path d="M18 15l8-3 2 9-7 5z" fill="#6f7377"/>`)
    case 'iron': return S(`<path d="M8 12h16l4 6-3 6H7l-3-6z" fill="#9aa4ab"/><path d="M8 12h16l2 3H9z" fill="#c0c9cf"/><path d="M7 24h18l-3 2H9z" fill="#6f787e"/>`)
    case 'cloth': return S(`<path d="M6 12c4-3 8 2 12-1s7 1 8 4-3 6-7 5-7 3-11 1-5-6-2-9z" fill="#c8bda6"/><path d="M9 14c5 2 10-2 15 0M9 19c5 2 10-1 15 1" stroke="#a89c85" stroke-width="1.2" fill="none"/>`)
    case 'ammo': return S(`<g fill="#c9a24b"><rect x="6" y="12" width="5" height="14" rx="1"/><rect x="14" y="10" width="5" height="16" rx="1"/><rect x="22" y="13" width="5" height="13" rx="1"/></g><g fill="#a97e37"><rect x="6" y="12" width="5" height="3"/><rect x="14" y="10" width="5" height="3"/><rect x="22" y="13" width="5" height="3"/></g>`)
    case 'planks_block': return S(`<path d="M5 9h22v14H5z" fill="#a37d4c"/><path d="M5 12h22M5 16h22M5 20h22" stroke="#6f5332" stroke-width="1.6"/><path d="M5 9h22v3H5z" fill="#b8905c"/>`)
    case 'cobble_block': return S(`<path d="M5 9h22v14H5z" fill="#7b7e82"/><path d="M6 10h7v5H6zM15 11h8v4h-8zM8 17h6v4H8zM17 16h7v5h-7z" fill="#8f9296"/><path d="M13 10h2v5h-2zM23 15h2v5h-2z" fill="#63666a"/>`)
    default: return S(`<rect x="8" y="8" width="16" height="16" rx="3" fill="#777"/>`)
  }
}
