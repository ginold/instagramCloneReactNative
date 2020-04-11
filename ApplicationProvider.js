import { AppNavigator } from './navigation'

import React, { useEffect } from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json';
import { connect } from 'react-redux'
import AuthApi from './api/auth_api'

const AppProvider = (props) => {
  const lightThemeVar = { ...lightTheme, ...appTheme }
  const darkThemeVar = { ...darkTheme, ...appTheme }

  useEffect(() => {
    AuthApi.authStateChanged()
  }, [])

  return (
    <ApplicationProvider mapping={mapping} theme={props.settings.darkTheme ? darkThemeVar : lightThemeVar} >
      <AppNavigator />
    </ApplicationProvider>
  )
}
const mapStateToProps = state => ({
  settings: state.settings
})

export default connect(mapStateToProps)(AppProvider)