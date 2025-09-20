// app/providers.jsx
"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store"; // "@/store" ab resolve hoga jsconfig.json ke through
import GlobalProvider from "@/components/Application/GlobalProvider";

// Combine multiple providers into one wrapper
export default function Providers({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalProvider>{children}</GlobalProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}


/*
  commented code shows a simpler Providers version without Redux.
  Updated version integrates Redux store and persisted state using redux-persist.
*/

// "use client";

// import { SessionProvider } from "next-auth/react";
// import GlobalProvider from "@/components/Application/GlobalProvider";

// export default function Providers({ children }) {
//   return (
//     <SessionProvider>
//       <GlobalProvider>{children}</GlobalProvider>
//     </SessionProvider>
//   );
// }
