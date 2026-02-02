// import { MapSystem } from '../src/systems/MapSystem.js';
// import { Area } from '../src/entities/Area.js';
// import { describe, test, expect, beforeEach } from 'vitest';


// describe('MapSystem', () => {
//   let mapSystem: MapSystem;

//   beforeEach(() => {
//     mapSystem = new MapSystem([
//       new Area({ x: 0, y: 0 }),
//       new Area({ x: 1, y: 1 }),
//     ]);
//   });

//   test('finds an existing area', () => {
//     const area = mapSystem.isFind(0, 0);
//     expect(area.position.x).toBe(0);
//     expect(area.position.y).toBe(0);
//   });

//   test('generates a new area if not found', () => {
//     const area = mapSystem.isFind(5, 5);
//     expect(area.position.x).toBe(5);
//     expect(area.position.y).toBe(5);
//   });

//   test('adds a new area', () => {
//     const newArea = new Area({ x: 2, y: 2 });
//     mapSystem.add(newArea);
//     const found = mapSystem.isFind(2, 2);
//     expect(found).toBe(newArea);
//   });
// });
import { describe, it, beforeEach, expect } from 'vitest'
import { MapSystem } from '../src/systems/MapSystem.js'
import { Area } from '../src/entities/Area.js'

// should check that surrounding map doesn't erase previous value of the map

describe('MapSystem', () => {
  let mapSystem: MapSystem

  beforeEach(() => {
    mapSystem = new MapSystem([
      new Area({ x: 0, y: 0 }),
      new Area({ x: 1, y: 0 }),
    ])
  })

  it('should find an existing area', () => {
    const area = mapSystem.isFind(0, 0)
    expect(area.position.x).toBe(0)
    expect(area.position.y).toBe(0)
  })

  it('should generate a new area if not found', () => {
    const area = mapSystem.isFind(5, 5)
    expect(area.position.x).toBe(5)
    expect(area.position.y).toBe(5)
  })

  it('should add a new area', () => {
    const newArea = new Area({ x: 2, y: 2 })
    mapSystem.add(newArea)
    const found = mapSystem.isFind(2, 2)
    expect(found).toBe(newArea)
  })

  it('should generate surrounding areas', () => {
    const center = mapSystem.isFind(10, 10)
    mapSystem.surroundingMap(center)

    const north = mapSystem.isFind(10, 11)
    const south = mapSystem.isFind(10, 9)
    const east = mapSystem.isFind(11, 10)
    const west = mapSystem.isFind(9, 10)

    expect(north.position).toEqual({ x: 10, y: 11 })
    expect(south.position).toEqual({ x: 10, y: 9 })
    expect(east.position).toEqual({ x: 11, y: 10 })
    expect(west.position).toEqual({ x: 9, y: 10 })
  })

  it('should have a length of l',()=>{
    const center = mapSystem.isFind(0,0)
    expect(mapSystem.areas.length).toBe(2)
    const other = mapSystem.isFind(5,5)
    expect(mapSystem.areas.length).toBe(3)
  })
})
