import * as React from 'react'
import {CogIcon, XIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import {useQueryClient} from 'react-query'

const ReactQueryDevToolsPanel = React.lazy(() =>
  import('react-query/devtools/development').then(d => ({
    default: d.ReactQueryDevtoolsPanel,
  })),
)

enum Tab {
  Options = 'options',
  Queries = 'queries',
}

export const DevTools = () => {
  const queryClient = useQueryClient()

  const [tab, setTab] = React.useState<Tab>(Tab.Options)
  const [showDevtools, setShowDevtools] = React.useState(false)

  const [refetchOnWindowFocus, setRefetchOnWindowFocus] = React.useState(false)

  React.useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        refetchOnWindowFocus,
      },
    })
  }, [refetchOnWindowFocus])

  return (
    <>
      {!showDevtools ? (
        <button
          onClick={() => setShowDevtools(true)}
          className="btn btn-circle fixed bottom-2 left-2"
        >
          <CogIcon className="w-8 h-8" />
        </button>
      ) : (
        <div className="fixed inset-0 top-auto min-h-[200px] bg-base-200 p-2">
          <div className="devtools">
            <div className="flex items-center justify-between border-b-2 border-base-300 pb-2 mb-2">
              <div className="tabs tabs-boxed">
                {Object.entries(Tab).map(([key, value]) => (
                  <button
                    key={key}
                    className={clsx('tab', value === tab && 'tab-active')}
                    onClick={() => setTab(value)}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <button
                className="btn btn-sm"
                onClick={() => setShowDevtools(false)}
              >
                <XIcon className="h-6 w-6" />
                Close
              </button>
            </div>
            {tab === Tab.Options && (
              <div className="devtools-options">
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={refetchOnWindowFocus}
                      onChange={e => setRefetchOnWindowFocus(e.target.checked)}
                    />
                    <span className="label-text">refetchOnWindowFocus</span>
                  </label>
                </div>
              </div>
            )}
            {tab === Tab.Queries && (
              <React.Suspense fallback={null}>
                {/* @ts-ignore */}
                <ReactQueryDevToolsPanel />
              </React.Suspense>
            )}
          </div>
        </div>
      )}
    </>
  )
}
