import { useNetwork } from './useNetwork'
import { useAppVersion } from './useAppVersion'

export const useInitializer = () => {
  useNetwork()
  useAppVersion()
}
