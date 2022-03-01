import { useState } from 'react'
import cl from 'clsx'

import s from './App.module.scss'

import Result from './components/Result'

function App() {
  const [activeTab, setActiveTab] = useState('config')
  const [config, setConfig] = useState('')

  return (
    <div className={s.root}>
      <div className={s.form}>
        <div className={s.tabs}>
          <div
            className={cl(s.tabs_item, activeTab === 'config' && s['tabs_item-active'])}
            onClick={() => setActiveTab('config')}
          >
            Config
          </div>
          <div
            className={cl(s.tabs_item, activeTab === 'result' && s['tabs_item-active'])}
            onClick={() => setActiveTab('result')}
          >
            Result
          </div>
        </div>
        <div className={s.body}>
          {activeTab === 'config'
          ? (
            <>
              <textarea
                className={s.textArea}
                value={config}
                onChange={(e) => setConfig(e.target.value) }
              />
              <input
                className={s.button}
                value='Apply'
                type='submit'
                onClick={() => setActiveTab('result')}
              />
            </>
          ) : config && <Result config={config}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
