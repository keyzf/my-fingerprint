import { Button, Divider, Layout, Tabs, type TabsProps, Typography, theme } from "antd"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import {
  CheckOutlined,
  CloseOutlined,
  AlertOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import FHookRecord from "./components/module/f-record"
import FConfig from "./components/module/f-config"

import { urlToHttpHost } from "@/utils/base"
import { msgAddWhiteList, msgDelWhiteList, msgGetNotice } from "@/message/runtime"

function App() {
  const [t, i18n] = useTranslation()
  const [enabled, setEnabled] = useState(false)
  const [tab, setTab] = useState<chrome.tabs.Tab>()
  const [hostPart, setHostPart] = useState<[string, string]>()
  const [config, setConfig] = useState<Partial<LocalStorageConfig>>()

  const [hookRecords, setHookRecords] = useState<ToolbarNoticeRecord['data']>()
  const [isWhitelist, setIsWhitelist] = useState(false)

  useEffect(() => {
    chrome.storage.local.get(['config']).then(({config}: Partial<LocalStorage>) => {
      setConfig(config)
    })
    chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      const tab = tabs[0]
      setTab(tab)
      if (!tab?.url) return
      const host = urlToHttpHost(tab.url)
      if (!host) return
      const temp = host.split(':')
      setHostPart([temp[0], temp[1]])
    })
    msgGetNotice().then((data) => {
      if(data.type === 'record'){
        setHookRecords(data.data)
      }else if(data.type === 'whitelist'){
        setIsWhitelist(true)
      }
    })
  }, [])

  useEffect(() => {
    setEnabled(!!config?.enable)
  }, [config])

  const addWhitelist = () => {
    if(!hostPart)return
    msgAddWhiteList(hostPart.join(':'))
    setIsWhitelist(true)
  }

  const delWhitelist = () => {
    if(!hostPart)return
    msgDelWhiteList(hostPart.join(':'))
    setIsWhitelist(false)
  }

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        label: t('e.f-record'),
        icon: <AlertOutlined />,
        children: <FHookRecord tab={tab} config={config} records={hookRecords} />,
      },
      {
        label: t('e.f-config'),
        icon: <SettingOutlined />,
        children: <FConfig tab={tab} config={config} />,
      },
    ].map((item, index) => ({...item, key: String(index)}))
  }, [i18n.language, config, tab])

  return (
    <Layout className="overflow-auto no-scrollbar p-2 w-64 h-[600px]">

      <Typography.Text className="mx-auto text-2xl font-black ">My Fingerprint</Typography.Text>

      <Divider style={{ margin: '8px 0' }} />

      <section className="flex items-stretch gap-2">

        {/* 白名单开关 */}
        <section className="grow flex flex-col items-center gap-1">
          <Button type={isWhitelist ? 'primary' : 'default'} 
            className="font-mono font-bold"
            style={{width: '100%'}}
            onClick={isWhitelist ? delWhitelist : addWhitelist} >
            {isWhitelist ? <CheckOutlined /> : <CloseOutlined />} {hostPart?.[0] ?? t('tip.not-support-whitelist')}
          </Button>
          <Typography.Text className="text-[13px]">{isWhitelist ? t('e.whitelist-in') : t('e.whitelist-not')}</Typography.Text>
        </section>

        {/* 插件开关 */}
        <section className="flex flex-col items-center gap-1">
          <Button type={enabled ? 'primary' : 'default'} className="font-bold" onClick={() => { setEnabled(!enabled) }}>
            {enabled ? t('g.enabled') : t('g.disabled')}
          </Button>
          {/* <Switch value={enabled} onChange={setEnabled} /> */}
          <Typography.Text className="text-[13px]">{enabled ? t('e.enabled') : t('e.disabled')}</Typography.Text>
        </section>

      </section>

      <Divider style={{ margin: '8px 0 0 0' }} />

      <Tabs type="line" size='small' centered items={tabItems} />

    </Layout>
  )
}

export default App
