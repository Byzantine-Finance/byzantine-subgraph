import {
  BidPlaced as BidPlacedEvent,
  BidUpdated as BidUpdatedEvent,
  BidWithdrawn as BidWithdrawnEvent,
  WinnerJoinedCluster as WinnerJoinedClusterEvent,
  ClusterCreated as ClusterCreatedEvent,
  ClusterCreated1 as ClusterCreatedLegacyEvent,
} from "../generated/Auction/Auction";
import { NodeOperator, BidPlaced, ClusterCreated, VaultCreated } from "../generated/schema";
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
  // Define the bidId using the bidId from the event
  let bidEntity = new BidPlaced(event.params.bidId);

  // Load the NodeOperator entity using the nodeOpAddr from the event
  let nodeOpEntity = NodeOperator.load(event.params.nodeOpAddr);

  // If the NodeOperator entity doesn't exist, create a new one
  if (nodeOpEntity == null) {
    nodeOpEntity = new NodeOperator(event.params.nodeOpAddr);
    nodeOpEntity.nodeOpAddr = event.params.nodeOpAddr.toHex();
    nodeOpEntity.hasPendingBids = true;
    nodeOpEntity.clusters = [];
    nodeOpEntity.save();
  }

  // Set the fields for the BidPlaced entity
  bidEntity.nodeOp = nodeOpEntity.id; // Refer back to the NodeOperator entity
  bidEntity.discountRate = scaleDown(
    BigInt.fromI32(event.params.discountRate),
    "100"
  );
  bidEntity.duration = event.params.duration;
  bidEntity.bidPrice = scaleDown(event.params.bidPrice, "1000000000000000000");
  bidEntity.auctionScore = event.params.auctionScore;
  bidEntity.timestamp = event.block.timestamp;
  bidEntity.txHash = event.transaction.hash.toHex();
  bidEntity.bidStatus = "Pending";
  if(event.params.auctionType == 1) {
    bidEntity.auctionType = "ClusterSize4";
  } else if (event.params.auctionType == 2) {
    bidEntity.auctionType = "ClusterSize7";
  } else {
    bidEntity.auctionType = "Null";
  }
  bidEntity.save();
}

export function handleBidUpdated(event: BidUpdatedEvent): void {
  // Get the corresponding BidPlaced entity by the bidId
  let bidEntity = BidPlaced.load(event.params.bidId);
  if (bidEntity == null) {
    log.warning("Bid with ID {} not found", [event.params.bidId.toHex()]);
    return;
  }

  bidEntity.discountRate = scaleDown(
    BigInt.fromI32(event.params.newDiscountRate),
    "100"
  );
  bidEntity.duration = event.params.newDuration;
  bidEntity.bidPrice = scaleDown(
    event.params.newBidPrice,
    "1000000000000000000"
  );
  bidEntity.auctionScore = event.params.newAuctionScore;
  bidEntity.timestamp = event.block.timestamp;
  bidEntity.txHash = event.transaction.hash.toHex();
  bidEntity.save();
}

export function handleBidWithdrawn(event: BidWithdrawnEvent): void {
  // Get the corresponding BidPlaced entity by the bidId
  let bidEntity = BidPlaced.load(event.params.bidId);
  if (bidEntity == null) {
    log.warning("Bid with ID {} not found", [event.params.bidId.toHex()]);
    return;
  }

  bidEntity.bidStatus = "Closed";
  bidEntity.timestamp = event.block.timestamp;
  bidEntity.txHash = event.transaction.hash.toHex();
  bidEntity.save();

  // Iteration to check if there are any active bids left in the NodeOperator entity
  let nodeOpEntity = NodeOperator.load(event.params.nodeOpAddr);
  if (nodeOpEntity == null) {
    log.warning("Node operator with ID {} not found", [
      event.params.nodeOpAddr.toHex(),
    ]);
    return;
  }

  let hasPendingBids = false;
  for (let i = 0; i < nodeOpEntity.bids.load().length; i++) {
    let bid = nodeOpEntity.bids.load()[i];

    // If at least one bid is pending, update the hasPendingBids variable to true and exit the loop
    if (bid.bidStatus == "Pending") {
      hasPendingBids = true;
      break;
    }
  }
  // Update the hasPendingBids field according to the variable hasPendingBids
  nodeOpEntity.hasPendingBids = hasPendingBids;
  nodeOpEntity.save();
}

export function handleWinnerJoinedCluster(
  event: WinnerJoinedClusterEvent
): void {
  let clusterEntity = ClusterCreated.load(event.params.clusterJoined);
  if (clusterEntity == null) {
    clusterEntity = new ClusterCreated(event.params.clusterJoined);
    clusterEntity.winners = [];
    clusterEntity.save();
  }

  // Get the winner bids using bidId from event
  let bidEntity = BidPlaced.load(event.params.winningBidId);
  if (bidEntity == null) {
    log.warning("Bid with ID {} not found", [
      event.params.winningBidId.toHex(),
    ]);
    return;
  }

  // Update the status of the bid to "Active"
  bidEntity.bidStatus = "Active";
  bidEntity.txHash = event.transaction.hash.toHex();
  bidEntity.timestamp = event.block.timestamp;
  bidEntity.save();

  // Push the BidPlaced entity to the list of winners
  // @dev Need to re-assign to be able to use push!
  let winners = clusterEntity.winners;
  winners.push(bidEntity.id);
  clusterEntity.winners = winners;
  clusterEntity.save();

  // Load the NodeOperator entity using the nodeOpAddr from the event
  let nodeOpEntity = NodeOperator.load(event.params.nodeOpAddr);

  // If the NodeOperator entity doesn't exist, create a new one
  if (nodeOpEntity == null) {
    log.warning("Node operator with ID {} not found", [
      event.params.nodeOpAddr.toHex(),
    ]);
    return;
  }

  // Push the ClusterCreated entity to the list of clusters in the NodeOperator entity
  // @dev Need to re-assign to be able to use push!
  let clusters = nodeOpEntity.clusters;
  if (clusters == null) {
    clusters = [];
  }
  clusters.push(clusterEntity.id);
  nodeOpEntity.clusters = clusters;
  nodeOpEntity.save();

  // Iteration to check if there are any active bids left in the NodeOperator entity
  let hasPendingBids = false;
  for (let i = 0; i < nodeOpEntity.bids.load().length; i++) {
    let bid = nodeOpEntity.bids.load()[i];

    // If at least one bid is pending, update the hasPendingBids variable to true and exit the loop
    if (bid.bidStatus == "Pending") {
      hasPendingBids = true;
      break;
    }
  }
  // Update the hasPendingBids field according to the variable hasPendingBids
  nodeOpEntity.hasPendingBids = hasPendingBids;
  nodeOpEntity.save();
}

export function handleClusterCreated(event: ClusterCreatedEvent): void {
  let clusterEntity = ClusterCreated.load(event.params.clusterId);
  if (clusterEntity == null) {
    log.warning("Cluster with ID {} not found", [event.params.clusterId.toHex()]);
    return;
  }

  let vaultEntity = VaultCreated.load(event.params.vaultAddr);
  if (vaultEntity == null) {
    log.warning("Vault with ID {} not found", [event.params.vaultAddr.toHex()]);
    return;
  }

  vaultEntity.tvl = vaultEntity.tvl.plus(BigInt.fromString("32000000000000000000"));
  vaultEntity.save();

  clusterEntity.vault = vaultEntity.id; // reference to the VaultCreated entity
  clusterEntity.averageAuctionScore = event.params.averageAuctionScore;
  clusterEntity.splitAddress = event.params.splitAddr.toHex();
  // Only exists on the updated event
  clusterEntity.eigenPodAddr = event.params.eigenPodAddr.toHex();
  clusterEntity.timestamp = event.block.timestamp;
  clusterEntity.txHash = event.transaction.hash.toHex();
  clusterEntity.save();
}

// Function specifically to handle the legacy ClusterCreated event (hardcoded eigenPodAddr and vaultAddr)
export function handleClusterCreatedLegacy(event: ClusterCreatedLegacyEvent): void {
  let clusterEntity = ClusterCreated.load(event.params.clusterId);
  if (clusterEntity == null) {
    log.warning("Cluster with ID {} not found", [event.params.clusterId.toHex()]);
    return;
  }

  let vaultEntity = VaultCreated.load(Address.fromString("0x5db1A17cB543997F8b3D7e6f8A544041507B9DA6"));
  if (vaultEntity == null) {
    log.warning("Vault with ID {} not found", [Address.fromString("0x5db1A17cB543997F8b3D7e6f8A544041507B9DA6").toHex()]);
    return;
  }

  vaultEntity.tvl = vaultEntity.tvl.plus(BigInt.fromString("32000000000000000000"));
  vaultEntity.save();

  clusterEntity.vault = vaultEntity.id; // reference to the VaultCreated entity
  clusterEntity.averageAuctionScore = event.params.averageAuctionScore;
  clusterEntity.splitAddress = event.params.splitAddr.toHex();
  clusterEntity.eigenPodAddr = "0x21E2a892DDc9BD3c0466299172F8b1D8026925ED";
  clusterEntity.timestamp = event.block.timestamp;
  clusterEntity.txHash = event.transaction.hash.toHex();
  clusterEntity.save();
}

/*******************HELPER FUNCTIONS*******************/

// Scale down to BidDecimal
function scaleDown(value: BigInt, factor: string): BigDecimal {
  let decimalValue = value.toBigDecimal();
  let scaleFactor = BigDecimal.fromString(factor);
  return decimalValue.div(scaleFactor);
}
