import React, { useState, useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory, useParams } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { Container, Spacer } from './styles';
import api from '~/services/api';
import validator from './validator';

function AddOrder() {
  const [couriers, setCouriers] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const { data } = await api.get(`orders/${id}`);
        setInitialValues(data);
      };

      fetchData();
    } else {
      setInitialValues({ product: '', recipient_id: null, courier_id: null });
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const [couriersResult, recipientsResult] = await Promise.all([
        api.get('couriers/'),
        api.get('recipients/'),
      ]);

      setCouriers(
        couriersResult.data.map((courier) => ({
          label: courier.name,
          value: courier.id,
        }))
      );
      setRecipients(
        recipientsResult.data.map((recipient) => ({
          label: recipient.name,
          value: recipient.id,
        }))
      );
    };

    fetchData();
  }, []);

  const onFormSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    try {
      if (id) await api.put(`orders/${id}/`, values);
      else await api.post('orders/', values);

      toast.success('Salvo com sucesso!');
      history.goBack();
    } catch (err) {
      if (err.response?.status === 400) actions.setErrors(err.response.data);
      else toast.error('Erro cadastrando encomenda');
    }
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validator}
        onSubmit={onFormSubmit}
        validateOnMount
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid,
          isSubmitting,
          setFieldValue,
        }) => (
          <>
            <div className="title-row">
              <h3>Cadastro de Encomenda</h3>

              <Spacer />

              <button
                disabled={isSubmitting}
                type="button"
                onClick={history.goBack}
              >
                <IoIosArrowBack />
                Voltar
              </button>

              <button
                disabled={!isValid || isSubmitting}
                type="button"
                onClick={handleSubmit}
              >
                <FiCheck />
                Salvar
              </button>
            </div>

            <form>
              <div className="row">
                <div className="label">
                  Destinatário
                  <Select
                    isSearchable
                    placeholder="Selecione o Destinatário"
                    name="recipient_id"
                    options={recipients}
                    onChange={({ value }) =>
                      setFieldValue('recipient_id', value)
                    }
                  />
                  <ErrorMessage
                    name="recipient_id"
                    render={(t) => <p className="error-message">{t}</p>}
                  />
                </div>

                <div className="label">
                  Entregador
                  <Select
                    isSearchable
                    placeholder="Selecione o Entregador"
                    name="courier_id"
                    options={couriers}
                    onChange={({ value }) => setFieldValue('courier_id', value)}
                  />
                  <ErrorMessage
                    name="courier_id"
                    render={(t) => <p className="error-message">{t}</p>}
                  />
                </div>
              </div>

              <label htmlFor="courier_id">
                Nome do Produto
                <input
                  type="text"
                  name="product"
                  placeholder="Nome do Produto"
                  value={values.product}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="product"
                  render={(t) => <p className="error-message">{t}</p>}
                />
              </label>
            </form>
          </>
        )}
      </Formik>
    </Container>
  );
}

export default AddOrder;
