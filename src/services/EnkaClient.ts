import { EnkaClient } from "enka-network-api";

const enka = new EnkaClient({ cacheDirectory: "./cache" });
enka.cachedAssetsManager.cacheDirectorySetup();

export function getAllChatactersFromEnka() {
  return enka.getAllCharacters();
}
