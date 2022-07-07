import { Item } from "apps/exl_frontend/models/item";

export interface itemState {
  selectedItemId: number;
  selectedItem: Item;
  items: Item[];
}
