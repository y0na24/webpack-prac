import { createRoot } from 'react-dom/client'
import { App } from './components/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AboutPage } from '@/pages/About'
import { ShopPage } from './pages/Shop'
import { Suspense } from 'react'

const root = document.getElementById('root')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback="Loading...">
            <AboutPage />
          </Suspense>
        )
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback="Loading...">
            <ShopPage />
          </Suspense>
        )
      }
    ]
  }
])

createRoot(root).render(<RouterProvider router={router} />)
