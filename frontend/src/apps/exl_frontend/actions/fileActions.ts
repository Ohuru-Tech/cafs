import { Action } from "react-sweet-state";
import { toast } from "react-toastify";
//
import FileAPIs from "apps/exl_frontend/utils/fileApi";
import { fileState } from "apps/exl_frontend/models/state";
import { ItemCreate, ItemEdit } from "apps/exl_frontend/models/api";
import {
  successToastConfig,
  errorToastConfig,
} from "apps/common/utils/general/configs";

// -----------------------------------------------------------------

export const fetchAllFiles =
  (): Action<fileState> =>
  async ({ setState }) => {
    const { data: files, status } = await FileAPIs().getAllFiles();

    if (status === 200) {
      console.log(files);
      setState({ files: files.results });
    } else toast("Error", successToastConfig);
  };

export const deleteFile =
  (fileId: number): Action<fileState> =>
  async ({ setState }) => {
    const { data: files, status } = await FileAPIs().deleteFile(fileId);
    if (status === 204) {
      toast("Successfully deleted", successToastConfig);
    } else {
      toast("Error while deleting", errorToastConfig);
    }
  };
