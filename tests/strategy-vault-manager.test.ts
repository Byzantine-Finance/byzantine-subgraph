import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { EigenLayerNativeVaultCreated } from "../generated/schema"
import { EigenLayerNativeVaultCreated as EigenLayerNativeVaultCreatedEvent } from "../generated/StrategyVaultManager/StrategyVaultManager"
import { handleEigenLayerNativeVaultCreated } from "../src/strategy-vault-manager"
import { createEigenLayerNativeVaultCreatedEvent } from "./strategy-vault-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let vaultAddr = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let eigenLayerStrat = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let vaultCreator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let byzantineOracle = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let privateVault = "boolean Not implemented"
    let stratUpgradeable = "boolean Not implemented"
    let newEigenLayerNativeVaultCreatedEvent =
      createEigenLayerNativeVaultCreatedEvent(
        vaultAddr,
        eigenLayerStrat,
        vaultCreator,
        byzantineOracle,
        privateVault,
        stratUpgradeable
      )
    handleEigenLayerNativeVaultCreated(newEigenLayerNativeVaultCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EigenLayerNativeVaultCreated created and stored", () => {
    assert.entityCount("EigenLayerNativeVaultCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EigenLayerNativeVaultCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "vaultAddr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EigenLayerNativeVaultCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "eigenLayerStrat",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EigenLayerNativeVaultCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "vaultCreator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EigenLayerNativeVaultCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "byzantineOracle",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EigenLayerNativeVaultCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "privateVault",
      "boolean Not implemented"
    )
    assert.fieldEquals(
      "EigenLayerNativeVaultCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "stratUpgradeable",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
