import { Item } from "apps/exl_frontend/models/item";
import { File } from "apps/exl_frontend/models/file";
export interface itemState {
  selectedItemId: number;
  selectedItem: Item;
  items: Item[];
}

export interface fileState {
  selectedFileId: number;
  selectedFile: File;
  files: File[];
}
