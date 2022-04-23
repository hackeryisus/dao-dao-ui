/**
 * This file was automatically generated by cosmwasm-typescript-gen.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the cosmwasm-typescript-gen generate command to regenerate this file.
 */

/**
 * This file was modified by hand to fix a name duplication issue:
 *   ExecuteMsg::Vote and QueryMsg::Vote both exist, so the
 *   ReadOnlyInterface and Interface had overlapping `vote` methods.
 *   This was fixed by changing `ReadOnlyInterface`'s `vote` to `getVote`,
 *   and `Interface`'s `vote` to `castVote`.
 */

import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
export type Addr = string
export type Uint128 = string
export type Duration =
  | {
      height: number
    }
  | {
      time: number
    }
export type Threshold =
  | {
      absolute_percentage: {
        percentage: PercentageThreshold
        [k: string]: unknown
      }
    }
  | {
      threshold_quorum: {
        quorum: PercentageThreshold
        threshold: PercentageThreshold
        [k: string]: unknown
      }
    }
export type PercentageThreshold =
  | {
      majority: {
        [k: string]: unknown
      }
    }
  | {
      percent: Decimal
    }
export type Decimal = string
export interface ConfigResponse {
  dao: Addr
  deposit_info?: CheckedDepositInfo | null
  max_voting_period: Duration
  only_members_execute: boolean
  threshold: Threshold
  [k: string]: unknown
}
export interface CheckedDepositInfo {
  deposit: Uint128
  refund_failed_proposals: boolean
  token: Addr
  [k: string]: unknown
}
export type GovernanceModulesResponse = Addr[]
export interface InfoResponse {
  info: ContractVersion
  [k: string]: unknown
}
export interface ContractVersion {
  contract: string
  version: string
  [k: string]: unknown
}
export type DepositToken =
  | {
      token: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      voting_module_token: {
        [k: string]: unknown
      }
    }
export interface InstantiateMsg {
  deposit_info?: DepositInfo | null
  max_voting_period: Duration
  only_members_execute: boolean
  threshold: Threshold
  [k: string]: unknown
}
export interface DepositInfo {
  deposit: Uint128
  refund_failed_proposals: boolean
  token: DepositToken
  [k: string]: unknown
}
export type Expiration =
  | {
      at_height: number
    }
  | {
      at_time: Timestamp
    }
  | {
      never: {
        [k: string]: unknown
      }
    }
export type Timestamp = Uint64
export type Uint64 = string
export type CosmosMsgFor_Empty =
  | {
      bank: BankMsg
    }
  | {
      custom: Empty
    }
  | {
      staking: StakingMsg
    }
  | {
      distribution: DistributionMsg
    }
  | {
      wasm: WasmMsg
    }
export type BankMsg =
  | {
      send: {
        amount: Coin[]
        to_address: string
        [k: string]: unknown
      }
    }
  | {
      burn: {
        amount: Coin[]
        [k: string]: unknown
      }
    }
export type StakingMsg =
  | {
      delegate: {
        amount: Coin
        validator: string
        [k: string]: unknown
      }
    }
  | {
      undelegate: {
        amount: Coin
        validator: string
        [k: string]: unknown
      }
    }
  | {
      redelegate: {
        amount: Coin
        dst_validator: string
        src_validator: string
        [k: string]: unknown
      }
    }
export type DistributionMsg =
  | {
      set_withdraw_address: {
        address: string
        [k: string]: unknown
      }
    }
  | {
      withdraw_delegator_reward: {
        validator: string
        [k: string]: unknown
      }
    }
export type WasmMsg =
  | {
      execute: {
        contract_addr: string
        funds: Coin[]
        msg: Binary
        [k: string]: unknown
      }
    }
  | {
      instantiate: {
        admin?: string | null
        code_id: number
        funds: Coin[]
        label: string
        msg: Binary
        [k: string]: unknown
      }
    }
  | {
      migrate: {
        contract_addr: string
        msg: Binary
        new_code_id: number
        [k: string]: unknown
      }
    }
  | {
      update_admin: {
        admin: string
        contract_addr: string
        [k: string]: unknown
      }
    }
  | {
      clear_admin: {
        contract_addr: string
        [k: string]: unknown
      }
    }
export type Binary = string
export enum Status {
  Open = 'open',
  Rejected = 'rejected',
  Passed = 'passed',
  Executed = 'executed',
  Closed = 'closed',
}
export interface ListProposalsResponse {
  proposals: ProposalResponse[]
  [k: string]: unknown
}
export interface ProposalResponse {
  id: number
  proposal: Proposal
  [k: string]: unknown
}
export interface Proposal {
  deposit_info?: CheckedDepositInfo | null
  description: string
  expiration: Expiration
  msgs: CosmosMsgFor_Empty[]
  proposer: Addr
  start_height: number
  status: Status
  threshold: Threshold
  title: string
  total_power: Uint128
  votes: Votes
  [k: string]: unknown
}
export interface Coin {
  amount: Uint128
  denom: string
  [k: string]: unknown
}
export interface Empty {
  [k: string]: unknown
}
export interface Votes {
  abstain: Uint128
  no: Uint128
  yes: Uint128
  [k: string]: unknown
}
export enum Vote {
  Yes = 'yes',
  No = 'no',
  Abstain = 'abstain',
}
export interface ListVotesResponse {
  votes: VoteInfo[]
  [k: string]: unknown
}
export interface VoteInfo {
  power: Uint128
  vote: Vote
  voter: Addr
  [k: string]: unknown
}
export type ProposalCountResponse = number
export interface ProposalHooksResponse {
  hooks: string[]
  [k: string]: unknown
}
export interface ReverseProposalsResponse {
  proposals: ProposalResponse[]
  [k: string]: unknown
}
export interface VoteHooksResponse {
  hooks: string[]
  [k: string]: unknown
}
export interface VoteResponse {
  vote?: VoteInfo | null
  [k: string]: unknown
}
export interface ReadOnlyInterface {
  contractAddress: string
  config: () => Promise<ConfigResponse>
  proposal: ({
    proposalId,
  }: {
    proposalId: number
  }) => Promise<ProposalResponse>
  listProposals: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: number
  }) => Promise<ListProposalsResponse>
  reverseProposals: ({
    limit,
    startBefore,
  }: {
    limit?: number
    startBefore?: number
  }) => Promise<ReverseProposalsResponse>
  proposalCount: () => Promise<ProposalCountResponse>
  // Modified since `vote` is duplicate enum.
  getVote: ({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter: string
  }) => Promise<VoteResponse>
  listVotes: ({
    limit,
    proposalId,
    startAfter,
  }: {
    limit?: number
    proposalId: number
    startAfter?: string
  }) => Promise<ListVotesResponse>
  proposalHooks: () => Promise<ProposalHooksResponse>
  voteHooks: () => Promise<VoteHooksResponse>
  info: () => Promise<InfoResponse>
}
export class QueryClient implements ReadOnlyInterface {
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.config = this.config.bind(this)
    this.proposal = this.proposal.bind(this)
    this.listProposals = this.listProposals.bind(this)
    this.reverseProposals = this.reverseProposals.bind(this)
    this.proposalCount = this.proposalCount.bind(this)
    // Modified since `vote` is duplicate enum.
    this.getVote = this.getVote.bind(this)
    this.listVotes = this.listVotes.bind(this)
    this.proposalHooks = this.proposalHooks.bind(this)
    this.voteHooks = this.voteHooks.bind(this)
    this.info = this.info.bind(this)
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    })
  }
  proposal = async ({
    proposalId,
  }: {
    proposalId: number
  }): Promise<ProposalResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal: {
        proposal_id: proposalId,
      },
    })
  }
  listProposals = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: number
  }): Promise<ListProposalsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_proposals: {
        limit,
        start_after: startAfter,
      },
    })
  }
  reverseProposals = async ({
    limit,
    startBefore,
  }: {
    limit?: number
    startBefore?: number
  }): Promise<ReverseProposalsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      reverse_proposals: {
        limit,
        start_before: startBefore,
      },
    })
  }
  proposalCount = async (): Promise<ProposalCountResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_count: {},
    })
  }
  // Modified since `vote` is duplicate enum.
  getVote = async ({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter: string
  }): Promise<VoteResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      vote: {
        proposal_id: proposalId,
        voter,
      },
    })
  }
  listVotes = async ({
    limit,
    proposalId,
    startAfter,
  }: {
    limit?: number
    proposalId: number
    startAfter?: string
  }): Promise<ListVotesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_votes: {
        limit,
        proposal_id: proposalId,
        start_after: startAfter,
      },
    })
  }
  proposalHooks = async (): Promise<ProposalHooksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      proposal_hooks: {},
    })
  }
  voteHooks = async (): Promise<VoteHooksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      vote_hooks: {},
    })
  }
  info = async (): Promise<InfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      info: {},
    })
  }
}
export interface Interface extends ReadOnlyInterface {
  contractAddress: string
  sender: string
  propose: ({
    description,
    latest,
    msgs,
    title,
  }: {
    description: string
    latest?: Expiration
    msgs: CosmosMsgFor_Empty[]
    title: string
  }) => Promise<ExecuteResult>
  // Modified since `vote` is duplicate enum.
  castVote: ({
    proposalId,
    vote,
  }: {
    proposalId: number
    vote: Vote
  }) => Promise<ExecuteResult>
  execute: ({ proposalId }: { proposalId: number }) => Promise<ExecuteResult>
  close: ({ proposalId }: { proposalId: number }) => Promise<ExecuteResult>
  updateConfig: ({
    dao,
    depositInfo,
    maxVotingPeriod,
    onlyMembersExecute,
    threshold,
  }: {
    dao: string
    depositInfo?: DepositInfo
    maxVotingPeriod: Duration
    onlyMembersExecute: boolean
    threshold: Threshold
  }) => Promise<ExecuteResult>
  addProposalHook: ({ address }: { address: string }) => Promise<ExecuteResult>
  removeProposalHook: ({
    address,
  }: {
    address: string
  }) => Promise<ExecuteResult>
  addVoteHook: ({ address }: { address: string }) => Promise<ExecuteResult>
  removeVoteHook: ({ address }: { address: string }) => Promise<ExecuteResult>
}
export class Client extends QueryClient implements Interface {
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.propose = this.propose.bind(this)
    // Modified since `vote` is duplicate enum.
    this.castVote = this.castVote.bind(this)
    this.execute = this.execute.bind(this)
    this.close = this.close.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.addProposalHook = this.addProposalHook.bind(this)
    this.removeProposalHook = this.removeProposalHook.bind(this)
    this.addVoteHook = this.addVoteHook.bind(this)
    this.removeVoteHook = this.removeVoteHook.bind(this)
  }

  propose = async ({
    description,
    latest,
    msgs,
    title,
  }: {
    description: string
    latest?: Expiration
    msgs: CosmosMsgFor_Empty[]
    title: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        propose: {
          description,
          latest,
          msgs,
          title,
        },
      },
      'auto'
    )
  }
  // Modified since `vote` is duplicate enum.
  castVote = async ({
    proposalId,
    vote,
  }: {
    proposalId: number
    vote: Vote
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        vote: {
          proposal_id: proposalId,
          vote,
        },
      },
      'auto'
    )
  }
  execute = async ({
    proposalId,
  }: {
    proposalId: number
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        execute: {
          proposal_id: proposalId,
        },
      },
      'auto'
    )
  }
  close = async ({
    proposalId,
  }: {
    proposalId: number
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        close: {
          proposal_id: proposalId,
        },
      },
      'auto'
    )
  }
  updateConfig = async ({
    dao,
    depositInfo,
    maxVotingPeriod,
    onlyMembersExecute,
    threshold,
  }: {
    dao: string
    depositInfo?: DepositInfo
    maxVotingPeriod: Duration
    onlyMembersExecute: boolean
    threshold: Threshold
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          dao,
          deposit_info: depositInfo,
          max_voting_period: maxVotingPeriod,
          only_members_execute: onlyMembersExecute,
          threshold,
        },
      },
      'auto'
    )
  }
  addProposalHook = async ({
    address,
  }: {
    address: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_proposal_hook: {
          address,
        },
      },
      'auto'
    )
  }
  removeProposalHook = async ({
    address,
  }: {
    address: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_proposal_hook: {
          address,
        },
      },
      'auto'
    )
  }
  addVoteHook = async ({
    address,
  }: {
    address: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_vote_hook: {
          address,
        },
      },
      'auto'
    )
  }
  removeVoteHook = async ({
    address,
  }: {
    address: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_vote_hook: {
          address,
        },
      },
      'auto'
    )
  }
}
