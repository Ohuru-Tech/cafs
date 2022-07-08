import { defaults, createStore, createHook } from "react-sweet-state";

import { fileState } from "apps/exl_frontend/models/state";
import { fetchAllFiles, deleteFile } from "apps/exl_frontend/actions/fileActions";

defaults.devtools = true;

const loadInitialState = (): fileState => {
  return {
    selectedFileId: 0,
    selectedFile: {
      id: 13,
      file_azure: "",
      file_s3: "",
      file_gcloud: "",
      file: "",
      user: 2,
    },
    files: [],
  };
};

const Store = createStore({
  name: "fileStore",
  initialState: loadInitialState(),
  actions: {
    fetchAllFiles,
    deleteFile
  },
});

export default createHook(Store);
