import { getBuiltGraphSDK } from "./.graphclient";

const { GetPendingBids } = getBuiltGraphSDK();

async function main() {
  const pendingBids = await GetPendingBids();

  for await (const result of pendingBids) {
    console.log(result.bidPlaceds);
  }
}

main().catch(console.error);
