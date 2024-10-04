// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import { findAndParseConfig } from '@graphql-mesh/cli';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { ByzantineHoleskyTypes } from './sources/Byzantine Holesky/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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
  | 'bidStatus';

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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  BidPlaced: ResolverTypeWrapper<BidPlaced>;
  BidPlaced_filter: BidPlaced_filter;
  BidPlaced_orderBy: BidPlaced_orderBy;
  BidStatus: BidStatus;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  ClusterCreated: ResolverTypeWrapper<ClusterCreated>;
  ClusterCreated_filter: ClusterCreated_filter;
  ClusterCreated_orderBy: ClusterCreated_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  NodeOperator: ResolverTypeWrapper<NodeOperator>;
  NodeOperator_filter: NodeOperator_filter;
  NodeOperator_orderBy: NodeOperator_orderBy;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BidPlaced: BidPlaced;
  BidPlaced_filter: BidPlaced_filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  ClusterCreated: ClusterCreated;
  ClusterCreated_filter: ClusterCreated_filter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  NodeOperator: NodeOperator;
  NodeOperator_filter: NodeOperator_filter;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  Timestamp: Scalars['Timestamp']['output'];
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BidPlacedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BidPlaced'] = ResolversParentTypes['BidPlaced']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  nodeOp?: Resolver<ResolversTypes['NodeOperator'], ParentType, ContextType>;
  discountRate?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidPrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  auctionScore?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bidStatus?: Resolver<ResolversTypes['BidStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type ClusterCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ClusterCreated'] = ResolversParentTypes['ClusterCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  averageAuctionScore?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  splitAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  winners?: Resolver<Array<ResolversTypes['BidPlaced']>, ParentType, ContextType, RequireFields<ClusterCreatedwinnersArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type NodeOperatorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NodeOperator'] = ResolversParentTypes['NodeOperator']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  nodeOpAddr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasPendingBids?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  bids?: Resolver<Maybe<Array<ResolversTypes['BidPlaced']>>, ParentType, ContextType, RequireFields<NodeOperatorbidsArgs, 'skip' | 'first'>>;
  clusters?: Resolver<Maybe<Array<ResolversTypes['ClusterCreated']>>, ParentType, ContextType, RequireFields<NodeOperatorclustersArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  nodeOperator?: Resolver<Maybe<ResolversTypes['NodeOperator']>, ParentType, ContextType, RequireFields<QuerynodeOperatorArgs, 'id' | 'subgraphError'>>;
  nodeOperators?: Resolver<Array<ResolversTypes['NodeOperator']>, ParentType, ContextType, RequireFields<QuerynodeOperatorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bidPlaced?: Resolver<Maybe<ResolversTypes['BidPlaced']>, ParentType, ContextType, RequireFields<QuerybidPlacedArgs, 'id' | 'subgraphError'>>;
  bidPlaceds?: Resolver<Array<ResolversTypes['BidPlaced']>, ParentType, ContextType, RequireFields<QuerybidPlacedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  clusterCreated?: Resolver<Maybe<ResolversTypes['ClusterCreated']>, ParentType, ContextType, RequireFields<QueryclusterCreatedArgs, 'id' | 'subgraphError'>>;
  clusterCreateds?: Resolver<Array<ResolversTypes['ClusterCreated']>, ParentType, ContextType, RequireFields<QueryclusterCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  nodeOperator?: SubscriptionResolver<Maybe<ResolversTypes['NodeOperator']>, "nodeOperator", ParentType, ContextType, RequireFields<SubscriptionnodeOperatorArgs, 'id' | 'subgraphError'>>;
  nodeOperators?: SubscriptionResolver<Array<ResolversTypes['NodeOperator']>, "nodeOperators", ParentType, ContextType, RequireFields<SubscriptionnodeOperatorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bidPlaced?: SubscriptionResolver<Maybe<ResolversTypes['BidPlaced']>, "bidPlaced", ParentType, ContextType, RequireFields<SubscriptionbidPlacedArgs, 'id' | 'subgraphError'>>;
  bidPlaceds?: SubscriptionResolver<Array<ResolversTypes['BidPlaced']>, "bidPlaceds", ParentType, ContextType, RequireFields<SubscriptionbidPlacedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  clusterCreated?: SubscriptionResolver<Maybe<ResolversTypes['ClusterCreated']>, "clusterCreated", ParentType, ContextType, RequireFields<SubscriptionclusterCreatedArgs, 'id' | 'subgraphError'>>;
  clusterCreateds?: SubscriptionResolver<Array<ResolversTypes['ClusterCreated']>, "clusterCreateds", ParentType, ContextType, RequireFields<SubscriptionclusterCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BidPlaced?: BidPlacedResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  ClusterCreated?: ClusterCreatedResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  NodeOperator?: NodeOperatorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = ByzantineHoleskyTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export function getMeshOptions() {
  console.warn('WARNING: These artifacts are built for development mode. Please run "graphclient build" to build production artifacts');
  return findAndParseConfig({
    dir: baseDir,
    artifactsDir: ".graphclient",
    configName: "graphclient",
    additionalPackagePrefixes: ["@graphprotocol/client-"],
    initialLoggerPrefix: "GraphClient",
  });
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}

let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type GetCreatedDVsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCreatedDVsQuery = { clusterCreateds: Array<(
    Pick<ClusterCreated, 'id' | 'timestamp' | 'txHash' | 'splitAddress' | 'averageAuctionScore'>
    & { winners: Array<(
      Pick<BidPlaced, 'id' | 'duration' | 'discountRate' | 'bidPrice' | 'auctionScore' | 'bidStatus'>
      & { nodeOp: Pick<NodeOperator, 'nodeOpAddr'> }
    )> }
  )> };


export const GetCreatedDVsDocument = gql`
    query GetCreatedDVs @live(interval: 30000) {
  clusterCreateds(orderBy: timestamp, orderDirection: desc) {
    id
    timestamp
    txHash
    splitAddress
    averageAuctionScore
    winners {
      id
      nodeOp {
        nodeOpAddr
      }
      duration
      discountRate
      bidPrice
      auctionScore
      bidStatus
    }
  }
}
    ` as unknown as DocumentNode<GetCreatedDVsQuery, GetCreatedDVsQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetCreatedDVs(variables?: GetCreatedDVsQueryVariables, options?: C): AsyncIterable<GetCreatedDVsQuery> {
      return requester<GetCreatedDVsQuery, GetCreatedDVsQueryVariables>(GetCreatedDVsDocument, variables, options) as AsyncIterable<GetCreatedDVsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;