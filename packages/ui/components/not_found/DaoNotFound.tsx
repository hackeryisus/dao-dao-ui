import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { Trans } from '@dao-dao/common'

import { ErrorPage } from '../ErrorPage'
import { useAppLayoutContext } from '../layout/AppLayoutContext'
import { LinkText } from '../LinkText'
import { Loader as DefaultLoader, LoaderProps } from '../Loader'

export interface DaoNotFoundProps {
  Loader?: ComponentType<LoaderProps>
}

export const DaoNotFound = ({ Loader = DefaultLoader }: DaoNotFoundProps) => {
  const { t } = useTranslation()
  const { PageHeader } = useAppLayoutContext()

  return (
    <>
      <PageHeader title={t('title.daoNotFound')} />

      <ErrorPage>
        <p>
          <Trans Loader={Loader} i18nKey="error.couldntFindDAO">
            We couldn&apos;t find a DAO with that address. Search DAOs on the{' '}
            <LinkText
              aProps={{ className: 'underline link-text' }}
              href="/home"
            >
              home page
            </LinkText>
            .
          </Trans>
        </p>
      </ErrorPage>
    </>
  )
}
