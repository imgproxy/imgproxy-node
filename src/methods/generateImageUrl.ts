import { generateUrl } from "@imgproxy/imgproxy-js-core";
import getSignedUrl from "../utils/getSignedUrl";
import getSignPair from "../utils/getSignPair";
import getEncryptKey from "../utils/getEncryptKey";
import getEncryptedUrl from "../utils/getEncryptedUrl";
import type { IGenerateImageUrl } from "../types";

/**
 * Generate image url
 * @param {string} baseUrl - Base url
 * @param {Object} url - url and type
 * @param {string} url.value - url value
 * @param {string} url.type - url type ("plain", "base64" or "encoded")
 * @param {Object} [options] - (optional) options. You can see all options in [imgproxy docs](https://docs.imgproxy.net/generating_the_url?id=processing-options)
 * or in Options types in imgproxy-js-core.d.ts
 * @param {string} [salt] - (optional) hex-encoded salt. This option overrides IMGPROXY_SALT from process.env for this request
 * @param {string} [key] - (optional) hex-encoded key. This option overrides IMGPROXY_KEY from process.env for this request
 * @param {string} [encryptKey] - (optional, PRO feature) hex-encoded key for encrypting url. Actual only for plain url type.
 * This option overrides IMGPROXY_SOURCE_URL_ENCRYPTION_KEY from process.env for this request
 * @param {boolean} [noEncription=false] - (optional, PRO feature) actual only for plain url type. If true, url will not be encrypted.
 * We strongly recommend to use encryption for url. default: `false`
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
  encryptKey,
  noEncription,
}: IGenerateImageUrl): string => {
  let dublicatedBaseUrl = baseUrl;
  const signPair = getSignPair({ salt, key });

  //encrypting url
  const encKey = getEncryptKey(encryptKey);
  const changedUrl = { ...url };

  if (encKey && url.type === "plain" && !noEncription) {
    const encUrlValue = getEncryptedUrl(url.value, encKey);
    changedUrl.value = encUrlValue;
    changedUrl.type = "encoded";
  }

  //generating url with options
  const optionsString = generateUrl(changedUrl, options);

  if (baseUrl.endsWith("/")) {
    dublicatedBaseUrl = baseUrl.slice(0, -1);
  }

  //adding base url and signature if it exists
  if (!signPair) {
    return `${dublicatedBaseUrl}/insecure${optionsString}`;
  }

  const signedUrl = getSignedUrl(optionsString, signPair);
  return `${dublicatedBaseUrl}${signedUrl}`;
};

export default generateImageUrl;
