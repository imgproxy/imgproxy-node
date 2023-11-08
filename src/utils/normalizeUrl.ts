import type { URL } from "@imgproxy/imgproxy-js-core";
import type { IRawUrl } from "../types";
import getEncryptPair from "./getEncryptPair.js";
import getEncryptedUrl from "./getEncryptedUrl.js";

interface INormalizeUrl {
  url: string | IRawUrl;
  encryptKey?: string;
  encryptIV?: string;
}

const normalizeUrl = ({ url, encryptKey, encryptIV }: INormalizeUrl): URL => {
  const changedUrl = {
    value: typeof url === "string" ? url : url.value,
    type: (typeof url === "string" ? "base64" : url.displayAs) || "base64",
  };

  //encoded url to base64
  if (changedUrl.type === "base64") {
    changedUrl.value = btoa(changedUrl.value);
  }

  //encrypting url
  if (changedUrl.type === "encrypted") {
    if (!encryptKey) {
      throw new Error(
        "You should provide encryptKey if you want to use encrypted url type"
      );
    }

    const encKey = getEncryptPair(encryptKey, encryptIV);

    if (encKey) {
      changedUrl.value = getEncryptedUrl(changedUrl.value, encKey);
      changedUrl.type = "encrypted";
    }
  }

  return changedUrl;
};

export default normalizeUrl;
