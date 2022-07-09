import { Action } from "react-sweet-state";
import { toast } from "react-toastify";
//
import ConnectionAPIs from "apps/exl_frontend/utils/connectionApi";
import { fileState } from "apps/exl_frontend/models/state";
import { ItemCreate, ItemEdit } from "apps/exl_frontend/models/api";
import {
  successToastConfig,
  errorToastConfig,
} from "apps/common/utils/general/configs";

// -----------------------------------------------------------------

export const deleteConnection =
  (fileId: number): Action<fileState> =>
  async ({ setState }) => {
    const { data: files, status } = await ConnectionAPIs().deleteConn(fileId);

    if (status === 200) {
      console.log(files);
      toast("Successfully deleted connection", successToastConfig);
    } else toast("Error", successToastConfig);
  };
