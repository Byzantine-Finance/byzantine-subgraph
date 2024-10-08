import {
  BidPlaced as BidPlacedEvent,
  BidUpdated as BidUpdatedEvent,
  BidWithdrawn as BidWithdrawnEvent,
  WinnerJoinedDV as WinnerJoinedDVEvent,
} from "../generated/Auction/Auction";
import { NodeOperator, BidPlaced, DV } from "../generated/schema";
import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
  log,
  store,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export function handleBidPlaced(event: BidPlacedEvent): void {
  // Define the bidId for each bid placed by the node operator
  let bidEntity = new BidPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  // Load the NodeOperator entity using the nodeOpAddr from the event
  let nodeOpId = event.params.nodeOpAddr.toHex();
  let nodeOpIdBytes: Bytes = Bytes.fromHexString(nodeOpId);
  let nodeOpEntity = NodeOperator.load(nodeOpIdBytes);

  // If the NodeOperator entity doesn't exist, create a new one
  if (nodeOpEntity == null) {
    nodeOpEntity = new NodeOperator(nodeOpIdBytes);
    nodeOpEntity.nodeOpAddr = event.params.nodeOpAddr.toHex();
    nodeOpEntity.reputationScore = event.params.reputationScore;
    nodeOpEntity.hasActiveBids = true;
    nodeOpEntity.save();
  }

  // Update the reputationScore for the NodeOperator entity
  nodeOpEntity.reputationScore = event.params.reputationScore;
  nodeOpEntity.save();

  // Set the fields for the BidPlaced entity
  bidEntity.nodeOp = nodeOpEntity.id; // Refer back to the NodeOperator entity
  bidEntity.discountRate = scaleDown(event.params.discountRate, "100");
  bidEntity.duration = event.params.duration;
  bidEntity.bidPrice = scaleDown(event.params.bidPrice, "1000000000000000000");
  bidEntity.uint256AuctionScore = event.params.auctionScore;
  bidEntity.timestamp = event.block.timestamp;
  bidEntity.txHash = event.transaction.hash.toHex();
  bidEntity.bidStatus = "Pending";

  bidEntity.save();
}

export function handleBidUpdated(event: BidUpdatedEvent): void {
  // Get the corresponding NodeOp ID
  let nodeOpId = event.params.nodeOpAddr.toHex();
  let nodeOpIdBytes: Bytes = Bytes.fromHexString(nodeOpId);
  let nodeOpEntity = NodeOperator.load(nodeOpIdBytes);

  // If the NodeOperator entity doesn't exist, log a warning
  if (nodeOpEntity == null) {
    log.warning("Node operator with ID {} not found", [nodeOpId]);
    return;
  }

  // Get the corresponding Bid ID
  let bids = nodeOpEntity.bids.load();
  for (let i = bids.length - 1; i >= 0; i--) {
    let bid = bids[i];
    let bidId = bid.id;

    // If the Bid entity doesn't exist, log a warning
    if (bid == null) {
      log.warning("Bid with ID {} not found", [bidId.toString()]);
      return;
    } else {
      // If the Bid entity exists, update the fields
      if (
        bid.uint256AuctionScore == event.params.oldAuctionScore &&
        bid.bidStatus == "Pending"
      ) {
        bid.discountRate = scaleDown(event.params.newDiscountRate, "100");
        bid.duration = event.params.newDuration;
        bid.bidPrice = scaleDown(
          event.params.newBidPrice,
          "1000000000000000000"
        );
        bid.uint256AuctionScore = event.params.newAuctionScore;
        bid.timestamp = event.block.timestamp;
        bid.txHash = event.transaction.hash.toHex();
        bid.save();
        break; // Only update the last bid that matches the auctionScore
      }
    }
  }
}

export function handleBidWithdrawn(event: BidWithdrawnEvent): void {
  // Get the corresponding NodeOp ID
  let nodeOpId = event.params.nodeOpAddr.toHex();
  let nodeOpIdBytes: Bytes = Bytes.fromHexString(nodeOpId);
  let nodeOpEntity = NodeOperator.load(nodeOpIdBytes);

  // If the NodeOperator entity doesn't exist, log a warning
  if (nodeOpEntity == null) {
    log.warning("Node operator with ID {} not found", [nodeOpId]);
    return;
  }

  // If the NodeOperator entity exists
  // Iterate through all the bids of the NodeOperator
  let bids = nodeOpEntity.bids.load();
  for (let i = bids.length - 1; i >= 0; i--) {
    let bid = bids[i];
    let bidAuctionScore = bid.uint256AuctionScore;

    // Find the bid that matches the auctionScore of the event and has a Pending status
    if (
      bidAuctionScore == event.params.auctionScore &&
      bid.bidStatus == "Pending"
    ) {
      bid.bidStatus = "Closed";
      bid.txHash = event.transaction.hash.toHex();
      bid.timestamp = event.block.timestamp;
      bid.save();
      break; // Only "withdraw" the last bid in the array that matches the auctionScore
    }
  }

  // Iteration to check if there are any active bids left in the NodeOperator entity
  let hasActiveBids = false;
  for (let i = 0; i < nodeOpEntity.bids.load().length; i++) {
    let bid = nodeOpEntity.bids.load()[i];

    // If at least one bid is active, update the hasActiveBids variable to true and exit the loop
    if (bid.bidStatus == "Pending") {
      hasActiveBids = true;
      break;
    }
  }
  // Update the hasActiveBids field according to the variable hasActiveBids
  nodeOpEntity.hasActiveBids = hasActiveBids;
  nodeOpEntity.save();
}

export function handleWinnerJoinedDV(event: WinnerJoinedDVEvent): void {
  // Get the corresponding NodeOp ID
  let nodeOpId = event.params.nodeOpAddr.toHex();
  let nodeOpIdBytes: Bytes = Bytes.fromHexString(nodeOpId);
  let nodeOpEntity = NodeOperator.load(nodeOpIdBytes);

  // If the NodeOperator entity doesn't exist, log a warning
  if (nodeOpEntity == null) {
    log.warning("Node operator with ID {} not found", [nodeOpId]);
    return;
  }

  // If the NodeOperator entity exists, iterate through all the bids of the NodeOperator
  let bids = nodeOpEntity.bids.load();
  for (let i = bids.length - 1; i >= 0; i--) {
    let bid = bids[i];
    let bidAuctionScore = bid.uint256AuctionScore;

    // Find the bid that matches the auctionScore of the event and it is an active bid
    if (
      bidAuctionScore == event.params.auctionScore &&
      bid.bidStatus == "Pending"
    ) {
      bid.bidStatus = "Active";
      bid.txHash = event.transaction.hash.toHex();
      bid.timestamp = event.block.timestamp;
      bid.save();

      // Load the DV entity using the tx hash from the event
      let dv = DV.load(event.transaction.hash);

      // If the DV entity doesn't exist, create a new one
      if (dv == null) {
        dv = new DV(event.transaction.hash);
        dv.timestamp = event.block.timestamp;
        dv.txHash = event.transaction.hash.toHex();
        dv.winners = [];
        dv.save();
      }

      // Push the BidPlaced entity to the list of winners
      // @dev Need to re-assign to be able to use push!
      let winners = dv.winners;
      winners.push(bid.id);
      dv.winners = winners;
      dv.save();

      break; // Only the last bid in the array that matches the auctionScore is the winner
    }
  }

  // Iteration to check if there are any active bids left in the NodeOperator entity
  let hasActiveBids = false;
  for (let i = 0; i < nodeOpEntity.bids.load().length; i++) {
    let bid = nodeOpEntity.bids.load()[i];

    // If at least one bid is active, update the hasActiveBids variable to true and exit the loop
    if (bid.bidStatus == "Pending") {
      hasActiveBids = true;
      break;
    }
  }
  // Update the hasActiveBids field according to the variable hasActiveBids
  nodeOpEntity.hasActiveBids = hasActiveBids;
  nodeOpEntity.save();
}

/*******************HELPER FUNCTIONS*******************/

// Scale down to BidDecimal
function scaleDown(value: BigInt, factor: string): BigDecimal {
  let decimalValue = value.toBigDecimal();
  let scaleFactor = BigDecimal.fromString(factor);
  return decimalValue.div(scaleFactor);
}
