import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientAtomProvider } from 'jotai-tanstack-query/react'
import { Provider as JotaiProvider, useAtom } from 'jotai';

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import './i18n'
import { handleGlobalError } from './errorHandler'
import { cartAtom } from './state/atoms'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
        }
    },
    queryCache: new QueryCache({
        onError: handleGlobalError
    }),
    mutationCache: new MutationCache({
        onError: handleGlobalError
    })
});

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <QueryClientAtomProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientAtomProvider>
        </StrictMode>,
    )
}