import axios from "apps/common/utils/axios/defaults";
import {
  authenticatedSnakeAndCamelCase,
  authenticatedSnakeCase,
  authenticatedCamelCase,
} from "apps/common/utils/axios/configs";
import { ItemCreate, ItemEdit } from "apps/exl_frontend/models/api";
import { File as iFile } from "apps/exl_frontend/models/file";

// ToDo add mocks for tests here later

const FILE_API_BASE = "connections";

const FileAPIs = (itemId?: number) => {
  return {
    deleteConn: (fileId: number) =>
      axios.get(
        `v1/${FILE_API_BASE}/${fileId}/`,
        authenticatedSnakeAndCamelCase
      ),
  };
};

export default FileAPIs;
