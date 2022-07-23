import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {Layout} from './layout'

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('react-query/devtools/development').then(d => ({
    default: d.ReactQueryDevtools,
  })),
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export function App() {
  const [showDevtools, setShowDevtools] = React.useState(true)

  React.useEffect(() => {
    window['toggleDevtools'] = () => setShowDevtools(old => !old)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout />
        <ReactQueryDevtools initialIsOpen />
        {showDevtools && (
          <React.Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </React.Suspense>
        )}
      </Router>
    </QueryClientProvider>
  )
}
