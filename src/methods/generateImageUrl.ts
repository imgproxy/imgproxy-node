import { generateUrl } from "@imgproxy/imgproxy-js-core";
import normalizeUrl from "../utils/normalizeUrl.js";
import finalizePath from "../utils/finalizePath.js";
import type { IGenerateImageUrl } from "../types";

/**
 * Generate image url
 * @param {string} endpoint - Base url
 * @param {Object | string} url - you can specify only url if you agree with default url.displayAs = "base64" or you have to specify url.value and url.displayAs
 * @param {string} url.value - url value
 * @param {string} url.displayAs - (optional) how the image URL should be presented in the resulting imgproxy request URL.
 * Imgproxy request URL: "plain", "base64" or "encrypted" (encrypted is PRO feature). We strongly recommend to use "base64" or "encrypted" kind of url. default: `"base64"`
 * @param {Object} [options] - (optional) options. You can see all options in [imgproxy docs](https://docs.imgproxy.net/generating_the_url?id=processing-options)
 * or in Options types in imgproxy-js-core.d.ts
 * @param {string} [salt] - (optional) hex-encoded salt. This option overrides IMGPROXY_SALT from process.env for this request
 * @param {string} [key] - (optional) hex-encoded key. This option overrides IMGPROXY_KEY from process.env for this request
 * @param {string} [encryptKey] - (optional, PRO feature) hex-encoded key for encrypting url.
 * This option overrides IMGPROXY_SOURCE_URL_ENCRYPTION_KEY from process.env for this request
 * @param {string} [encryptIV] - (optional, PRO feature) hex-encoded 16-bytes length IV for encrypting url.
 * More details about IV you can read in [imgproxy docs](https://docs.imgproxy.net/usage/encrypting_source_url#iv-generation)
 *
 * @returns {string}
 *
 * @example
 * const url = generateImageUrl({
 *   endpoint: "https://imgproxy.example",
 *   url: "https://example.com/image.jpg",
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
  endpoint: paramsEndpoint,
  url,
  options,
  salt,
  key,
  encryptKey,
  encryptIV,
}: IGenerateImageUrl): string => {
  const changedUrl = normalizeUrl({ url, encryptKey, encryptIV });

  //generating url with options
  const optionsString = generateUrl(changedUrl, options);

  //changing base url
  const endpoint = paramsEndpoint.endsWith("/")
    ? paramsEndpoint.slice(0, -1)
    : paramsEndpoint;

  //adding base url and signature if it exists
  const path = finalizePath({ options: optionsString, salt, key });

  return `${endpoint}${path}`;
};

export default generateImageUrl;
