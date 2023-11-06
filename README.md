<p align="center">
  <a href="https://imgproxy.net">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./assets/nodejs-dark.svg?sanitize=true">
      <source media="(prefers-color-scheme: light)" srcset="./assets/nodejs-light.svg?sanitize=true">
      <img width="150" alt="imgproxy-nodejs logo" src="./assets/nodejs-light.svg?sanitize=true">
    </picture>
  </a>
</p>

---

**[imgproxy](https://github.com/imgproxy/imgproxy)** is a fast and secure standalone server for resizing and converting remote images. The main principles of imgproxy are simplicity, speed, and security. It is a Go application, ready to be installed and used in any Unix environment—also ready to be containerized using Docker.

imgproxy can be used to provide a fast and secure way to _get rid of all the image resizing code_ in your web application (like calling ImageMagick or GraphicsMagick, or using libraries), while also being able to resize everything on the fly on a separate server that only you control. imgproxy is fast, easy to use, and requires zero processing power or storage from the main application. imgproxy is indispensable when handling image resizing of epic proportions, especially when original images are coming from a remote source.

- [Install](#install)
- [Usage](#usage)
- [Methods](#methods)

## Install

```bash
npm install @imgproxy/imgproxy-node
```

## Usage

```js
import { generateImageUrl } from '@imgproxy/imgproxy-node';

const url = generateImageUrl(
  baseUrl: "https://imgproxy.example.com/",
  url: "https://example.com/image.jpg",
  options: {
    resizing_type: "fit",
    width: 300,
    gravity: { type: "no" },
    enlarge: 1,
  },
  salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
  key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
);
```

## Methods

### generateImageUrl

This method generates an imgproxy URL.
It takes the following arguments:

- `baseUrl` (`string`) - (required) the base URL of your imgproxy instance
- `url` (`Object | string`) - (required) a string with url value or an object that contains the value and resultType properties. You can specify only url if you agree with default `url.resultType` = "base64" or you have to specify `url.value` and `url.resultType`.
  - `value` (`string`) - (required) the plain text URL of the image.
  - `resultType` (`"base64" | "encrypted" | "plain"`) - (optional) the final type of URL you will receive . Deafult value is `"base64"`.
    Can be one of the following:
    - `"base64"` - a base64 encoded URL. Default value.
    - `"encrypted"` - (**PRO feature**) an AES-CBC encrypted URL.
    - `"plain"` - a plain text URL. We strongly recommend using `base64` or `encrypted` type.
- `options` (`Object | undefined`) - (optional) an object that contains the resizing options. You can see all options in [imgproxy docs](https://docs.imgproxy.net/generating_the_url?id=processing-options) or in [Options types in imgproxy-js-core library](https://github.com/imgproxy/imgproxy-js-core/blob/main/src/types/index.ts).
- `salt` (`string | undefined`) - (optional) the salt used to encode the URL. It must be a hex-encoded 16-byte string. This option overrides IMGPROXY_SALT environment variable from process.env for this call.
- `key` (`string | undefined`) - (optional) the key used to encode the URL. It must be a hex-encoded 16-byte string. This option overrides IMGPROXY_KEY environment variable from process.env for this call.
- `encryptKey` (`string | undefined`) - (optional, **PRO feature**) the key used to encrypt the URL. The key should be either 16, 24, or 32 bytes long for AES-128-CBC, AES-192-CBC, or AES-256-CBC, respectively. This option overrides IMGPROXY_SOURCE_URL_ENCRYPTION_KEY environment variable from process.env for this call.
- `encryptIV` (`string | undefined`) - (optional, **PRO feature**) the IV used to encrypt the URL. The IV should be 16 bytes long. If not specified, the IV will be generated randomly. But we strongly recommend to specify it.

### generateImageInfoUrl

This method generates an imgproxy URL to get a source image info.
It takes the following arguments:

- `baseUrl` (`string`) - (required) the base URL of your imgproxy instance
- `url` (`Object | string`) - (required) a string with url value or an object that contains the value and resultType properties. You can specify only url if you agree with default `url.resultType` = "base64" or you will have to specify `url.value` and `url.resultType`.
  - `value` (`string`) - (required) the plain text URL of the image.
  - `resultType` (`"base64" | "encrypted" | "plain"`) - (optional) the final type of URL you will receive. Deafult value is `"base64"`.
    Can be one of the following:
    - `"base64"` - a base64 encoded URL. Default value.
    - `"encrypted"` - (**PRO feature**) an AES-CBC encrypted URL.
    - `"plain"` - a plain text URL. We strongly recommend using `base64` or `encrypted` type.
- `options` (`Object | undefined`) - (optional) an object that contains the resizing options. You can see all options in [imgproxy docs](https://docs.imgproxy.net/getting_the_image_info?id=info-options) or in [OptionsImageInfo types in imgproxy-js-core library](https://github.com/imgproxy/imgproxy-js-core/blob/main/src/types/index.ts).
- `salt` (`string | undefined`) - (optional) the salt used to encode the URL. It must be a hex-encoded 16-byte string. This option overrides IMGPROXY_SALT from process.env for one request.
- `key` (`string | undefined`) - (optional) the key used to encode the URL. It must be a hex-encoded 16-byte string. This option overrides IMGPROXY_KEY from process.env for one request.
- `encryptKey` (`string | undefined`) - (optional, **PRO feature**) the key used to encrypt the URL. The key should be either 16, 24, or 32 bytes long for AES-128-CBC, AES-192-CBC, or AES-256-CBC, respectively. This option overrides IMGPROXY_SOURCE_URL_ENCRYPTION_KEY from process.env for one request.
- `encryptIV` (`string | undefined`) - (optional, **PRO feature**) the IV used to encrypt the URL. The IV should be 16 bytes long. If not specified, the IV will be generated randomly. But we strongly recommend to specify it.
