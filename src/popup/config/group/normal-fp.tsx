import { memo, useMemo } from "react"
import { useConfigStore } from "@/popup/stores/config"
import { HookType } from '@/types/enum'
import { InputLine } from "../../config/form/input"
import { useTranslation } from "react-i18next"
import SelectFpConfigItem from "../item/fp/select"

type DeprecatedType = {
  option: HookType,
  reason: string
}

const BASE_TYPES = [HookType.default, HookType.page, HookType.browser, HookType.domain, HookType.global]

// export type NormalFpConfigGroupProps = {
// }

export const NormalFpConfigGroup = memo(() => {
  const [t, i18n] = useTranslation()

  const netDeprecatedTypes = useMemo<DeprecatedType[]>(() => [
    {
      option: HookType.page,
      reason: t('item.warn.unsupported-net-hook'),
    },
    {
      option: HookType.domain,
      reason: t('item.warn.unsupported-net-hook'),
    },
  ], [i18n.language])

  const config = useConfigStore((state) => {
    state.config ?? state.loadStorage()
    return state.config
  })
  const fp = config?.fingerprint

  return fp && <>
    <SelectFpConfigItem
      title={t('item.title.equipment')}
      desc={t('item.desc.equipment')}
      options={BASE_TYPES}
      deprecatedOptions={netDeprecatedTypes}
      defaultValue={fp.navigator.equipment.type}
      onChange={(type) => fp.navigator.equipment.type = type as any}
    />

    <SelectFpConfigItem
      title={t('item.title.language')}
      desc={t('item.desc.language')}
      options={BASE_TYPES}
      deprecatedOptions={netDeprecatedTypes}
      defaultValue={fp.navigator.language.type}
      onChange={(type) => fp.navigator.language.type = type}
      custom={<InputLine label="value"
        defaultValue={navigator.language}
        initialValue={(fp.navigator.language as ValueHookMode).value}
        onDebouncedInput={(value) => (fp.navigator.language as ValueHookMode).value = value} />}
    />

    <SelectFpConfigItem
      title={t('item.title.hardwareConcurrency')}
      desc={t('item.desc.hardwareConcurrency')}
      options={BASE_TYPES}
      defaultValue={fp.navigator.hardwareConcurrency.type}
      onChange={(type) => fp.navigator.hardwareConcurrency.type = type}
      custom={<InputLine label="value"
        defaultValue={navigator.hardwareConcurrency}
        initialValue={(fp.navigator.hardwareConcurrency as ValueHookMode).value}
        onDebouncedInput={(value) => (fp.navigator.hardwareConcurrency as ValueHookMode).value = value} />}
    />

    <SelectFpConfigItem
      title={t('item.title.size')}
      desc={t('item.desc.size')}
      options={BASE_TYPES}
      defaultValue={fp.screen.width.type}
      onChange={(type) => {
        fp.screen.width.type = type
        fp.screen.height.type = type
      }}
      custom={<>
        <InputLine label="width"
          defaultValue={screen.width}
          initialValue={(fp.screen.width as ValueHookMode).value}
          onDebouncedInput={(value) => (fp.screen.width as ValueHookMode).value = value} />
        <InputLine label="height"
          defaultValue={screen.height}
          initialValue={(fp.screen.height as ValueHookMode).value}
          onDebouncedInput={(value) => (fp.screen.height as ValueHookMode).value = value} />
      </>}
    />

    <SelectFpConfigItem
      title={t('item.title.depth')}
      desc={t('item.desc.depth')}
      options={BASE_TYPES}
      defaultValue={fp.screen.colorDepth.type}
      onChange={(type) => {
        fp.screen.colorDepth.type = type
        fp.screen.pixelDepth.type = type
      }}
      custom={<>
        <InputLine label="colorDepth"
          defaultValue={screen.colorDepth}
          initialValue={(fp.screen.colorDepth as ValueHookMode).value}
          onDebouncedInput={(value) => (fp.screen.colorDepth as ValueHookMode).value = value} />
        <InputLine label="pixelDepth"
          defaultValue={screen.pixelDepth}
          initialValue={(fp.screen.pixelDepth as ValueHookMode).value}
          onDebouncedInput={(value) => (fp.screen.pixelDepth as ValueHookMode).value = value} />
      </>}
    />
  </>
})

export default NormalFpConfigGroup