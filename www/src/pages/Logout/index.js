import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '~/store/modules/auth/actions';

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  return <div />;
}

export default Logout;
