import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { BidPlaced } from "../generated/schema"
import { BidPlaced as BidPlacedEvent } from "../generated/Auction/Auction"
import { handleBidPlaced } from "../src/auction"
import { createBidPlacedEvent } from "./auction-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let nodeOpAddr = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let bidId = Bytes.fromI32(1234567890)
    let discountRate = 123
    let duration = BigInt.fromI32(234)
    let bidPrice = BigInt.fromI32(234)
    let auctionScore = BigInt.fromI32(234)
    let newBidPlacedEvent = createBidPlacedEvent(
      nodeOpAddr,
      bidId,
      discountRate,
      duration,
      bidPrice,
      auctionScore
    )
    handleBidPlaced(newBidPlacedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BidPlaced created and stored", () => {
    assert.entityCount("BidPlaced", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BidPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nodeOpAddr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BidPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bidId",
      "1234567890"
    )
    assert.fieldEquals(
      "BidPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "discountRate",
      "123"
    )
    assert.fieldEquals(
      "BidPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "duration",
      "234"
    )
    assert.fieldEquals(
      "BidPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bidPrice",
      "234"
    )
    assert.fieldEquals(
      "BidPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "auctionScore",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
