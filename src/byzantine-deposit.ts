import {
  Deposit as DepositEvent,
  DepositTokenAdded as DepositTokenAddedEvent,
  DepositorStatusChanged as DepositorStatusChangedEvent,
  MoveToVault as MoveToVaultEvent,
  PermissionlessDepositSet as PermissionlessDepositSetEvent,
  Withdraw as WithdrawEvent,
  DepositTokenRemoved as DepositTokenRemovedEvent
} from "../generated/ByzantineDeposit/ByzantineDeposit"
import { DepositContract, DepositByToken, WhitelistedDepositor } from "../generated/schema"
import { Bytes, BigInt, log } from "@graphprotocol/graph-ts"

export function handleDepositTokenAdded(event: DepositTokenAddedEvent): void {
  // load the DepositContract entity by its fixed id "byzantine-deposit"
  let depositContract = DepositContract.load(Bytes.fromUTF8("byzantine-deposit"))

  // create a new entity if it doesn't exist
  if (!depositContract) {
    depositContract = new DepositContract(Bytes.fromUTF8("byzantine-deposit"))
    depositContract.isPermissionlessDeposit = false
    depositContract.whitelistedDepositors = []
    depositContract.depositByToken = []
    depositContract.save()
  }

  // load the depositByToken entity by its token address
  let depositByToken = DepositByToken.load(event.params.token)

  if (depositByToken) {
    // update the depositByToken entity
    depositByToken.allowDeposit = true
    depositByToken.save()
  } else {
    // if it doesn't exist, create a new one
    depositByToken = new DepositByToken(event.params.token)
    depositByToken.allowDeposit = false
    depositByToken.totalDeposit = BigInt.fromI32(0)
    depositByToken.availableDeposit = BigInt.fromI32(0)
    depositByToken.totalMovedToVault = BigInt.fromI32(0)
    depositByToken.save()

    // update the DepositContract entity
    depositByToken.allowDeposit = true
    depositByToken.save()
    
    // push the new depositByToken to the depositContract
    let depositByTokenArray = depositContract.depositByToken!
    depositByTokenArray.push(depositByToken.id)
    depositContract.depositByToken = depositByTokenArray
    depositContract.save()
  }
}

export function handleDepositTokenRemoved(event: DepositTokenRemovedEvent): void {
  // load the depositByToken entity by its token address
  let depositByToken = DepositByToken.load(event.params.token)

  if (depositByToken == null) {
    log.warning("Error: trying to remove a token that has never been added {}", [event.params.token.toHexString()])
    return
  }

  depositByToken.allowDeposit = false
  depositByToken.save()
}

export function handleDepositorStatusChanged(event: DepositorStatusChangedEvent): void {
  // load the DepositContract entity by its fixed id "byzantine-deposit"
  let depositContract = DepositContract.load(Bytes.fromUTF8("byzantine-deposit"))

  // create a new entity if it doesn't exist
  if (!depositContract) {
    depositContract = new DepositContract(Bytes.fromUTF8("byzantine-deposit"))
    depositContract.isPermissionlessDeposit = false
    depositContract.whitelistedDepositors = []
    depositContract.depositByToken = []
    depositContract.save()
  }

  // load the WhitelistedDepositor entity by its depositor address
  let whitelistedDepositor = WhitelistedDepositor.load(event.params.depositor)

  if (whitelistedDepositor) {
    // update the WhitelistedDepositor entity
    whitelistedDepositor.canDeposit = event.params.canDeposit
    whitelistedDepositor.save()
  } else {
    // if it doesn't exist, create a new one
    whitelistedDepositor = new WhitelistedDepositor(event.params.depositor)
    whitelistedDepositor.canDeposit = event.params.canDeposit
    whitelistedDepositor.save()
  
    // push the WhitelistedDepositor to the WhitelistedDepositors array in DepositContract
    let whitelistedDepositors = depositContract.whitelistedDepositors!
    whitelistedDepositors.push(whitelistedDepositor.id)
    depositContract.whitelistedDepositors = whitelistedDepositors
    depositContract.save()
  }
}

export function handleDeposit(event: DepositEvent): void {
  // load the DepositContract entity by its fixed id "byzantine-deposit": either setCanDeposit or setPermissionlessDeposit function should be called before deposit
  let depositContract = DepositContract.load(Bytes.fromUTF8("byzantine-deposit"))!

  // load the depositByToken entity by its token address
  let depositByToken = DepositByToken.load(event.params.token)

  if (depositByToken) {
    // update the depositByToken entity
    depositByToken.totalDeposit = depositByToken.totalDeposit.plus(event.params.amount)
    depositByToken.availableDeposit = depositByToken.availableDeposit.plus(event.params.amount)
    depositByToken.save()  
  } else {
    // if it doesn't exist, create a new one
    depositByToken = new DepositByToken(event.params.token)
    depositByToken.allowDeposit = false
    depositByToken.totalDeposit = BigInt.fromI32(0)
    depositByToken.availableDeposit = BigInt.fromI32(0)
    depositByToken.totalMovedToVault = BigInt.fromI32(0)
    depositByToken.save()

    // update the depositByToken entity
    depositByToken.allowDeposit = true
    depositByToken.totalDeposit = depositByToken.totalDeposit.plus(event.params.amount)
    depositByToken.availableDeposit = depositByToken.availableDeposit.plus(event.params.amount)
    depositByToken.save()

    // push the new deposit to depositByToken
    let depositByTokenArray = depositContract.depositByToken!
    depositByTokenArray.push(depositByToken.id)
    depositContract.depositByToken = depositByTokenArray
    depositContract.save()
  }
}

export function handleWithdraw(event: WithdrawEvent): void {
  // load the depositByToken entity by its token address
  let depositByToken = DepositByToken.load(event.params.token)!

  // update the depositByToken entity
  depositByToken.totalDeposit = depositByToken.totalDeposit.minus(event.params.amount)
  depositByToken.availableDeposit = depositByToken.availableDeposit.minus(event.params.amount)
  depositByToken.save()
}

export function handleMoveToVault(event: MoveToVaultEvent): void {
  // load the depositByToken entity by its token address
  let depositByToken = DepositByToken.load(event.params.token)!

  // update the depositByToken entity
  depositByToken.availableDeposit = depositByToken.availableDeposit.minus(event.params.amount)
  depositByToken.totalMovedToVault = depositByToken.totalMovedToVault.plus(event.params.amount)
  depositByToken.save()
}

export function handlePermissionlessDepositSet(event: PermissionlessDepositSetEvent): void {
  // load the DepositContract entity by its fixed id "byzantine-deposit"
  let depositContract = DepositContract.load(Bytes.fromUTF8("byzantine-deposit"))

  if (depositContract) {
    // update the DepositContract entity
    depositContract.isPermissionlessDeposit = event.params.permissionlessDeposit
    depositContract.save()
  } else {
    // create a new DepositContract entity
    depositContract = new DepositContract(Bytes.fromUTF8("byzantine-deposit"))
    depositContract.isPermissionlessDeposit = false
    depositContract.whitelistedDepositors = []
    depositContract.depositByToken = []
    depositContract.save()

    // update the DepositContract entity
    depositContract.isPermissionlessDeposit = event.params.permissionlessDeposit
    depositContract.save()
  }
}
