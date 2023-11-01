import crypto from "crypto";

const getEncryptedUrl = (url: string, key: Buffer): string => {
  const data = Buffer.from(url).toString("binary");
  const iv = crypto.randomBytes(16);
  console.log("iv", iv);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  const encrypted = Buffer.from(
    cipher.update(data, "utf8", "binary") + cipher.final("binary"),
    "binary"
  );

  return Buffer.concat([iv, encrypted])
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export default getEncryptedUrl;
