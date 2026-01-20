import type { WSAFileRouter } from "@app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export const UploadButton = generateUploadButton<WSAFileRouter>();
export const UploadDropzone = generateUploadDropzone<WSAFileRouter>();
