import { generateUrl } from "@imgproxy/imgproxy-js-core";
import getSignedUrl from "../utils/getSignedUrl";
import getSignPair from "../utils/getSignPair";
import type { IGenerateImageUrl } from "../types";

/**
 * Generate image url
 * @param {string} baseUrl - Base url
 * @param {Object} url - url and type
 * @param {string} url.value - url value
 * @param {string} url.type - url type ("plain", "base64" or "encoded")
 * @param {Object} [options] - (optional) options. You can see all options in [imgproxy docs](https://docs.imgproxy.net/generating_the_url?id=processing-options)
 * or in Options types in imgproxy-js-core.d.ts
 * @param {string} [salt] - (optional) hex-encoded salt
 * @param {string} [key] - (optional) hex-encoded key
 *
 * @returns {string}
 *
 * @example
 * const url = generateImageUrl({
 *   baseUrl: "https://imgproxy.example",
 *   url: { value: "hLhDnxN9acjq3LDooARQ3t6OU1UwAG1IeXsM2b7qxOyMP4DF+GsbBdnG1K9B0+bz", type: "encoded"},
 *   options: {
 *     resize: { width: 100, height: 100, type: "fill", enlarge: 1, extend: { extend: 1 } },
 *     rotate: 90,
 *     quality: 80,
 *     format: "webp",
 *   },
 *   salt: "salt",
 *   key: "key",
 * });
 */
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
