# Byzantine Subgraph using The Graph Protocol

## What is The Graph?

The Graph is a decentralized protocol for indexing and querying blockchain data. The Graph makes indexing blockchain data much easier than ever before.

## What is a Subgraph?

A subgraph extracts data from a blockchain, processing it and storing it so that it can be easily queried via GraphQL. The subgraph descriptions, know as the manifest, defines how to pay attention to the events emitted by the smart contracts, how to handle event data and sotre it in its database.

## How to create a subgraph using Subgraph Studio?

### First-time The Graph setup - install the Graph CLI

Install with yarn:

`yarn global add @graphprotocol/graph-cli`

Install with npm:

`npm install -g @graphprotocol/graph-cli`

### Create and setup your subgraph

**1. Create your subgraph:**

Go to Subgraph Studio (https://thegraph.com/studio/), connect your wallet and create a subgraph.
Once you have created your subgraph, there is a panel with a list of commands on the right side of your subgraph page. Just follow them!

_In our subgraph, it is called "v5-auction-byzantine-holesky"._

**2. Initialize your subgraph by running:**

`graph init --studio v5-auction-byzantine-holesky`

Then, you will have to configure your subgraph:

- choose the protocol (eg. Ethereum)
- choose a slug, it is _v5-auction-byzantine-holesky_ for this project
- provide the directory where you want to create your subgraph
- choose the network (eg. mainnet, testnet or L2)
- paste the smart contract address that you want to index data from
- enter the Start Block number where you want to start indexing data from, usually it is the block when the smart contract was deployed
- give a contract name if you want to name it differently
- choose Yes to Index contract events as entities

**3. Authenticate your subgraph using :**

`graph auth --studio <DEPLOY KEY>`

_You can find the DEPLOY KEY in the header of your subgraph page, just copy paste it._

### Start building your subgraph

Now you can open your subgraph directory in your IDE. For every subgraph project, we need to amend at least amend three files to make it work properly:

- `schema.graphql`
- `subgraph.yaml`
- `src/auction.ts`

**Remember** to run `graph codegen && graph build` everytime after you have made changes to these files to update the files in generated and build folders.

**1. Define the entities in schema.graphql:**

Enties serve as custom data structures that allow you to group multiple elements of different types into a single group. Before defining your entities, you should think how you want to structure the data retrieved from your smart contract events. A schema of entities is automatically generated when createing the subgraph but it is unlikely that it is the one you want to use.

An entity is by default immutable and marked as `@entity(immutable: true)`. If you want it to be mutable, it should be marked as `@entity` only.

In our project, we have defined two mutable entities, `NodeOperator` and `BidPlaced`. You can name them what ever you want and it does not have to be the event names. Each entity has differents elements called `fields`. A field of an entity can also be of type AnotherEntity. (eg. `NodeOperator` has the field `bids` which is the type `BidPlaced`). Bear in mind that most of the fields of an entity are data that comes from the events emitted by the smart contract.

You may see different indicators in the schema:

- every entity is assigned a unique ID (`id: ID`). You can also define your own id field (eg. `id: <transaction hash>`)

- optional fields are marked as `!`

- list of fields are marked as `[]`

- reverse lookup fields are marked as `@derivedFrom(field: "<fiedl name>")`. It allows you to create a interdependant relationship between two entities and to lookup from one entity to another. In our case, the field `bids` of `NodeOperator` entity can lookup all the bids placed by the operator. In addition, the field `nodeOp` of `BidPlaced` entity can lookup the detail of the node operator who placed the bid. This is done by pointing `nodeOp` to the `id` of `NodeOperator` entity.

**2. Write the logic to handle events in src/auction.ts:**

Now you have defined your entities, you should tell subgraph what you want to do with the events and how you want them to behave. Simply put, what subgraph does is listen to the events of your smart contract, extract the data from the events, execute the operation according to the logic in your event handler and emit the data in the form of entities that you predefined.

**Summary of the logic that handles our events:**

- when BidPlaced event emitted: create a new `BidPlaced` entity with a `Pending` status, update its fields according to event data, check if the node operator who placed the bid already exists, if not, create a new `NodeOperator` entity, if yes, then update its fields.

- when BidUpdated event emitted: look for the corresponding `BidPlaced` entity using the old auction score and updates its fields with the new data.

- when BidWithdrawn event emitted: look for the corresponding `NodeOperator` entity using the operator address, iterate over all the bids placed by the operator to find the `Pending` bid with the same auction score, change its status to `Closed` and finally check if the operator has at least one pending bid left, if no, set `hasActiveBids` to `false`.

- when WinnerJoinedDV event emitted, it does the same thing than for the BidWithdrawn event, except it changes the status of the bid to `Active`.

**3. Amend the subgraph.yaml file:**

There are two fields called "entities" and "eventHandlers" in the subgraph.yaml file. You should make sure those fields have the exact same entities and eventHandlers that you defined in the above files.

### Deploy your subgraph

Before deploying, run:

`graph codegen && graph build`

Deploy your subgraph:

`graph deploy --studio <SUBGRAPH SLUG>`

Once deployed, you should wait for all the blocks to be synced and then you can query your subgraph using the GraphQL playground or use subgraph in your dApp!

## Deploy a new version of your subgraph

If you need to make changes to your subgraph by adding a new entity or because you deployed a new smart contract while the logic and the entities remain unchanged, you can deploy a new version by running the same command:

`graph deploy --studio <SUBGRAPH SLUG>`

and provide a **new version**, eg. last version `1.0.1` then the new version can be `1.0.2`.

If the contract ABI as well as the starting block number have not changed, the older transactions will still reflect in the new version of the subgraph.

## Create a subgraph to index an upgradeable smart contract

If you are working on upgradeable smart contracts, you will have to make sure that you create your subgraph using:

- the proxy contract's address and
- the implementation contract's ABI.

In that sense, it is recommended that you create two subgraphs, one using the proxy address and another one using the implementation contract address, and proceed with the following steps:

1. take the **implementation** subgraph as the main one where you are going to modify and later deploy it (the other subgraph will not be deployed).

2. in the build/subgraph.yaml and the outter subgraph.yaml files, replace `name`, `address`, `abi` and `startBlock` by the proxy subgraph's name, address and abi, and startBlock.

3. in the generated/contractName/contractName.ts and generated/schema.ts files, add all the functions from the proxy project that the implentation does not have.

4. deloy the implementation subgraph.
