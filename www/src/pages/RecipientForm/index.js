import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { Container, Spacer } from './styles';
import Validator from './validator';
import api from '~/services/api';

function RecipientForm({ history }) {
  const routeParams = useParams();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: '',
    street: '',
    number: '',
    complement: '',
    state: '',
    city: '',
    cep: '',
  });

  useEffect(() => {
    if (routeParams.id) {
      api.get(`recipients/${routeParams.id}`).then(({ data }) => {
        setInitialValues(data);
        setLoading(false);
      });
    } else setLoading(false);
  }, [routeParams]);

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    try {
      if (routeParams.id)
        await api.put(`recipients/${routeParams.id}/`, values);
      else await api.post('recipients/', values);

      toast.success('Destinatário salvo com sucesso!');
      history.goBack();
    } catch (err) {
      toast.error('Erro ao cadastrar destinatário');
      if (err.response && err.response.status === 400) {
        actions.setErrors(err.response.data);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <Formik
        validationSchema={Validator}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <>
            <div className="title-row">
              <h3>Cadastro de Destinatários</h3>

              <Spacer />

              <button type="button" onClick={history.goBack}>
                <IoIosArrowBack />
                Voltar
              </button>

              <button type="submit" onClick={handleSubmit}>
                <FiCheck />
                Salvar
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  name="name"
                  placeholder="Anakin Skywalker"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="name"
                  render={(t) => <p className="error-message">{t}</p>}
                />
              </label>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <label htmlFor="street" style={{ flex: 5 }}>
                  Rua
                  <input
                    type="text"
                    name="street"
                    placeholder="Estrela da Morte"
                    value={values.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="street"
                    render={(t) => <p className="error-message">{t}</p>}
                  />
                </label>

                <label htmlFor="number" style={{ flex: 2 }}>
                  Número
                  <input
                    type="text"
                    name="number"
                    placeholder="1234"
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="number"
                    render={(t) => <p className="error-message">{t}</p>}
                  />
                </label>

                <label htmlFor="complement" style={{ flex: 2 }}>
                  Complemento
                  <input
                    type="text"
                    name="complement"
                    placeholder="Complemento"
                    value={values.complement}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="complement"
                    render={(t) => <p className="error-message">{t}</p>}
                  />
                </label>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <label htmlFor="city" style={{ flex: 1 }}>
                  Cidade
                  <input
                    type="text"
                    name="city"
                    placeholder="Império"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="city"
                    render={(t) => <p className="error-message">{t}</p>}
                  />
                </label>

                <label htmlFor="state" style={{ flex: 1 }}>
                  State
                  <input
                    type="text"
                    name="state"
                    placeholder="São Paulo"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="state"
                    render={(t) => <p className="error-message">{t}</p>}
                  />
                </label>

                <label htmlFor="cep" style={{ flex: 1 }}>
                  CEP
                  <input
                    type="text"
                    name="cep"
                    placeholder="09200-123"
                    value={values.cep}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="cep"
                    render={(t) => <p className="error-message">{t}</p>}
                  />
                </label>
              </div>
            </form>
          </>
        )}
      </Formik>
    </Container>
  );
}

RecipientForm.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default RecipientForm;
