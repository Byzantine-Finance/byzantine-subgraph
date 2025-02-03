import {
  Deposit as DepositEvent,
  DepositTokenAdded as DepositTokenAddedEvent,
  DepositorStatusChanged as DepositorStatusChangedEvent,
  MoveToVault as MoveToVaultEvent,
  PermissionlessDepositSet as PermissionlessDepositSetEvent,
  Withdraw as WithdrawEvent,
  DepositTokenRemoved as DepositTokenRemovedEvent
} from "../generated/ByzantineDeposit/ByzantineDeposit"
import { DepositContract, Token, Depositor, DepositorToken, BalanceOverTime } from "../generated/schema"
import { Bytes, BigInt, log } from "@graphprotocol/graph-ts"

export function handleDepositTokenAdded(event: DepositTokenAddedEvent): void {
  // load the DepositContract entity by its fixed id "byzantine-deposit"
  let depositContract = DepositContract.load(Bytes.fromUTF8("byzantine-deposit"))

  // create a new entity if it doesn't exist
  if (!depositContract) {
    depositContract = new DepositContract(Bytes.fromUTF8("byzantine-deposit"))
    depositContract.isPermissionlessDeposit = false
    depositContract.depositors = []
    depositContract.tokens = []
    depositContract.save()
  }

  // load the token entity by its token address
  let token = Token.load(event.params.token)

  if (token) {
    // update the token entity
    token.allowedToken = true
    token.save()
  } else {
    // if it doesn't exist, create a new one
    token = new Token(event.params.token)
    token.allowedToken = false
    token.totalDeposit = BigInt.fromI32(0)
    token.availableDeposit = BigInt.fromI32(0)
    token.totalMovedToVault = BigInt.fromI32(0)
    token.balanceOverTime = []
    token.save()

    // update the DepositContract entity
    token.allowedToken = true
    token.save()
    
    // push the new depositByToken to the depositContract
    let tokenArray = depositContract.tokens!
    tokenArray.push(token.id)
    depositContract.tokens = tokenArray
    depositContract.save()
  }
}

export function handleDepositTokenRemoved(event: DepositTokenRemovedEvent): void {
  // load the token entity by its token address
  let token = Token.load(event.params.token)

  if (token == null) {
    log.warning("Error: trying to remove a token that has never been added {}", [event.params.token.toHexString()])
    return
  }

  token.allowedToken = false
  token.save()
}

export function handleDepositorStatusChanged(event: DepositorStatusChangedEvent): void {
  // load the DepositContract entity by its fixed id "byzantine-deposit"
  let depositContract = DepositContract.load(Bytes.fromUTF8("byzantine-deposit"))

  // create a new entity if it doesn't exist
  if (!depositContract) {
    depositContract = new DepositContract(Bytes.fromUTF8("byzantine-deposit"))
    depositContract.isPermissionlessDeposit = false
    depositContract.depositors = []
    depositContract.tokens = []
    depositContract.save()
  }

  // load the Depositor entity by its depositor address
  let depositor = Depositor.load(event.params.depositor)

  if (depositor) {
    // update the Depositor entity
    depositor.canDeposit = event.params.canDeposit
    depositor.save()
  } else {
    // if it doesn't exist, create a new one
    depositor = new Depositor(event.params.depositor)
    depositor.canDeposit = event.params.canDeposit
    depositor.save()
  
    // push the Depositor to the Depositors array in DepositContract
    let depositors = depositContract.depositors!
    depositors.push(depositor.id)
    depositContract.depositors = depositors
    depositContract.save()
  }
}

export function handleDeposit(event: DepositEvent): void {
  // load the DepositContract entity by its fixed id "byzantine-deposit": either setCanDeposit or setPermissionlessDeposit function should be called before deposit
  let depositContract = DepositContract.load(Bytes.fromUTF8("byzantine-deposit"))!

  // create a new BalanceOverTime entity for Token with the id being the sender address, token address, and the deposit time
  let balanceOverTimeToken = new BalanceOverTime(event.params.sender.concat(event.params.token).concat(Bytes.fromI32(event.block.timestamp.toI32())))
  balanceOverTimeToken.depositTime = event.block.timestamp
  balanceOverTimeToken.balance = BigInt.fromI32(0)
  balanceOverTimeToken.save()

  // load Depositor entity by its depositor address
  let depositor = Depositor.load(event.params.sender)

  if (depositor) {
    // update the Depositor entity
    depositor.canDeposit = true
    depositor.save()
  } else {
    // if it doesn't exist, create a new one
    depositor = new Depositor(event.params.sender)
    depositor.canDeposit = true
    depositor.save()
  }

  // load the Token entity by its token address
  let token = Token.load(event.params.token)

  if (token) {
    // update the Token entity
    token.totalDeposit = token.totalDeposit.plus(event.params.amount)
    token.availableDeposit = token.availableDeposit.plus(event.params.amount)
    token.save()

    // update the balanceOverTime entity
    balanceOverTimeToken.balance = token.totalDeposit
    balanceOverTimeToken.save()

    // push the new balanceOverTime to the token
    let balanceOverTimeArray = token.balanceOverTime!
    balanceOverTimeArray.push(balanceOverTimeToken.id)
    token.balanceOverTime = balanceOverTimeArray
    token.save()
  } else {
    // if it doesn't exist, create a new one
    token = new Token(event.params.token)
    token.allowedToken = true
    token.totalDeposit = BigInt.fromI32(0)
    token.availableDeposit = BigInt.fromI32(0)
    token.totalMovedToVault = BigInt.fromI32(0)
    token.balanceOverTime = []
    token.save()

    // update the token entity
    token.totalDeposit = token.totalDeposit.plus(event.params.amount)
    token.availableDeposit = token.availableDeposit.plus(event.params.amount)
    token.save()

    // update the balanceOverTime entity
    balanceOverTimeToken.balance = token.totalDeposit
    balanceOverTimeToken.save()

    // push the new balanceOverTime to the token
    let balanceOverTimeArray = token.balanceOverTime!
    balanceOverTimeArray.push(balanceOverTimeToken.id)
    token.balanceOverTime = balanceOverTimeArray
    token.save()

    // push the new token to the depositContract
    let tokenArray = depositContract.tokens!
    tokenArray.push(token.id)
    depositContract.tokens = tokenArray
    depositContract.save()
  }

    // create a new BalanceOverTime entity for Depositor with the id being the sender address and the deposit time
    let balanceOverTimeDepositor = new BalanceOverTime(event.params.sender.concat(Bytes.fromI32(event.block.timestamp.toI32())))
    balanceOverTimeDepositor.depositTime = event.block.timestamp
    balanceOverTimeDepositor.balance = BigInt.fromI32(0)
    balanceOverTimeDepositor.save()

  // load depositorToken entity by its depositor address and token address
  let depositorToken = DepositorToken.load(event.params.sender.concat(event.params.token))

  if (depositorToken) {
    // update the depositorToken entity
    depositorToken.totalBalance = depositorToken.totalBalance.plus(event.params.amount)
    depositorToken.save()

    // update the balanceOverTime entity
    balanceOverTimeDepositor.balance = depositorToken.totalBalance
    balanceOverTimeDepositor.save()

    // push the new balanceOverTime to the depositorToken
    let balanceOverTimeArray = depositorToken.balanceOverTime!
    balanceOverTimeArray.push(balanceOverTimeDepositor.id)
    depositorToken.balanceOverTime = balanceOverTimeArray
    depositorToken.save()
  } else {
    // if it doesn't exist, create a new one
    depositorToken = new DepositorToken(event.params.sender.concat(event.params.token))
    depositorToken.depositor = depositor.id
    depositorToken.token = token.id
    depositorToken.totalBalance = event.params.amount
    depositorToken.balanceOverTime = []
    depositorToken.save()

    // update the balanceOverTime entity
    balanceOverTimeDepositor.balance = depositorToken.totalBalance
    balanceOverTimeDepositor.save()

    // update the depositorToken entity by pushing the new balanceOverTime to it
    let balanceOverTimeArray = depositorToken.balanceOverTime!
    balanceOverTimeArray.push(balanceOverTimeDepositor.id)
    depositorToken.balanceOverTime = balanceOverTimeArray
    depositorToken.save()
  }
}

export function handleWithdraw(event: WithdrawEvent): void {
  // load the token entity by its token address
  let token = Token.load(event.params.token)!

  // create a new BalanceOverTime entity for Token with the id being the sender address, token address, and the withdraw time
  let balanceOverTimeToken = new BalanceOverTime(event.params.sender.concat(event.params.token).concat(Bytes.fromI32(event.block.timestamp.toI32())))
  balanceOverTimeToken.depositTime = event.block.timestamp
  balanceOverTimeToken.balance = BigInt.fromI32(0)
  balanceOverTimeToken.save()
    
  // update the token entity
  token.totalDeposit = token.totalDeposit.minus(event.params.amount)
  token.availableDeposit = token.availableDeposit.minus(event.params.amount)
  token.save()

  // update the balanceOverTime entity
  balanceOverTimeToken.balance = token.totalDeposit
  balanceOverTimeToken.save()

  // push the new balanceOverTime to the token
  let balanceOverTimeArray1 = token.balanceOverTime!
  balanceOverTimeArray1.push(balanceOverTimeToken.id)
  token.balanceOverTime = balanceOverTimeArray1
  token.save()

  // load the depositorToken entity by its depositor address and token address
  let depositorToken = DepositorToken.load(event.params.sender.concat(event.params.token))!

  // create a new BalanceOverTime entity for Depositor with the id being the sender address and the withdraw time
  let balanceOverTimeDepositor = new BalanceOverTime(event.params.sender.concat(Bytes.fromI32(event.block.timestamp.toI32())))
  balanceOverTimeDepositor.depositTime = event.block.timestamp
  balanceOverTimeDepositor.balance = BigInt.fromI32(0)
  balanceOverTimeDepositor.save()

  // update the depositorToken entity
  depositorToken.totalBalance = depositorToken.totalBalance.minus(event.params.amount)
  depositorToken.save()

  // update the balanceOverTime entity
  balanceOverTimeDepositor.balance = depositorToken.totalBalance
  balanceOverTimeDepositor.save()

  // push the new balanceOverTime to the depositorToken
  let balanceOverTimeArray2 = depositorToken.balanceOverTime!
  balanceOverTimeArray2.push(balanceOverTimeDepositor.id)
  depositorToken.balanceOverTime = balanceOverTimeArray2
  depositorToken.save()
}

export function handleMoveToVault(event: MoveToVaultEvent): void {
  // load the token entity by its token address
  let token = Token.load(event.params.token)!

  // update the token entity
  token.availableDeposit = token.availableDeposit.minus(event.params.amount)
  token.totalMovedToVault = token.totalMovedToVault.plus(event.params.amount)
  token.save()
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
    depositContract.depositors = []
    depositContract.tokens = []
    depositContract.save()

    // update the DepositContract entity
    depositContract.isPermissionlessDeposit = event.params.permissionlessDeposit
    depositContract.save()
  }
}
