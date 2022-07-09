import axios from "apps/common/utils/axios/defaults";
import {
  authenticatedSnakeAndCamelCase,
  authenticatedSnakeCase,
  authenticatedCamelCase,
} from "apps/common/utils/axios/configs";
import { ItemCreate, ItemEdit } from "apps/exl_frontend/models/api";
import { File as iFile } from "apps/exl_frontend/models/file";

// ToDo add mocks for tests here later

const FILE_API_BASE = "files";
function getUploadType(bucketType: string) {
  switch (bucketType) {
    case "AWS":
      return "s3";
    case "Azure":
      return "azure";
    case "GCP":
      return "gcloud";
    default:
      return "";
  }
}

const FileAPIs = (itemId?: number) => {
  return {
    getAllFiles: () =>
      axios.get(`v1/${FILE_API_BASE}/`, { authenticated: true }),

    deleteFile: (fileId: number) =>
      axios.get(
        `v1/${FILE_API_BASE}/${fileId}`,
        authenticatedSnakeAndCamelCase
      )
  };
};

export default FileAPIs;
