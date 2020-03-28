import { changeTheme } from '../redux_actions/settings';
import { myStore } from '../App'

export default class SettingsService {
  static changeTheme = (on) => {
    myStore.dispatch(changeTheme(on))
  }
}
