import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  BidPlaced,
  BidUpdated,
  BidWithdrawn,
  ClusterCreated,
  Initialized,
  OwnershipTransferred,
  WinnerJoinedCluster
} from "../generated/Auction/Auction"

export function createBidPlacedEvent(
  nodeOpAddr: Address,
  bidId: Bytes,
  discountRate: i32,
  duration: BigInt,
  bidPrice: BigInt,
  auctionScore: BigInt
): BidPlaced {
  let bidPlacedEvent = changetype<BidPlaced>(newMockEvent())

  bidPlacedEvent.parameters = new Array()

  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "nodeOpAddr",
      ethereum.Value.fromAddress(nodeOpAddr)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("bidId", ethereum.Value.fromFixedBytes(bidId))
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "discountRate",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(discountRate))
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "bidPrice",
      ethereum.Value.fromUnsignedBigInt(bidPrice)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionScore",
      ethereum.Value.fromUnsignedBigInt(auctionScore)
    )
  )

  return bidPlacedEvent
}

export function createBidUpdatedEvent(
  nodeOpAddr: Address,
  oldBidId: Bytes,
  newBidId: Bytes,
  newDiscountRate: i32,
  newDuration: BigInt,
  newBidPrice: BigInt,
  newAuctionScore: BigInt
): BidUpdated {
  let bidUpdatedEvent = changetype<BidUpdated>(newMockEvent())

  bidUpdatedEvent.parameters = new Array()

  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "nodeOpAddr",
      ethereum.Value.fromAddress(nodeOpAddr)
    )
  )
  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam("oldBidId", ethereum.Value.fromFixedBytes(oldBidId))
  )
  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam("newBidId", ethereum.Value.fromFixedBytes(newBidId))
  )
  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newDiscountRate",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newDiscountRate))
    )
  )
  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newDuration",
      ethereum.Value.fromUnsignedBigInt(newDuration)
    )
  )
  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newBidPrice",
      ethereum.Value.fromUnsignedBigInt(newBidPrice)
    )
  )
  bidUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAuctionScore",
      ethereum.Value.fromUnsignedBigInt(newAuctionScore)
    )
  )

  return bidUpdatedEvent
}

export function createBidWithdrawnEvent(
  nodeOpAddr: Address,
  bidId: Bytes
): BidWithdrawn {
  let bidWithdrawnEvent = changetype<BidWithdrawn>(newMockEvent())

  bidWithdrawnEvent.parameters = new Array()

  bidWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "nodeOpAddr",
      ethereum.Value.fromAddress(nodeOpAddr)
    )
  )
  bidWithdrawnEvent.parameters.push(
    new ethereum.EventParam("bidId", ethereum.Value.fromFixedBytes(bidId))
  )

  return bidWithdrawnEvent
}

export function createClusterCreatedEvent(
  clusterId: Bytes,
  averageAuctionScore: BigInt,
  splitAddr: Address
): ClusterCreated {
  let clusterCreatedEvent = changetype<ClusterCreated>(newMockEvent())

  clusterCreatedEvent.parameters = new Array()

  clusterCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "clusterId",
      ethereum.Value.fromFixedBytes(clusterId)
    )
  )
  clusterCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "averageAuctionScore",
      ethereum.Value.fromUnsignedBigInt(averageAuctionScore)
    )
  )
  clusterCreatedEvent.parameters.push(
    new ethereum.EventParam("splitAddr", ethereum.Value.fromAddress(splitAddr))
  )

  return clusterCreatedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createWinnerJoinedClusterEvent(
  nodeOpAddr: Address,
  clusterJoined: Bytes
): WinnerJoinedCluster {
  let winnerJoinedClusterEvent = changetype<WinnerJoinedCluster>(newMockEvent())

  winnerJoinedClusterEvent.parameters = new Array()

  winnerJoinedClusterEvent.parameters.push(
    new ethereum.EventParam(
      "nodeOpAddr",
      ethereum.Value.fromAddress(nodeOpAddr)
    )
  )
  winnerJoinedClusterEvent.parameters.push(
    new ethereum.EventParam(
      "clusterJoined",
      ethereum.Value.fromFixedBytes(clusterJoined)
    )
  )

  return winnerJoinedClusterEvent
}
