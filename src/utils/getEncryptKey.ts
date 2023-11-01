const KEY = process.env.IMGPROXY_SOURCE_URL_ENCRYPTION_KEY;

const getEncryptKey = (key: string | undefined): Buffer | undefined => {
  const innerKey = key || KEY;

  if (!innerKey) {
    return undefined;
  }

  return Buffer.from(innerKey, "hex");
};

export default getEncryptKey;
