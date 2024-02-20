import { Item,SpecialItemName, GildedRose } from '@/gilded-rose';

describe('GildedRose', () => {
  it('should degrade quality and sellIn for normal items', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 10, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(19);
    expect(gildedRose.items[0].sellIn).toBe(9);
  });

  it('should degrade quality twice as fast after sell by date', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 0, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(18);
  });

  it('should never make the quality of an item negative', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 10, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it('should increase quality of Aged Brie over time', () => {
    const gildedRose = new GildedRose([new Item(SpecialItemName.AgedBrie, 10, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(21);
  });

  it('should not increase quality of an item over 50', () => {
    const gildedRose = new GildedRose([new Item(SpecialItemName.AgedBrie, 10, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it('should increase quality of Backstage Passes as sellIn approaches', () => {
    const gildedRose = new GildedRose([new Item(SpecialItemName.BackstagePasses, 15, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(21);
  });
});
