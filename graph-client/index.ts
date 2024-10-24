import { getBuiltGraphSDK } from "./.graphclient";

const { GetCreatedDVs, GetVaults } = getBuiltGraphSDK();

async function processVaults() {
  const vaults = await GetVaults();
  console.log("Looking for vaults...");

  for await (const result of vaults) {
    if (result.vaultCreateds) {
      result.vaultCreateds.forEach((vault) => {
        console.log("Vault id: ", vault.id);
        console.log("Vault protocol: ", vault.protocol);
        console.log("Vault type: ", vault.type);
        console.log("Vault operator: ", vault.operator);
        console.log("Vault creator: ", vault.creator);
        console.log("Vault oracle: ", vault.oracle);
        console.log("Vault isWhitelistedDeposit: ", vault.whitelistedDeposit);
        console.log("Vault isUpgradeable: ", vault.upgradeable);
        console.log("Vault timestamp: ", vault.timestamp);
        console.log("Vault txHash: ", vault.txHash);
      });
    }
  }
}

async function processCreatedDVs() {
  const createdDVs = await GetCreatedDVs();
  console.log("Looking for created DVs...");

  for await (const result of createdDVs) {
    if (result.clusterCreateds) {
      result.clusterCreateds.forEach((cluster) => {
        console.log("Cluster id: ", cluster.id);
        console.log("Cluster timestamp: ", cluster.timestamp);
        console.log("Cluster txHash: ", cluster.txHash);
        console.log("Cluster splitAddress: ", cluster.splitAddress);
        console.log("Cluster eigenPodAddr: ", cluster.eigenPodAddr);
        console.log("Cluster averageAuctionScore: ", cluster.averageAuctionScore);
        console.log("Cluster winners: ", cluster.winners);
      });
    }
  }
}

processVaults().catch(console.error);
processCreatedDVs().catch(console.error);
