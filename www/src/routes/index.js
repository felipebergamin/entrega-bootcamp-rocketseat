import React from 'react';
import {
  BrowserRouter,
  Switch,
  Redirect,
  Route as RouterRoute,
} from 'react-router-dom';

import Route from './Route';
import Login from '~/pages/Login';
import CouriersList from '~/pages/CouriesList';
import AddCourier from '~/pages/AddCourier';
import Recipients from '~/pages/Recipients';
import RecipientForm from '~/pages/RecipientForm';
import OrdersList from '~/pages/OrdersList';
import AddOrder from '~/pages/AddOrder';
import Problems from '~/pages/Problems';
import Logout from '~/pages/Logout';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <RouterRoute path="/" render={() => <Redirect to="/login" />} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/couriers" component={CouriersList} exact isPrivate />
        <Route path="/couriers/add" component={AddCourier} exact isPrivate />
        <Route
          path="/couriers/:id/edit"
          component={AddCourier}
          exact
          isPrivate
        />
        <Route path="/recipients" component={Recipients} exact isPrivate />
        <Route
          path="/recipients/add"
          component={RecipientForm}
          exact
          isPrivate
        />
        <Route
          path="/recipients/:id/edit"
          component={RecipientForm}
          exact
          isPrivate
        />
        <Route path="/orders" component={OrdersList} exact isPrivate />
        <Route path="/orders/add" component={AddOrder} exact isPrivate />
        <Route path="/orders/:id/edit" component={AddOrder} exact isPrivate />
        <Route path="/delivery-problems" component={Problems} exact isPrivate />
        <Route path="/logout" component={Logout} exact isPrivate />
      </Switch>
    </BrowserRouter>
  );
}
