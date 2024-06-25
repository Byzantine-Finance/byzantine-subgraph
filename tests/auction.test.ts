import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  log,
} from "matchstick-as/assembly/index";
import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { BidPlaced } from "../generated/schema";
import { BidPlaced as BidPlacedEvent } from "../generated/Auction/Auction";
import { handleBidPlaced } from "../src/auction";
import { createBidPlacedEvent } from "./auction-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let nodeOpAddr = Address.fromString(
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    );
    let reputationScore = BigInt.fromI32(1);
    let discountRate = BigInt.fromString("1400");
    let duration = BigInt.fromI32(365);
    let bidPrice = BigInt.fromString("254559999999999790");
    let auctionScore = BigInt.fromString("1004466779031871");
    let newBidPlacedEvent = createBidPlacedEvent(
      nodeOpAddr,
      reputationScore,
      discountRate,
      duration,
      bidPrice,
      auctionScore
    );
    handleBidPlaced(newBidPlacedEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BidPlaced created and stored", () => {
    // Get BidPlaced ID
    let nodeOpId = Address.fromString(
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a"
    );
    let auctScore = BigInt.fromString("1004466779031871");
    let count = 1;
    let bidId = generateBidId(auctScore, count);
    let bidIdBytes = Bytes.fromHexString(bidId);

    assert.entityCount("BidPlaced", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BidPlaced",
      bidIdBytes.toHex(),
      "nodeOp",
      nodeOpId.toHexString()
    );
    assert.fieldEquals("BidPlaced", bidIdBytes.toHex(), "reputationScore", "1");
    assert.fieldEquals("BidPlaced", bidIdBytes.toHex(), "discountRate", "14");
    assert.fieldEquals("BidPlaced", bidIdBytes.toHex(), "duration", "365");
    assert.fieldEquals(
      "BidPlaced",
      bidIdBytes.toHex(),
      "bidPrice",
      "0.25455999999999979"
    );
    assert.fieldEquals(
      "BidPlaced",
      bidIdBytes.toHex(),
      "auctionScore",
      "0.001004466779031871"
    );
    assert.fieldEquals("BidPlaced", bidIdBytes.toHex(), "isActive", "true");
    assert.fieldEquals("BidPlaced", bidIdBytes.toHex(), "isWinner", "false");
  });
});

// Function to generate bid ID (same as in your event handler)
function generateBidId(auctionScore: BigInt, count: number): string {
  return auctionScore.toString() + "-" + count.toString();
}
