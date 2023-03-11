import { EnkaClient } from "enka-network-api";

const enka = new EnkaClient();

enka.cachedAssetsManager.activateAutoCacheUpdater({
  instant: true, // Run the first update check immediately
  timeout: 60 * 60 * 1000, // 1 hour interval
  onUpdateStart: async () => {
    console.log("Updating Genshin Data...");
  },
  onUpdateEnd: async () => {
    enka.cachedAssetsManager.refreshAllData(); // Refresh memory
    console.log("Updating Completed!");
  },
});

export function getAllChatactersFromEnka() {
  return enka.getAllCharacters();
}

export function getCharacterByEnkaId(enkaId: number) {
  return enka.getCharacterById(enkaId);
}
