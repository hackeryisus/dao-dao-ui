import { useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { constSelector, useRecoilValue } from 'recoil'

import { findAttribute } from '@cosmjs/stargate/build/logs'
import { blockHeightSelector, useWallet } from '@dao-dao/state'
import { usePropose } from '@dao-dao/state/hooks/cw-proposal-single'
import { useIncreaseAllowance } from '@dao-dao/state/hooks/cw20-base'
import { allowanceSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import toast from 'react-hot-toast'

import {
  makeGetServerSideProps,
  PageWrapper,
  PageWrapperProps,
} from '@/components'
import { useGovernanceModule } from '@/hooks'
import { cleanChainError } from '@/util/cleanChainError'
import { expirationExpired } from '@/util/expiration'

const InnerProposalCreate = () => {
  const router = useRouter()
  const { address: walletAddress, connected } = useWallet()
  const [loading, setLoading] = useState(false)

  const { governanceModuleAddress, governanceModuleConfig } =
    useGovernanceModule()
  const proposalDeposit = Number(
    governanceModuleConfig?.deposit_info?.deposit ?? '-1'
  )

  const currentAllowance = useRecoilValue(
    governanceModuleConfig?.deposit_info &&
      governanceModuleAddress &&
      walletAddress
      ? allowanceSelector({
          contractAddress: governanceModuleConfig.deposit_info.token,
          params: [{ owner: walletAddress, spender: governanceModuleAddress }],
        })
      : constSelector(undefined)
  )
  const blockHeight = useRecoilValue(blockHeightSelector)

  const increaseAllowance = useIncreaseAllowance({
    contractAddress: governanceModuleConfig?.deposit_info?.token ?? '',
    sender: walletAddress ?? '',
  })
  const createProposal = usePropose({
    contractAddress: governanceModuleAddress ?? '',
    sender: walletAddress ?? '',
  })

  const onProposalSubmit = async (d: any) => {
    if (
      !connected ||
      !blockHeight ||
      proposalDeposit === -1 ||
      !currentAllowance
    )
      return

    setLoading(true)

    // Request to increase the contract's allowance for the proposal deposit if needed.
    if (
      proposalDeposit > 0 &&
      // Ensure current allowance is insufficient or expired.
      (expirationExpired(currentAllowance.expires, blockHeight) ||
        Number(currentAllowance.allowance) < proposalDeposit)
    ) {
      try {
        await increaseAllowance({
          amount: (
            proposalDeposit - Number(currentAllowance.allowance)
          ).toString(),
          spender: governanceModuleAddress,
        })
      } catch (err) {
        console.error(err)
        toast.error(
          `Failed to increase allowance to pay proposal deposit: (${cleanChainError(
            err.message
          )})`
        )
        return
      }
    }

    try {
      const response = await createProposal({
        title: d.title,
        description: d.description,
        msgs: d.messages,
      })

      const proposalId = findAttribute(
        response.logs,
        'wasm',
        'proposal_id'
      ).value
      router.push(`/proposals/${proposalId}`)
    } catch (err) {
      toast.error(cleanChainError(err.message))
    }

    setLoading(false)
  }

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        {/* <ProposalForm
          contractAddress={contractAddress}
          loading={proposalLoading}
          onSubmit={onProposalSubmit}
          toCosmosMsgProps={{
            sigAddress: contractAddress,
            govAddress: daoInfo.gov_token,
            govDecimals: tokenInfo.decimals,
          }}
        /> */}
      </div>
      <div className="col-span-2 p-6">
        <h2 className="mb-6 font-medium text-medium">Info</h2>
        <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center">
          <p className="font-mono text-sm text-tertiary">DAO Treasury</p>
          <div className="col-span-2">
            {/* <CopyToClipboard value={contractAddress} /> */}
          </div>
          <p className="font-mono text-sm text-tertiary">Gov Token</p>
          <div className="col-span-2">
            {/* <CopyToClipboard value={daoInfo.gov_token} /> */}
          </div>
          <p className="font-mono text-sm text-tertiary">Staking</p>
          <div className="col-span-2">
            {/* <CopyToClipboard value={daoInfo.staking_contract} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

const ProposalCreatePage: NextPage<PageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    <InnerProposalCreate />
  </PageWrapper>
)

export default ProposalCreatePage

export const getServerSideProps = makeGetServerSideProps({
  followingTitle: `Create Proposal`,
})
