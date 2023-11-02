import type { URL } from "@imgproxy/imgproxy-js-core";
import getEncryptKey from "./getEncryptKey";
import getEncryptedUrl from "./getEncryptedUrl";

interface INormalizeUrl {
  url: URL;
  encryptKey?: string;
  noEncription?: boolean;
}

const normalizeUrl = ({
  url,
  encryptKey,
  noEncription,
}: INormalizeUrl): URL => {
  const changedUrl = { ...url };

  //encrypting url
  if (url.type === "plain" && !noEncription) {
    const encKey = getEncryptKey(encryptKey);

    if (encKey) {
      changedUrl.value = getEncryptedUrl(changedUrl.value, encKey);
      changedUrl.type = "encoded";
    }
  }

  return changedUrl;
};

export default normalizeUrl;
