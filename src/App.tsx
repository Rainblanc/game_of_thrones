import React, { Suspense } from 'react';

import { Provider } from 'react-redux';
import { persistor, store } from 'store';
import { AppRouter } from 'router';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingProvider } from 'components/loading';

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {() => (
            <LoadingProvider>
              <AppRouter />
            </LoadingProvider>
          )}
        </PersistGate>
      </Provider>
    </Suspense>
  );
};
export { App };
