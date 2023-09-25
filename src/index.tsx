import { createRoot } from 'react-dom/client'
// Axios
// import axios from 'axios'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from 'react-query'
// import {ReactQueryDevtools} from 'react-query/devtools'
// Apps
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
// React Notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicClientApplication } from "@azure/msal-browser"
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import { AppRoutes } from './app/routing/AppRoutes'
import { MsalProvider } from "@azure/msal-react"
import {
  AuthProvider
  // , setupAxios
} from './app/modules/auth'
import React from 'react'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
// setupAxios(axios)
Chart.register(...registerables)

// const pca = new PublicClientApplication({
//   auth: {
//     clientId: '07a33b9f-a18f-4e5a-95e7-8877468aa804',
//     authority: 'https://login.microsoftonline.com/common'
//   }
// })

const queryClient = new QueryClient()
console.log(queryClient)
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    // <React.StrictMode>
      // <MsalProvider instance={pca}>
        <QueryClientProvider client={queryClient}>
          <MetronicI18nProvider>
            <AuthProvider>
              <ToastContainer />
              <AppRoutes />
            </AuthProvider>
          </MetronicI18nProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider >
      // </MsalProvider>
    // </React.StrictMode>
  )
}
