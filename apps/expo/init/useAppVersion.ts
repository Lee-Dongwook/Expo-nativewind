import VersionCheck from 'react-native-version-check-expo'
import { useCallback, useEffect } from 'react'
import { Alert, Linking, Platform } from 'react-native'

export const useAppVersion = () => {
  const isLatestAppVersion = useCallback(async () => {
    if (__DEV__) {
      return true
    }

    // 1.0.0
    const currentVersion = VersionCheck.getCurrentVersion()
    // 스토어 배포 전에 undefined
    const latestVersion = await VersionCheck.getLatestVersion()
    const currentParts = currentVersion.split('.').map(Number)
    const latestParts = latestVersion?.split('.').map(Number)

    return (
      // major 버전이 같고 minor 버전이 같거나 높을 때
      currentParts[0] === latestParts?.[0] &&
      currentParts[1] >= latestParts?.[1]
    )
  }, [])

  useEffect(() => {
    const checkAppVersion = async () => {
      if (await isLatestAppVersion()) {
        // TODO: 코드푸시 hook 추가하기
        return
      }

      Alert.alert(
        '새로운 버전이 출시되었습니다.',
        '안정적인 서비스 사용을 위해 업데이트를 진행해주세요.',
        [
          {
            text: '업데이트',
            onPress: () => {
              // Linking.openURL(Platform.OS === 'ios' ? APP_STORE_LINK : PLAY_STORE_LINK);
            },
          },
        ],
      )
    }

    checkAppVersion()
  }, [isLatestAppVersion])
}
