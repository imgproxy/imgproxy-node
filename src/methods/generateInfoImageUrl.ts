import { generateImageInfoUrl as generateImageInfoUrlCore } from "@imgproxy/imgproxy-js-core";
import getSignedUrl from "../utils/getSignedUrl";
import getSignPair from "../utils/getSignPair";
import type { IGenerateImageInfoUrl } from "../types";

/**
 * Generate image info url. **PRO feature**
 * @param {string} baseUrl - Base url
 * @param {Object} url - url and type
 * @param {string} url.value - url value
 * @param {string} url.type - url type (plain, base64 or encoded)
 * @param {Object} [options] - (optional) options. You can see all options in [imgproxy docs](https://docs.imgproxy.net/getting_the_image_info?id=info-options)
 * or in OptionsImageInfo types in imgproxy-js-core.d.ts
 * @param {string} [salt] - (optional) hex-encoded salt
 * @param {string} [key] - (optional) hex-encoded key
 *
 * @returns {string}
 *
 * @example
 * const url = generateImageInfoUrl({
 *  baseUrl: "https://imgproxy.example",
 *  url: { value: "hLhDnxN9acjq3LDooARQ3t6OU1UwAG1IeXsM2b7qxOyMP4DF+GsbBdnG1K9B0+bz", type: "encoded"},
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
