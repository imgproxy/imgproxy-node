import { generateUrl } from "@imgproxy/imgproxy-js-core";
import { Options } from "@imgproxy/imgproxy-js-core";
import getSignatureUrl from "../utils/getSignatureUrl";

interface GenerateImageUrlOptions {
  baseUrl: string;
  URL: {
    value: string;
    type: "plain" | "base64" | "encoded";
  };
  options: Options;
  salt?: string;
  key?: string;
}

const generateImageUrl = ({
  baseUrl,
  URL,
  options,
  salt,
  key,
}: GenerateImageUrlOptions): string => {
  let dublicatedBaseUrl = baseUrl;
  const optionsString = generateUrl(URL, options);
  const signatureUrl = getSignatureUrl(optionsString, salt, key);

  if (baseUrl.endsWith("/")) {
    dublicatedBaseUrl = baseUrl.slice(0, -1);
  }

  return `${dublicatedBaseUrl}${signatureUrl}`;
};

export default generateImageUrl;
