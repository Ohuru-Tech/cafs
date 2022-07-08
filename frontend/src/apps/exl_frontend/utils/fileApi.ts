import axios from "apps/common/utils/axios/defaults";
import { authenticatedSnakeAndCamelCase } from "apps/common/utils/axios/configs";
import { ItemCreate, ItemEdit } from "apps/exl_frontend/models/api";
import { File } from "apps/exl_frontend/models/file";

// ToDo add mocks for tests here later

const FILE_API_BASE = "files";

const FileAPIs = (itemId?: number) => {
  return {
    getAllFiles: () =>
      axios.get(`v1/${FILE_API_BASE}/`, authenticatedSnakeAndCamelCase),

    deleteFile: (fileId: number) =>
      axios.get(`v1/${FILE_API_BASE}/${fileId}`, authenticatedSnakeAndCamelCase),
   
  };
};

export default FileAPIs;
