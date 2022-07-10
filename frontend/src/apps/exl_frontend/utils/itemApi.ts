import axios from "apps/common/utils/axios/defaults";
import { snakeAndCamelCase } from "apps/common/utils/axios/configs";
import {
  ItemCreate,
  ItemEdit,
} from "apps/exl_frontend/models/api";
import { Item } from "apps/exl_frontend/models/item";

// ToDo add mocks for tests here later

const ITEMS_API_BASE = "/items";

const ItemsAPIs = (itemId?: number) => {
  return {
    addItem: (item: ItemCreate) =>
      axios.post(`${ITEMS_API_BASE}/`, item, snakeAndCamelCase),
    getAllItems: () =>
      axios.get<Item[]>(`${ITEMS_API_BASE}/`, snakeAndCamelCase),
    getItem: () =>
      axios.get<Item>(`${ITEMS_API_BASE}/${itemId}`, snakeAndCamelCase),
    editItem: (updatedItem: ItemEdit) =>
      axios.patch(
        `${ITEMS_API_BASE}/${itemId}/`,
        updatedItem,
        snakeAndCamelCase
      ),
    deleteItem: () => axios.delete(`${ITEMS_API_BASE}/${itemId}/`),
  };
};

export default ItemsAPIs;
