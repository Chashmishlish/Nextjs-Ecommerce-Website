import { store } from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import loading from './loading'
loading
const GlobalProvider = ({ children }) => {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<loading />}>
            {children}
        </PersistGate>
    </Provider>
  )
}

export default GlobalProvider
