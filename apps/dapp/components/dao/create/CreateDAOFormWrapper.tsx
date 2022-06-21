import { NextSeo } from 'next-seo'
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { useRecoilValue } from 'recoil'

import { useTranslation } from '@dao-dao/i18n'
import { mountedInBrowserAtom } from '@dao-dao/state'
import { SubmitButton } from '@dao-dao/ui'

import { CreateDAONav } from './CreateDAONav'
import {
  CreateDAOSubmitLabel,
  DAOFormPage,
  useCreateDAOFormPages,
} from '@/hooks'

type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

interface CreateDAOFormWrapperProps
  extends RequireKeys<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  children: ReactNode
  containerClassName?: string
  currentPageIndex: number
  currentPage: DAOFormPage
  creating: boolean
}

export const CreateDAOFormWrapper: FC<CreateDAOFormWrapperProps> = ({
  children,
  containerClassName,
  currentPageIndex,
  currentPage,
  creating,
  ...props
}) => {
  const { t } = useTranslation()
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const createDAOFormPages = useCreateDAOFormPages()

  const showBack = currentPageIndex > 0

  return (
    <div>
      <NextSeo
        openGraph={{
          title: t('Create a DAO'),
          // TODO: different description?
          description: t('Create a DAO'),
        }}
        title={t('Create a DAO')}
      />

      <form
        // SmallScreenNav is 4rem tall, so account for it on <lg screens.
        className="flex flex-row items-stretch h-[calc(100vh-4rem)] lg:h-screen"
        {...props}
      >
        {/* Ghost submit button for enter key press. */}
        <SubmitButton
          className="!p-0"
          disabled={!mountedInBrowser || creating}
          label=""
        />

        <div className="overflow-y-auto flex-1 p-6 w-full max-w-screen-lg h-full">
          <div className="mb-8">
            <h2 className="mb-4 header-text">{t('Create a DAO')}</h2>

            <div className="mb-10 md:hidden">
              <CreateDAONav currentPageIndex={currentPageIndex} />
            </div>

            <p className="primary-text">{currentPage.title}</p>
            {currentPage.subtitle && (
              <p className="mt-1 secondary-text">{currentPage.subtitle}</p>
            )}
          </div>

          <div className={containerClassName}>
            {children}

            <div
              className="flex flex-row items-center mt-8"
              // justify-end doesn't work in tailwind for some reason
              style={{
                justifyContent: showBack ? 'space-between' : 'flex-end',
              }}
            >
              {showBack && (
                <SubmitButton
                  disabled={creating}
                  label={t(CreateDAOSubmitLabel.Back)}
                  variant="secondary"
                />
              )}
              <SubmitButton
                disabled={!mountedInBrowser || creating}
                label={
                  currentPageIndex < createDAOFormPages.length - 2
                    ? t(CreateDAOSubmitLabel.Continue)
                    : // Second to last links to the Review page.
                    currentPageIndex === createDAOFormPages.length - 2
                    ? t(CreateDAOSubmitLabel.Review)
                    : // Last page creates the DAO.
                      t(CreateDAOSubmitLabel.CreateDAO)
                }
              />
            </div>
          </div>
        </div>

        <div className="hidden shrink-0 p-6 pr-20 border-l border-inactive md:block">
          <CreateDAONav currentPageIndex={currentPageIndex} />
        </div>
      </form>
    </div>
  )
}
