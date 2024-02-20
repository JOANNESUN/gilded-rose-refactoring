export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
export enum SpecialItemName {
  AgedBrie = "Aged Brie",
  BackstagePasses = "Backstage passes to a TAFKAL80ETC concert",
  Sulfuras = "Sulfuras, Hand of Ragnaros",
  Conjured = "Conjured",
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case SpecialItemName.AgedBrie:
          this.updateAgedBrie(item);
          break;
        case SpecialItemName.BackstagePasses:
          this.updateBackstagePasses(item);
          break;
        case SpecialItemName.Sulfuras:
          break;
        case SpecialItemName.Conjured:
          this.updateConjuredItem(item);
          break;
        default:
          this.updateOtherItems(item);
          break;
      }
    });
    return this.items;
  }

  updateAgedBrie(item: Item): void {
    item.sellIn = item.sellIn - 1;
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
    if (item.sellIn < 0 && item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  updateBackstagePasses(item: Item): void {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
      if (item.sellIn < 11) {
        item.quality = item.quality + 1;
      }
      if (item.sellIn < 5) {
        item.quality = item.quality + 1;
      }
    }
  }

  updateConjuredItem(item: Item): void {
    item.sellIn = item.sellIn - 1;
    if (item.quality > 0) {
      item.quality = item.quality - 2;
      if (item.sellIn < 0 && item.quality > 0) {
        item.quality = item.quality - 2;
      }
    }
  }

  updateOtherItems(item: Item) {
    if (item.name !== SpecialItemName.Sulfuras) {
      item.sellIn = item.sellIn - 1;
      if (item.quality > 0) {
        item.quality = item.quality - 1;
        if (item.sellIn < 0 && item.quality > 0) {
          item.quality = item.quality - 1;
        }
      }
    }
  }
}
