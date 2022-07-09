import { Action } from "react-sweet-state";
import { toast } from "react-toastify";
//
import ItemAPIs from "apps/exl_frontend/utils/itemApi";
import { itemState } from "apps/exl_frontend/models/state";
import { ItemCreate, ItemEdit } from "apps/exl_frontend/models/api";
import { successToastConfig } from "apps/common/utils/general/configs";

// -----------------------------------------------------------------

export const setItemId =
  (itemId: number): Action<itemState> =>
  async ({ getState, setState }) => {
    const { selectedItemId } = getState();
    if (itemId !== selectedItemId) {
      setState({ selectedItemId: itemId });
    }
  };

export const fetchAllItems =
  (): Action<itemState> =>
  async ({ setState }) => {
    const { data: items } = await ItemAPIs().getAllItems();
    setState({ items: items });
  };

export const fetchItem =
  (): Action<itemState> =>
  async ({ setState, getState }) => {
    const { selectedItemId } = getState();

    if (selectedItemId !== 0) {
      const { data: item, status } = await ItemAPIs(selectedItemId).getItem();
      if (status === 200) {
        setState({ selectedItem: item });
      }
    }
  };

export const addItem =
  (item: ItemCreate): Action<itemState> =>
  async ({ dispatch }) => {
    const response = await ItemAPIs().addItem(item);
    if (response.status == 201) {
      toast("Item added successfully", successToastConfig);
    }
    await dispatch(fetchAllItems());
  };

export const updateItem =
  (updates: ItemEdit): Action<itemState> =>
  async ({ getState, dispatch }) => {
    const { selectedItemId } = getState();
    await ItemAPIs(selectedItemId).editItem(updates);
    await dispatch(fetchItem());
    await dispatch(fetchAllItems());
  };

export const deleteItem =
  (): Action<itemState> =>
  async ({ getState, dispatch, setState }) => {
    const { selectedItemId } = getState();
    const response = await ItemAPIs(selectedItemId).deleteItem();
    if (response.status === 204) {
      toast("Item deleted successfully", successToastConfig);
    }
    await dispatch(fetchAllItems());
    setState({ selectedItemId: 0 });
  };
