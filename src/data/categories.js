import { IMG } from './images.js'

export const categories = [
  { id: 'laminates', name: 'Laminates', code: '01', spec: '0.8 / 1.0 / 1.5 mm',
    line: 'Engineered decorative surface',
    blurb: 'Kraft-cored, phenolic-bonded, melamine-surfaced. 740 decors across six emboss registers.',
    image: IMG.surfaceBlack, count: 740 },
  { id: 'plywood', name: 'Plywood', code: '02', spec: '6 – 25 mm',
    line: 'Structural substrate',
    blurb: 'Calibrated hardwood cores to IS 710 and IS 303, tested by immersion on every batch.',
    image: IMG.woodPlank, count: 52 },
  { id: 'hardware', name: 'Hardware', code: '03', spec: '80,000 cycles',
    line: 'Motion and load',
    blurb: 'Hinges, runners and lift systems specified by load rating rather than by finish.',
    image: IMG.drawerUnit, count: 226 },
  { id: 'mdf', name: 'MDF', code: '04', spec: '850–900 kg/m³',
    line: 'Machinable board',
    blurb: 'High-density moisture-resistant fibre for routed profiles, louvres and CNC work.',
    image: IMG.panelBeige, count: 34 },
  { id: 'kitchen', name: 'Kitchen', code: '05', spec: '450 / 600 / 900 mm',
    line: 'Modular systems',
    blurb: 'Tandem boxes, corner mechanisms and pull-outs on a standardised carcass module.',
    image: IMG.kitchenGraphite, count: 168 },
  { id: 'wardrobe', name: 'Wardrobe', code: '06', spec: '12 – 80 kg',
    line: 'Storage systems',
    blurb: 'Sliding gear, lift rails and internal organisers rated by panel weight and span.',
    image: IMG.suiteDark, count: 124 },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]))
