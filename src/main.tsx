import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './configs/Authentication/authConfig';

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
import store from './store/index';

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </Suspense>
    </React.StrictMode>
);

