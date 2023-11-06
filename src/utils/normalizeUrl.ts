import type { URL } from "@imgproxy/imgproxy-js-core";
import type { IRawUrl } from "../types";
import getEncryptKey from "./getEncryptKey";
import getEncryptedUrl from "./getEncryptedUrl";

interface INormalizeUrl {
  url: string | IRawUrl;
  encryptKey?: string;
  noEncription?: boolean;
}

const normalizeUrl = ({
  url,
  encryptKey,
  noEncription,
}: INormalizeUrl): URL => {
  const changedUrl = {
    value: typeof url === "string" ? url : url.value,
    type: (typeof url === "string" ? "base64" : url.resultType) || "base64",
  };

  //encoded url to base64
  if (changedUrl.type === "base64") {
    changedUrl.value = btoa(changedUrl.value);
  }

  //encrypting url
  if (changedUrl.type === "encrypted" && !noEncription) {
    if (!encryptKey) {
      throw new Error(
        "You should provide encryptKey if you want to use encrypted url type"
      );
    }

    const encKey = getEncryptKey(encryptKey);

    if (encKey) {
      changedUrl.value = getEncryptedUrl(changedUrl.value, encKey);
      changedUrl.type = "encrypted";
    }
  }

  return changedUrl;
};

export default normalizeUrl;
