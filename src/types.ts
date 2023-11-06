import type {
  Options,
  OptionsImageInfo,
  URL,
} from "@imgproxy/imgproxy-js-core";

export interface IMaybePair {
  salt: string | undefined;
  key: string | undefined;
}

export interface IPair {
  salt: string;
  key: string;
}

export interface IRawUrl {
  value: string;
  resultType?: URL["type"];
}

interface BaseGenerateImageUrl {
  baseUrl: string;
  url: string | IRawUrl;
  salt?: string;
  key?: string;
  encryptKey?: string;
  noEncription?: boolean;
}

export interface IGenerateImageInfoUrl extends BaseGenerateImageUrl {
  options?: OptionsImageInfo;
}

export interface IGenerateImageUrl extends BaseGenerateImageUrl {
  options?: Options;
}
