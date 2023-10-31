import { generateUrl } from "@imgproxy/imgproxy-js-core";
import type { Options } from "@imgproxy/imgproxy-js-core";
import getSignedUrl from "../utils/getSignedUrl";

interface IGenerateImageUrl {
  baseUrl: string;
  url: {
    value: string;
    type: "plain" | "base64" | "encoded";
  };
  options: Options;
  salt?: string;
  key?: string;
}

const generateImageUrl = ({
  baseUrl,
  url,
  options,
  salt,
  key,
}: IGenerateImageUrl): string => {
  let dublicatedBaseUrl = baseUrl;
  const optionsString = generateUrl(url, options);
  const signedUrl = getSignedUrl(optionsString, salt, key);

  if (baseUrl.endsWith("/")) {
    dublicatedBaseUrl = baseUrl.slice(0, -1);
  }

  return `${dublicatedBaseUrl}${signedUrl}`;
};

export default generateImageUrl;
