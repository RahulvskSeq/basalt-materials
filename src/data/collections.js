import { IMG } from './images.js'

export const collections = [
  { id: 'monolith', index: '01', name: 'Monolith', count: 38, finish: 'Deep Matt', image: IMG.surfaceBlack,
    note: 'Near-black surfaces with a fine mineral fleck. Reads flat from the front, metallic on the turn.' },
  { id: 'oxide', index: '02', name: 'Oxide', count: 24, finish: 'Micro Texture', image: IMG.facadeBrick,
    note: 'Weathered steel and rust tones, scanned from Corten panels after two years of exposure.' },
  { id: 'fair-face', index: '03', name: 'Fair-Face', count: 31, finish: 'Honed', image: IMG.plasterWall,
    note: 'Shuttered concrete with the tie-holes and board marks kept in, at true 1:1 scale.' },
  { id: 'quarry', index: '04', name: 'Quarry', count: 29, finish: 'Riven', image: IMG.stoneBath,
    note: 'Slate, basalt and granite with a cleft texture you can feel across the full sheet.' },
  { id: 'grain', index: '05', name: 'Grain', count: 42, finish: 'Registered Emboss', image: IMG.panelWood,
    note: 'Timber where the emboss is registered to the print, so touch and sight agree.' },
  { id: 'alloy', index: '06', name: 'Alloy', count: 19, finish: 'Brushed Metal', image: IMG.vesselsDark,
    note: 'Bronze, zinc and blackened steel over a genuine foil layer, so the sheen travels.' },
]
