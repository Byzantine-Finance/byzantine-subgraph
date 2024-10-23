import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  EigenLayerNativeVaultCreated,
  Initialized,
  OwnershipTransferred
} from "../generated/StrategyVaultManager/StrategyVaultManager"

export function createEigenLayerNativeVaultCreatedEvent(
  vaultAddr: Address,
  eigenLayerStrat: Address,
  vaultCreator: Address,
  byzantineOracle: Address,
  privateVault: boolean,
  stratUpgradeable: boolean
): EigenLayerNativeVaultCreated {
  let eigenLayerNativeVaultCreatedEvent =
    changetype<EigenLayerNativeVaultCreated>(newMockEvent())

  eigenLayerNativeVaultCreatedEvent.parameters = new Array()

  eigenLayerNativeVaultCreatedEvent.parameters.push(
    new ethereum.EventParam("vaultAddr", ethereum.Value.fromAddress(vaultAddr))
  )
  eigenLayerNativeVaultCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eigenLayerStrat",
      ethereum.Value.fromAddress(eigenLayerStrat)
    )
  )
  eigenLayerNativeVaultCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "vaultCreator",
      ethereum.Value.fromAddress(vaultCreator)
    )
  )
  eigenLayerNativeVaultCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "byzantineOracle",
      ethereum.Value.fromAddress(byzantineOracle)
    )
  )
  eigenLayerNativeVaultCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "privateVault",
      ethereum.Value.fromBoolean(privateVault)
    )
  )
  eigenLayerNativeVaultCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "stratUpgradeable",
      ethereum.Value.fromBoolean(stratUpgradeable)
    )
  )

  return eigenLayerNativeVaultCreatedEvent
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
