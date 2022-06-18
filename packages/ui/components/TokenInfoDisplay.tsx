import { FunctionComponent } from 'react'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { InputLabel, Loader } from '@dao-dao/ui'

export interface TokenInfoDisplayProps {
  loadingTokenInfo?: boolean
  tokenInfo?: TokenInfoResponse
}

export const TokenInfoDisplay: FunctionComponent<TokenInfoDisplayProps> = ({
  loadingTokenInfo,
  tokenInfo,
}) => (
  <>
    {loadingTokenInfo ? (
      <Loader />
    ) : tokenInfo ? (
      <div className="space-y-2">
        <InputLabel name="Token info" />
        <pre className="overflow-auto p-2 text-secondary rounded-lg border border-secondary">
          {JSON.stringify(tokenInfo, null, 2)}
        </pre>
      </div>
    ) : null}
  </>
)