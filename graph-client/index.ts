import { getBuiltGraphSDK } from "./.graphclient";

const { GetCreatedDVs } = getBuiltGraphSDK();

async function main() {
  const createdDVs = await GetCreatedDVs();

  for await (const result of createdDVs) {
    if (result.dvs) {
      result.dvs.forEach((dv) => {
        console.log(dv.timestamp);
        console.log(dv.txHash);
        console.log(dv.winners);
      });
    } else {
      console.log("No DVs found.");
    }
  }
}

main().catch(console.error);
