const bufferToBase64 = (buffer: Buffer): string => {
  return buffer
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export default bufferToBase64;
