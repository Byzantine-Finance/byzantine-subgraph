import {
  EigenLayerNativeVaultCreated as EigenLayerNativeVaultCreatedEvent,
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/StrategyVaultManager/StrategyVaultManager"
import {
  EigenLayerNativeVaultCreated,
  Initialized,
  OwnershipTransferred,
} from "../generated/schema"

export function handleEigenLayerNativeVaultCreated(
  event: EigenLayerNativeVaultCreatedEvent,
): void {
  let entity = new EigenLayerNativeVaultCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.vaultAddr = event.params.vaultAddr
  entity.eigenLayerStrat = event.params.eigenLayerStrat
  entity.vaultCreator = event.params.vaultCreator
  entity.byzantineOracle = event.params.byzantineOracle
  entity.privateVault = event.params.privateVault
  entity.stratUpgradeable = event.params.stratUpgradeable

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
