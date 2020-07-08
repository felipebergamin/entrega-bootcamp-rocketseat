import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AuthContext } from '~/contexts/auth';

import Login from '~/pages/Login';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';
import OrderDetail from '~/pages/OrderDetail';
import SendProblem from '~/pages/SendProblem';
import ListProblems from '~/pages/ListProblems';
import ConfirmDelivery from '~/pages/ConfirmDelivery';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const OrdersNavigator = () => (
  <Stack.Navigator
    initialRouteName="OrdersList"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="OrdersList" component={Deliveries} />
    <Stack.Screen name="OrderDetail" component={OrderDetail} />
    <Stack.Screen name="SendProblem" component={SendProblem} />
    <Stack.Screen name="ListProblems" component={ListProblems} />
    <Stack.Screen name="ConfirmDelivery" component={ConfirmDelivery} />
  </Stack.Navigator>
);

const Routes = () => {
  const auth = useContext(AuthContext);

  if (!auth.isAuth) return <Login />;

  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#7D40E7',
          inactiveTintColor: '#999999',
        }}
      >
        <Tabs.Screen
          name="Deliveries"
          component={OrdersNavigator}
          options={{
            title: 'Entregas',
            tabBarIcon: (props) => <Icon {...props} name="list" />,
          }}
        />

        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Meu Perfil',
            tabBarIcon: (props) => <Icon {...props} name="user-circle" />,
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
