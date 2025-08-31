'use client'
import { persistor, store } from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from './loading'
import { QueryClientProvider } from '@tanstack/react-query'

const GlobalProvider = ({ children }) => {
  return (
    <QueryClientProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
            {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
    
  )
}

export default GlobalProvider
