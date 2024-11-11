import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.layer.css';
import { ContextMenuProvider } from 'mantine-contextmenu';
import 'mantine-contextmenu/styles.css';
import 'mantine-datatable/styles.layer.css';
import '@mantine/dates/styles.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './layout.css';
import { DatesProvider } from '@mantine/dates';


// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <ColorSchemeScript defaultColorScheme="auto" />
            <MantineProvider withGlobalClasses>
                <ContextMenuProvider zIndex={5000} shadow="md" borderRadius="md">
                <DatesProvider settings={{ locale: 'en' }}>
                    <Provider store={store}>
                        {/* <PersistGate loading={null} persistor={persistor}> */}
                            <RouterProvider router={router} />
                        {/* </PersistGate> */}
                    </Provider>
                </DatesProvider>
                </ContextMenuProvider>
            </MantineProvider>
        </Suspense>
    </React.StrictMode>
);
