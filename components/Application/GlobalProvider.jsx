'use client'
import { persistor, store } from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from './loading'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const GlobalProvider = ({ children }) => {
  return (
    <QueryClientProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
            {children}
        </PersistGate>
      </Provider>
      <Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false}/> 
        // keeping it false so that by default it shows icon not the content inside it
      </Suspense>
    </QueryClientProvider>

  )
}

export default GlobalProvider
