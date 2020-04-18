import AppNavigator from './navigation'
import React, { useEffect } from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json';
import { connect } from 'react-redux'

const AppProvider = (props) => {
  const lightThemeVar = { ...lightTheme, ...appTheme }
  const darkThemeVar = { ...darkTheme, ...appTheme }

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