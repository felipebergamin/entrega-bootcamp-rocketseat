import React from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authenticated } from '../../store/modules/auth/actions';
import api from '../../services/api';
import Logo from '../../assets/logo.svg';
import { Form, Image, InputLabel, TextInput, Button } from './styles';

function Login({ receiveAuth }) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);

      const { data } = await api.post('sessions', values);
      receiveAuth(data);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Image src={Logo} alt="Fasfeed logo" />

      <InputLabel>
        E-mail
        <TextInput
          type="email"
          name="email"
          placeholder="E-mail address"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </InputLabel>

      <InputLabel>
        Password
        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </InputLabel>

      <Button type="submit">Entrar no Sistema</Button>
    </Form>
  );
}

Login.propTypes = {
  receiveAuth: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  receiveAuth: authenticated,
};

export default connect(null, mapDispatchToProps)(Login);
