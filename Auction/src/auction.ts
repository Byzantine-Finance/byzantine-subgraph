import {
  BidPlaced as BidPlacedEvent,
  BidUpdated as BidUpdatedEvent,
  BidWithdrawn as BidWithdrawnEvent,
  ClusterCreated as ClusterCreatedEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  WinnerJoinedCluster as WinnerJoinedClusterEvent
} from "../generated/Auction/Auction"
import {
  BidPlaced,
  BidUpdated,
  BidWithdrawn,
  ClusterCreated,
  Initialized,
  OwnershipTransferred,
  WinnerJoinedCluster
} from "../generated/schema"

export function handleBidPlaced(event: BidPlacedEvent): void {
  let entity = new BidPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nodeOpAddr = event.params.nodeOpAddr
  entity.bidId = event.params.bidId
  entity.discountRate = event.params.discountRate
  entity.duration = event.params.duration
  entity.bidPrice = event.params.bidPrice
  entity.auctionScore = event.params.auctionScore

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBidUpdated(event: BidUpdatedEvent): void {
  let entity = new BidUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nodeOpAddr = event.params.nodeOpAddr
  entity.oldBidId = event.params.oldBidId
  entity.newBidId = event.params.newBidId
  entity.newDiscountRate = event.params.newDiscountRate
  entity.newDuration = event.params.newDuration
  entity.newBidPrice = event.params.newBidPrice
  entity.newAuctionScore = event.params.newAuctionScore

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBidWithdrawn(event: BidWithdrawnEvent): void {
  let entity = new BidWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nodeOpAddr = event.params.nodeOpAddr
  entity.bidId = event.params.bidId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClusterCreated(event: ClusterCreatedEvent): void {
  let entity = new ClusterCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.clusterId = event.params.clusterId
  entity.averageAuctionScore = event.params.averageAuctionScore
  entity.splitAddr = event.params.splitAddr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWinnerJoinedCluster(
  event: WinnerJoinedClusterEvent
): void {
  let entity = new WinnerJoinedCluster(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nodeOpAddr = event.params.nodeOpAddr
  entity.clusterJoined = event.params.clusterJoined

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
