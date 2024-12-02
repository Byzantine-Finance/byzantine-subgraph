import {
  EigenLayerNativeVaultCreated as EigenLayerNativeVaultCreatedEvent
} from "../generated/StrategyVaultManager/StrategyVaultManager"
import {
  VaultCreated
} from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleEigenLayerNativeVaultCreated(
  event: EigenLayerNativeVaultCreatedEvent,
): void {
  let vaultEntity = new VaultCreated(event.params.vaultAddr);

  vaultEntity.protocol = "EigenLayer";
  vaultEntity.type = "Native";
  vaultEntity.operator = event.params.eigenLayerStrat.toHex();
  vaultEntity.creator = event.params.vaultCreator.toHex();
  vaultEntity.oracle = event.params.byzantineOracle.toHex();
  vaultEntity.whitelistedDeposit = event.params.privateVault;
  vaultEntity.upgradeable = event.params.stratUpgradeable;
  vaultEntity.timestamp = event.block.timestamp;
  vaultEntity.txHash = event.transaction.hash.toHex();
  vaultEntity.tvl = BigInt.fromI32(0);
  vaultEntity.save()
}