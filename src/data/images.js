/**
 * Image registry — the dark, architectural half of the verified pool.
 * Every id has been fetched and checked against the name it carries.
 */
const BASE = 'https://images.unsplash.com/photo-'
export const img = (id, w = 1200) => `${BASE}${id}?auto=format&fit=crop&w=${w}&q=72`

export const IMG = {
  /* Dark interiors */
  barDark: '1622372738946-62e02505feb3',
  kitchenGraphite: '1600489000022-c2086d79f9d4',
  kitchenMoody: '1556910633-5099dc3971e8',
  kitchenSteel: '1602028915047-37269d1a73f7',
  bathOval: '1604709177225-055f99402ea3',
  livingGreen: '1615873968403-89e068629265',
  sideboardWood: '1581858726788-75bc0f6a952d',
  stairWood: '1600607687920-4e2a09cf159d',
  suiteDark: '1617104678098-de229db51175',
  livingBalcony: '1616593969747-4797dc75033e',
  bedroomSuite: '1631049307264-da0ec9d70304',
  vesselsDark: '1565193566173-7a0ee3dbe261',
  penthouse: '1560448204-e02f11c3d0e2',
  livingWarm: '1618221195710-dd6b41faaea6',
  livingFire: '1600210491892-03d54c0aaf87',
  livingWhite: '1616137466211-f939a420be84',
  kitchenPale: '1600607686527-6fb886090705',

  /* Workplace */
  officeLoft: '1497366811353-6870744d04b2',
  officeOpen: '1568992687947-868a62a9f521',

  /* Surfaces & material */
  surfaceBlack: '1550684376-efcbd6e3f031',
  plasterWall: '1523413363574-c30aa1c2a516',
  woodPlank: '1586864387967-d02ef85d93e8',
  panelWood: '1558997519-83ea9252edf8',
  panelBeige: '1595428774223-ef52624120d2',
  shelfWood: '1594026112284-02bb6f3352fe',
  benchMinimal: '1567016376408-0226e4d0c1ea',
  stoneBath: '1600566752355-35792bedcfea',
  potsStone: '1610701596007-11502861dcfa',
  arches: '1524230572899-a752b3835840',
  drawerUnit: '1591129841117-3adfd313e34f',
  drill: '1607400201515-c2c41c07d307',
  drawings: '1581092160562-40aa08e78837',
  kitchenMarble: '1541123437800-1bb1317badc2',

  /* Architecture */
  facadeDark: '1600585154526-990dced4db0d',
  houseNight: '1600585154340-be6161a56a0c',
  houseModern: '1600047509358-9dc75507daeb',
  facadeBrick: '1596276020587-8044fe049813',
  facadeBlue: '1580216643062-cf460548a66a',
  poolHouse: '1613490493576-7fde63acd811',
  villaWhite: '1613977257592-4871e5fcd7c4',
  poolGlass: '1512917774080-9991f1c4c750',
}
