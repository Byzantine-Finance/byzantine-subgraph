import { log, newMockEvent } from "matchstick-as";
import {
  ethereum,
  Address,
  BigInt,
  BigDecimal,
  bigInt,
  Bytes,
} from "@graphprotocol/graph-ts";
import {
  BidPlaced,
  BidUpdated,
  BidWithdrawn,
  WinnerJoinedDV,
} from "../generated/Auction/Auction";

export function createBidPlacedEvent(
  nodeOpAddr: Address,
  reputationScore: BigInt,
  discountRate: BigInt,
  duration: BigInt,
  bidPrice: BigInt,
  auctionScore: BigInt
): BidPlaced {
  let bidPlacedEvent = changetype<BidPlaced>(newMockEvent());

  bidPlacedEvent.parameters = new Array();

  let nodeOpAddrParam = new ethereum.EventParam(
    "nodeOp",
    ethereum.Value.fromAddress(nodeOpAddr)
  );
  let reputationScoreParam = new ethereum.EventParam(
    "reputationScore",
    ethereum.Value.fromUnsignedBigInt(reputationScore)
  );
  let discountRateParam = new ethereum.EventParam(
    "discountRate",
    ethereum.Value.fromUnsignedBigInt(discountRate)
  );
  let durationParam = new ethereum.EventParam(
    "duration",
    ethereum.Value.fromUnsignedBigInt(duration)
  );
  let bidPriceParam = new ethereum.EventParam(
    "bidPrice",
    ethereum.Value.fromUnsignedBigInt(bidPrice)
  );
  let auctionScoreParam = new ethereum.EventParam(
    "auctionScore",
    ethereum.Value.fromUnsignedBigInt(auctionScore)
  );

  bidPlacedEvent.parameters.push(nodeOpAddrParam);
  bidPlacedEvent.parameters.push(reputationScoreParam);
  bidPlacedEvent.parameters.push(discountRateParam);
  bidPlacedEvent.parameters.push(durationParam);
  bidPlacedEvent.parameters.push(bidPriceParam);
  bidPlacedEvent.parameters.push(auctionScoreParam);

  return bidPlacedEvent;
}

export function createBidUpdatedEvent(
  nodeOpAddr: Address,
  reputationScore: BigInt,
  oldAuctionScore: BigInt,
  newTimeInDays: BigInt,
  newDiscountRate: BigInt,
  newBidPrice: BigInt,
  newAuctionScore: BigInt
): BidUpdated {
  let bidUpdatedEvent = changetype<BidUpdated>(newMockEvent());

  bidUpdatedEvent.parameters = new Array();

  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "nodeOpAddr",
      ethereum.Value.fromAddress(nodeOpAddr)
    )
  );
  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "reputationScore",
      ethereum.Value.fromUnsignedBigInt(reputationScore)
    )
  );

  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldAuctionScore",
      ethereum.Value.fromUnsignedBigInt(oldAuctionScore)
    )
  );

  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newTimeInDays",
      ethereum.Value.fromUnsignedBigInt(newTimeInDays)
    )
  );

  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newDiscountRate",
      ethereum.Value.fromUnsignedBigInt(newDiscountRate)
    )
  );

  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newBidPrice",
      ethereum.Value.fromUnsignedBigInt(newBidPrice)
    )
  );

  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAuctionScore",
      ethereum.Value.fromUnsignedBigInt(newAuctionScore)
    )
  );

  return bidUpdatedEvent;
}

export function createBidWithdrawnEvent(
  nodeOpAddr: Address,
  auctionScore: BigInt
): BidWithdrawn {
  let bidWithdrawnEvent = changetype<BidWithdrawn>(newMockEvent());

  bidWithdrawnEvent.parameters = new Array();

  bidWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "nodeOpAddr",
      ethereum.Value.fromAddress(nodeOpAddr)
    )
  );

  bidWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "auctionScore",
      ethereum.Value.fromUnsignedBigInt(auctionScore)
    )
  );

  return bidWithdrawnEvent;
}

export function createWinnerJoinedDVEvent(
  nodeOpAddr: Address,
  auctionScore: BigInt
): WinnerJoinedDV {
  let winnerJoinedDvEvent = changetype<WinnerJoinedDV>(newMockEvent());

  winnerJoinedDvEvent.parameters = new Array();

  winnerJoinedDvEvent.parameters.push(
    new ethereum.EventParam(
      "nodeOpAddr",
      ethereum.Value.fromAddress(nodeOpAddr)
    )
  );

  winnerJoinedDvEvent.parameters.push(
    new ethereum.EventParam(
      "auctionScore",
      ethereum.Value.fromUnsignedBigInt(auctionScore)
    )
  );

  return winnerJoinedDvEvent;
}

// Function to scale BigInt to BigDecimal and convert it to BigInt
// function scaleDownToBigInt(value: BigInt, factor: string): BigInt {
//   let decimalValue = value.toBigDecimal();
//   let scaleFactor = BigDecimal.fromString(factor);
//   let scaledValue = decimalValue.div(scaleFactor);
//   return BigInt.fromString(scaledValue.toString().split(".")[0]);
// }

// Scale BigInt to BigDecimal
// function scaleDown(value: BigInt, factor: string): BigDecimal {
//   let decimalValue = value.toBigDecimal();
//   let scaleFactor = BigDecimal.fromString(factor);
//   return decimalValue.div(scaleFactor);
// }
