import { generateUrl } from "@imgproxy/imgproxy-js-core";
import getSignedUrl from "../utils/getSignedUrl";
import getSignPair from "../utils/getSignPair";
import type { IGenerateImageUrl } from "../types";

const generateImageUrl = ({
  baseUrl,
  url,
  options,
  salt,
  key,
}: IGenerateImageUrl): string => {
  let dublicatedBaseUrl = baseUrl;
  const signPair = getSignPair({ salt, key });
  const optionsString = generateUrl(url, options);

  if (baseUrl.endsWith("/")) {
    dublicatedBaseUrl = baseUrl.slice(0, -1);
  }

  if (!signPair) {
    return `${dublicatedBaseUrl}/insecure${optionsString}`;
  }

  const signedUrl = getSignedUrl(optionsString, signPair);
  return `${dublicatedBaseUrl}${signedUrl}`;
};

export default generateImageUrl;
