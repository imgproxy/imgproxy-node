import {
  generateImageInfoUrl as generateImageInfoUrlCore,
  INFO_PREFIX,
} from "@imgproxy/imgproxy-js-core";
import normalizeUrl from "../utils/normalizeUrl";
import finalizePath from "../utils/finalizePath";
import type { IGenerateImageInfoUrl } from "../types";

/**
 * Generate image info url. **PRO feature**
 * @param {string} baseUrl - Base url
 * @param {Object | string} url - you can specify only url if you agree with default url.resultType = "base64" or you have to specify url.value and url.resultType
 * @param {string} url.value - url value
 * @param {string} url.resultType - (optional) here you specify in what type of image URL is required in the generated.
 * Imgproxy request URL: "plain", "base64" or "encrypted" (encrypted is PRO feature). We strongly recommend to use "base64" or "encrypted" kind of url. default: `"base64"`.
 * @param {Object} [options] - (optional) options. You can see all options in [imgproxy docs](https://docs.imgproxy.net/getting_the_image_info?id=info-options)
 * or in OptionsImageInfo types in imgproxy-js-core.d.ts
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
 * const url = generateImageInfoUrl({
 *  baseUrl: "https://imgproxy.example",
 *  url: "https://example.com/image.jpg",
 *  options: {
 *    average: { average: 1, ignore_transparent: "f" },
 *    detect_objects: true,
 *    dominant_colors: { dominant_colors: 1, build_missed: 1 },
 *    iptc: 1,
 *    palette: 6,
 *  },
 *  salt: "salt",
 *  key: "key",
 * });
 */
const generateImageInfoUrl = ({
  baseUrl: paramsBaseUrl,
  url,
  options,
  salt,
  key,
  encryptKey,
  noEncription,
}: IGenerateImageInfoUrl): string => {
  const changedUrl = normalizeUrl({ url, encryptKey, noEncription });

  //generating url with options
  const optionsString = generateImageInfoUrlCore(changedUrl, options);

  //changing base url
  const baseUrl = paramsBaseUrl.endsWith("/")
    ? paramsBaseUrl.slice(0, -1)
    : paramsBaseUrl;

  //adding base url and signature if it exists
  const path = finalizePath({ options: optionsString, salt, key });

  return `${baseUrl}${INFO_PREFIX}${path}`;
};

export default generateImageInfoUrl;
