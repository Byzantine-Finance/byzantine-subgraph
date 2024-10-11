// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ByzantineHoleskyTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type AuctionType =
  | 'Null'
  | 'ClusterSize4'
  | 'ClusterSize7';

export type BidPlaced = {
  id: Scalars['Bytes']['output'];
  nodeOp: NodeOperator;
  discountRate: Scalars['BigDecimal']['output'];
  duration: Scalars['BigInt']['output'];
  bidPrice: Scalars['BigDecimal']['output'];
  auctionScore: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  txHash?: Maybe<Scalars['String']['output']>;
  bidStatus: BidStatus;
  auctionType: AuctionType;
};

export type BidPlaced_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  nodeOp?: InputMaybe<Scalars['String']['input']>;
  nodeOp_not?: InputMaybe<Scalars['String']['input']>;
  nodeOp_gt?: InputMaybe<Scalars['String']['input']>;
  nodeOp_lt?: InputMaybe<Scalars['String']['input']>;
  nodeOp_gte?: InputMaybe<Scalars['String']['input']>;
  nodeOp_lte?: InputMaybe<Scalars['String']['input']>;
  nodeOp_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nodeOp_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nodeOp_contains?: InputMaybe<Scalars['String']['input']>;
  nodeOp_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOp_not_contains?: InputMaybe<Scalars['String']['input']>;
  nodeOp_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOp_starts_with?: InputMaybe<Scalars['String']['input']>;
  nodeOp_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOp_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nodeOp_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOp_ends_with?: InputMaybe<Scalars['String']['input']>;
  nodeOp_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOp_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nodeOp_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOp_?: InputMaybe<NodeOperator_filter>;
  discountRate?: InputMaybe<Scalars['BigDecimal']['input']>;
  discountRate_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  discountRate_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  discountRate_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  discountRate_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  discountRate_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  discountRate_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  discountRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  duration?: InputMaybe<Scalars['BigInt']['input']>;
  duration_not?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  duration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  bidPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  bidPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  bidPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  bidPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  bidPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  bidPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  bidPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  auctionScore?: InputMaybe<Scalars['BigInt']['input']>;
  auctionScore_not?: InputMaybe<Scalars['BigInt']['input']>;
  auctionScore_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionScore_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionScore_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionScore_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionScore_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionScore_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  txHash_not?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bidStatus?: InputMaybe<BidStatus>;
  bidStatus_not?: InputMaybe<BidStatus>;
  bidStatus_in?: InputMaybe<Array<BidStatus>>;
  bidStatus_not_in?: InputMaybe<Array<BidStatus>>;
  auctionType?: InputMaybe<AuctionType>;
  auctionType_not?: InputMaybe<AuctionType>;
  auctionType_in?: InputMaybe<Array<AuctionType>>;
  auctionType_not_in?: InputMaybe<Array<AuctionType>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BidPlaced_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BidPlaced_filter>>>;
};

export type BidPlaced_orderBy =
  | 'id'
  | 'nodeOp'
  | 'nodeOp__id'
  | 'nodeOp__nodeOpAddr'
  | 'nodeOp__hasPendingBids'
  | 'discountRate'
  | 'duration'
  | 'bidPrice'
  | 'auctionScore'
  | 'timestamp'
  | 'txHash'
  | 'bidStatus'
  | 'auctionType';

export type BidStatus =
  | 'Closed'
  | 'Pending'
  | 'Active';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type ClusterCreated = {
  id: Scalars['Bytes']['output'];
  averageAuctionScore: Scalars['BigInt']['output'];
  splitAddress: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  txHash: Scalars['String']['output'];
  winners: Array<BidPlaced>;
};


export type ClusterCreatedwinnersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BidPlaced_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BidPlaced_filter>;
};

export type ClusterCreated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  averageAuctionScore?: InputMaybe<Scalars['BigInt']['input']>;
  averageAuctionScore_not?: InputMaybe<Scalars['BigInt']['input']>;
  averageAuctionScore_gt?: InputMaybe<Scalars['BigInt']['input']>;
  averageAuctionScore_lt?: InputMaybe<Scalars['BigInt']['input']>;
  averageAuctionScore_gte?: InputMaybe<Scalars['BigInt']['input']>;
  averageAuctionScore_lte?: InputMaybe<Scalars['BigInt']['input']>;
  averageAuctionScore_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  averageAuctionScore_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  splitAddress?: InputMaybe<Scalars['String']['input']>;
  splitAddress_not?: InputMaybe<Scalars['String']['input']>;
  splitAddress_gt?: InputMaybe<Scalars['String']['input']>;
  splitAddress_lt?: InputMaybe<Scalars['String']['input']>;
  splitAddress_gte?: InputMaybe<Scalars['String']['input']>;
  splitAddress_lte?: InputMaybe<Scalars['String']['input']>;
  splitAddress_in?: InputMaybe<Array<Scalars['String']['input']>>;
  splitAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  splitAddress_contains?: InputMaybe<Scalars['String']['input']>;
  splitAddress_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  splitAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  splitAddress_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  splitAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  splitAddress_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  splitAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  splitAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  splitAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  splitAddress_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  splitAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  splitAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  txHash_not?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  winners?: InputMaybe<Array<Scalars['String']['input']>>;
  winners_not?: InputMaybe<Array<Scalars['String']['input']>>;
  winners_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  winners_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  winners_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  winners_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  winners_?: InputMaybe<BidPlaced_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ClusterCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ClusterCreated_filter>>>;
};

export type ClusterCreated_orderBy =
  | 'id'
  | 'averageAuctionScore'
  | 'splitAddress'
  | 'timestamp'
  | 'txHash'
  | 'winners';

export type NodeOperator = {
  id: Scalars['Bytes']['output'];
  nodeOpAddr: Scalars['String']['output'];
  hasPendingBids: Scalars['Boolean']['output'];
  bids?: Maybe<Array<BidPlaced>>;
  clusters?: Maybe<Array<ClusterCreated>>;
};


export type NodeOperatorbidsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BidPlaced_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BidPlaced_filter>;
};


export type NodeOperatorclustersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ClusterCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClusterCreated_filter>;
};

export type NodeOperator_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  nodeOpAddr?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_not?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_gt?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_lt?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_gte?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_lte?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nodeOpAddr_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  nodeOpAddr_contains?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_not_contains?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_starts_with?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_ends_with?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  nodeOpAddr_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  hasPendingBids?: InputMaybe<Scalars['Boolean']['input']>;
  hasPendingBids_not?: InputMaybe<Scalars['Boolean']['input']>;
  hasPendingBids_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  hasPendingBids_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  bids_?: InputMaybe<BidPlaced_filter>;
  clusters?: InputMaybe<Array<Scalars['String']['input']>>;
  clusters_not?: InputMaybe<Array<Scalars['String']['input']>>;
  clusters_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  clusters_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  clusters_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  clusters_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  clusters_?: InputMaybe<ClusterCreated_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NodeOperator_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NodeOperator_filter>>>;
};

export type NodeOperator_orderBy =
  | 'id'
  | 'nodeOpAddr'
  | 'hasPendingBids'
  | 'bids'
  | 'clusters';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  nodeOperator?: Maybe<NodeOperator>;
  nodeOperators: Array<NodeOperator>;
  bidPlaced?: Maybe<BidPlaced>;
  bidPlaceds: Array<BidPlaced>;
  clusterCreated?: Maybe<ClusterCreated>;
  clusterCreateds: Array<ClusterCreated>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerynodeOperatorArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynodeOperatorsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NodeOperator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NodeOperator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidPlacedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidPlacedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BidPlaced_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BidPlaced_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclusterCreatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclusterCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ClusterCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClusterCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  nodeOperator?: Maybe<NodeOperator>;
  nodeOperators: Array<NodeOperator>;
  bidPlaced?: Maybe<BidPlaced>;
  bidPlaceds: Array<BidPlaced>;
  clusterCreated?: Maybe<ClusterCreated>;
  clusterCreateds: Array<ClusterCreated>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionnodeOperatorArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnodeOperatorsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NodeOperator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NodeOperator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidPlacedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidPlacedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BidPlaced_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BidPlaced_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclusterCreatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclusterCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ClusterCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClusterCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  nodeOperator: InContextSdkMethod<Query['nodeOperator'], QuerynodeOperatorArgs, MeshContext>,
  /** null **/
  nodeOperators: InContextSdkMethod<Query['nodeOperators'], QuerynodeOperatorsArgs, MeshContext>,
  /** null **/
  bidPlaced: InContextSdkMethod<Query['bidPlaced'], QuerybidPlacedArgs, MeshContext>,
  /** null **/
  bidPlaceds: InContextSdkMethod<Query['bidPlaceds'], QuerybidPlacedsArgs, MeshContext>,
  /** null **/
  clusterCreated: InContextSdkMethod<Query['clusterCreated'], QueryclusterCreatedArgs, MeshContext>,
  /** null **/
  clusterCreateds: InContextSdkMethod<Query['clusterCreateds'], QueryclusterCreatedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  nodeOperator: InContextSdkMethod<Subscription['nodeOperator'], SubscriptionnodeOperatorArgs, MeshContext>,
  /** null **/
  nodeOperators: InContextSdkMethod<Subscription['nodeOperators'], SubscriptionnodeOperatorsArgs, MeshContext>,
  /** null **/
  bidPlaced: InContextSdkMethod<Subscription['bidPlaced'], SubscriptionbidPlacedArgs, MeshContext>,
  /** null **/
  bidPlaceds: InContextSdkMethod<Subscription['bidPlaceds'], SubscriptionbidPlacedsArgs, MeshContext>,
  /** null **/
  clusterCreated: InContextSdkMethod<Subscription['clusterCreated'], SubscriptionclusterCreatedArgs, MeshContext>,
  /** null **/
  clusterCreateds: InContextSdkMethod<Subscription['clusterCreateds'], SubscriptionclusterCreatedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["Byzantine Holesky"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
