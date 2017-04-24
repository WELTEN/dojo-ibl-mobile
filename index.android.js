import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { routes } from './App/routes';

const App = StackNavigator(routes, { initialRouteName: 'Home', headerMode: 'screen' });

AppRegistry.registerComponent('DojoIblMobile', () => App);
