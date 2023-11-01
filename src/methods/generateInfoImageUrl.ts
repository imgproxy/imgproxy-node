import { generateImageInfoUrl as generateImageInfoUrlCore } from "@imgproxy/imgproxy-js-core";
import getSignedUrl from "../utils/getSignedUrl";
import getSignPair from "../utils/getSignPair";
import type { IGenerateImageInfoUrl } from "../types";

const generateImageInfoUrl = ({
  baseUrl,
  url,
  options,
  salt,
  key,
}: IGenerateImageInfoUrl): string => {
  let dublicatedBaseUrl = baseUrl;
  const signPair = getSignPair({ salt, key });
  const optionsString = generateImageInfoUrlCore(url, options);

  if (baseUrl.endsWith("/")) {
    dublicatedBaseUrl = baseUrl.slice(0, -1);
  }

  if (!signPair) {
    return `${dublicatedBaseUrl}${optionsString.prefix}/insecure${optionsString.suffix}`;
  }

  const signatureUrl = getSignedUrl(optionsString.suffix, signPair);
  return `${dublicatedBaseUrl}${optionsString.prefix}${signatureUrl}`;
};

export default generateImageInfoUrl;
