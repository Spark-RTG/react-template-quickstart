import './sl_index.scss'

import App from './SLApp'
import { Provider } from 'react-redux'
import { SLStateStore } from './SLReduxStore'
import { createRoot } from 'react-dom/client'

const root = document.getElementById('root')!

createRoot(root).render(
  <Provider store={SLStateStore}>
    <App />
  </Provider>
)
