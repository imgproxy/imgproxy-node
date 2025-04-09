<p align="center">
  <a href="https://imgproxy.net">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/nodejs-dark.svg?sanitize=true">
      <source media="(prefers-color-scheme: light)" srcset="assets/nodejs-light.svg?sanitize=true">
      <img alt="imgproxy-nodejs logo" src="assets/nodejs-light.svg?sanitize=true">
    </picture>
  </a>
</p>

<h4 align="center">
  <a href="https://imgproxy.net">Website</a> |
  <a href="https://imgproxy.net/blog/">Blog</a> |
  <a href="https://docs.imgproxy.net">Documentation</a> |
  <a href="https://imgproxy.net/#pro">imgproxy Pro</a> |
  <a href="https://hub.docker.com/r/darthsim/imgproxy/">Docker</a> |
  <a href="https://twitter.com/imgproxy_net">Twitter</a> |
  <a href="https://discord.gg/5GgpXgtC9u">Discord</a>
</h4>

<p align="center">
<a href="https://github.com/imgproxy/imgproxy/actions"><img alt="GH Test" src="https://img.shields.io/github/actions/workflow/status/imgproxy/imgproxy-node/ci.yml?branch=main&label=CI&style=for-the-badge" /></a>
</p>

---

This library helps make image processing with imgproxy easier.

**[imgproxy](https://github.com/imgproxy/imgproxy)** is a fast and secure standalone server for resizing and converting remote images. The main principles of imgproxy are simplicity, speed, and security — it’s a Go application, ready to be installed and used in any Unix environment, and also ready to be containerized using Docker.

imgproxy-node helps build your own image processing pipeline and create URLs for imgproxy requests. You no longer need to remember all the secret key names: the library will automatically use your ENV variables and provide a generated link to the processed image as output.

See image processing on the fly with imgproxy-node in this [demo](https://react-server-components-demo.vercel.app/image/1?preset=format_webp).

<p><a href="https://evilmartians.com/?utm_source=imgproxy-node">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://evilmartians.com/badges/sponsored-by-evil-martians_v2.0_for-dark-bg@2x.png"
    >
    <img
      src="https://evilmartians.com/badges/sponsored-by-evil-martians_v2.0@2x.png"
      alt="Sponsored by Evil Martians"
      width="236"
      height="54"
    >
  </picture>
</a></p>

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

const url = generateImageUrl({
  endpoint: "https://imgproxy.example.com/",
  url: "https://example.com/image.jpg",
  options: {
    resizing_type: "fit",
    width: 300,
    gravity: { type: "no" },
    enlarge: 1,
  },
  salt: "520f986b998545b4785e0defbc4f3c1203f22de2374a3d53cb7a7fe9fea309c5",
  key: "943b421c9eb07c830af81030552c86009268de4e532ba2ee2eab8247c6da0881",
});
```

## Methods

### generateImageUrl

This method generates an imgproxy URL.
It takes the following arguments:

- `endpoint` (`string`) - (required) the base URL of your imgproxy instance
- `url` (`Object | string`) - (required) a string with url value or an object that contains the value and displayAs properties. You can specify only url if you agree with default `url.displayAs` = "base64" or you have to specify `url.value` and `url.displayAs`.
  - `value` (`string`) - (required) the plain text URL of the image.
  - `displayAs` (`"base64" | "encrypted" | "plain"`) - (optional) how the image URL should be presented in the resulting imgproxy request URL. Deafult value is `"base64"`.
    Can be one of the following:
    - `"base64"` - a base64 encoded URL. Default value.
    - `"encrypted"` - (**PRO feature**) an AES-CBC encrypted URL.
    - `"plain"` - a plain text URL. We strongly recommend using `base64` or `encrypted` type.
- `options` (`Object | undefined`) - (optional) an object that contains the resizing options. You can see all options in [imgproxy docs](https://docs.imgproxy.net/generating_the_url?id=processing-options) or in [Options types in imgproxy-js-core library](https://github.com/imgproxy/imgproxy-js-core/blob/main/src/types/index.ts).
- `salt` (`string | undefined`) - (optional) hex-encoded salt used to encode the URL. It must be a hex-encoded 16-byte string. This option overrides IMGPROXY_SALT environment variable from process.env for this call.
- `key` (`string | undefined`) - (optional) hex-encoded key used to encode the URL. It must be a hex-encoded 16-byte string. This option overrides IMGPROXY_KEY environment variable from process.env for this call.
- `encryptKey` (`string | undefined`) - (optional, **PRO feature**) hex-encoded key used to encrypt the URL. The key should be either 16, 24, or 32 bytes long for AES-128-CBC, AES-192-CBC, or AES-256-CBC, respectively. This option overrides IMGPROXY_SOURCE_URL_ENCRYPTION_KEY environment variable from process.env for this call.
- `encryptIV` (`string | undefined`) - (optional, **PRO feature**) hex-encoded 16-bytes length IV for encrypting url. If not specified, the IV will be generated randomly. But it's better if you specify it yourself. Read more in [imgproxy docs iv-generation](https://docs.imgproxy.net/usage/encrypting_source_url#iv-generation).

### generateImageInfoUrl

This method generates an imgproxy URL to get a source image info.
It takes the following arguments:

- `endpoint` (`string`) - (required) the base URL of your imgproxy instance
- `url` (`Object | string`) - (required) a string with url value or an object that contains the value and displayAs properties. You can specify only url if you agree with default `url.displayAs` = "base64" or you will have to specify `url.value` and `url.displayAs`.
  - `value` (`string`) - (required) the plain text URL of the image.
  - `displayAs` (`"base64" | "encrypted" | "plain"`) - (optional) how the image URL should be presented in the resulting imgproxy request URL. Deafult value is `"base64"`.
    Can be one of the following:
    - `"base64"` - a base64 encoded URL. Default value.
    - `"encrypted"` - (**PRO feature**) an AES-CBC encrypted URL.
    - `"plain"` - a plain text URL. We strongly recommend using `base64` or `encrypted` type.
- `options` (`Object | undefined`) - (optional) an object that contains the resizing options. You can see all options in [imgproxy docs](https://docs.imgproxy.net/getting_the_image_info?id=info-options) or in [OptionsImageInfo types in imgproxy-js-core library](https://github.com/imgproxy/imgproxy-js-core/blob/main/src/types/index.ts).
- `salt` (`string | undefined`) - (optional) hex-encoded salt used to encode the URL. It must be a hex-encoded 16-byte string. This option overrides IMGPROXY_SALT from process.env for one request.
- `key` (`string | undefined`) - (optional) hex-encoded key used to encode the URL. It must be a hex-encoded 16-byte string. This option overrides IMGPROXY_KEY from process.env for one request.
- `encryptKey` (`string | undefined`) - (optional, **PRO feature**) hex-encoded key used to encrypt the URL. The key should be either 16, 24, or 32 bytes long for AES-128-CBC, AES-192-CBC, or AES-256-CBC, respectively. This option overrides IMGPROXY_SOURCE_URL_ENCRYPTION_KEY from process.env for one request.
- `encryptIV` (`string | undefined`) - (optional, **PRO feature**) hex-encoded 16-bytes length IV for encrypting url. If not specified, the IV will be generated randomly. But it's better if you specify it yourself. Read more in [imgproxy docs iv-generation](https://docs.imgproxy.net/usage/encrypting_source_url#iv-generation).


# Development

The project uses [changesets](https://github.com/changesets/changesets) to manage versioning and changelog.
Typical workflow is as follow:

1. make changes to codebase,
2. run `npm run changesets` at project root and follow prompt to generate a "changeset" (logging a change),
3. commit both (1) and (2) into git.

The [changesets Github action](./.github/workflows/publish.yml) is triggered on `push` to `main` and will create a corresponding "Changesets: Versioning & Publication" pull request, which, upon merged, will trigger publication of the new version to NPM.
