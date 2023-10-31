import { generateImageInfoUrl as generateImageInfoUrlCore } from "@imgproxy/imgproxy-js-core";
import { OptionsImageInfo } from "@imgproxy/imgproxy-js-core";
import getSignatureUrl from "../utils/getSignatureUrl";

interface IGenerateImageInfoUrl {
  baseUrl: string;
  URL: {
    value: string;
    type: "plain" | "base64" | "encoded";
  };
  options: OptionsImageInfo;
  salt?: string;
  key?: string;
}

const generateImageInfoUrl = ({
  baseUrl,
  URL,
  options,
  salt,
  key,
}: IGenerateImageInfoUrl): string => {
  let dublicatedBaseUrl = baseUrl;
  const optionsString = generateImageInfoUrlCore(URL, options);
  const signatureUrl = getSignatureUrl(optionsString.suffix, salt, key);

  if (baseUrl.endsWith("/")) {
    dublicatedBaseUrl = baseUrl.slice(0, -1);
  }

  return `${dublicatedBaseUrl}${optionsString.prefix}${signatureUrl}`;
};

export default generateImageInfoUrl;
