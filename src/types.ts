import type {
  Options,
  OptionsImageInfo,
  URL,
} from "@imgproxy/imgproxy-js-core";

export interface IMaybeSignPair {
  salt: string | undefined;
  key: string | undefined;
}

export interface ISignPair {
  salt: string;
  key: string;
}

export interface ICryptPair {
  key: string;
  iv: string;
}

export interface IRawUrl {
  value: string;
  displayAs?: URL["type"];
}

interface BaseGenerateImageUrl {
  endpoint: string;
  url: string | IRawUrl;
  salt?: string;
  key?: string;
  encryptKey?: string;
  encryptIV?: string;
}

export interface IGenerateImageInfoUrl extends BaseGenerateImageUrl {
  options?: OptionsImageInfo;
}

export interface IGenerateImageUrl extends BaseGenerateImageUrl {
  options?: Options;
}
