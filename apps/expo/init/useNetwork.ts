import { useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo'

export const useNetwork = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const { type: connectionType, isConnected } = state
      console.log('network canceled')
    })

    return () => {
      unsubscribe()
    }
  }, [])
}
