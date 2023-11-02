import getSignedUrl from "../utils/getSignedUrl";
import getSignPair from "../utils/getSignPair";

interface IFinalizePath {
  options: string;
  salt?: string;
  key?: string;
}

const finalizePath = ({ options, salt, key }: IFinalizePath): string => {
  const signPair = getSignPair({ salt, key });
  return signPair ? getSignedUrl(options, signPair) : `/insecure${options}`;
};

export default finalizePath;
