const KEY = process.env.IMGPROXY_SOURCE_URL_ENCRYPTION_KEY;

const getEncryptKey = (key: string | undefined): string | undefined => {
  return key || KEY;
};

export default getEncryptKey;
