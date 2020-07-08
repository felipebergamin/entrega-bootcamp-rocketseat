import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowBack } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { Container, Spacer } from './styles';
import ImagePicker from '~/components/ImagePicker';
import validator from './validator';
import api from '~/services/api';

function AddCourier({ history }) {
  const filePickerRef = useRef();
  const routeParams = useParams();
  const [avatarFile, setAvatarFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validateOnMount: true,
    validationSchema: validator,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      let avatar_id = null;

      if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);

        try {
          const {
            data: { id },
          } = await api.post('files/', formData);

          avatar_id = id;
        } catch (err) {
          return toast.error(`Houve um erro ao enviar sua foto`);
        }
      }

      try {
        if (avatar_id) values.avatar_id = avatar_id;

        if (routeParams.id) await api.put(`couriers/${routeParams.id}`, values);
        else await api.post('couriers/', values);
      } catch (err) {
        return toast.error(
          'Desculpe, houve um erro fazendo o cadastro do entregador'
        );
      }

      toast.success('Entregador cadastrado');
      history.goBack();
    },
  });

  useEffect(() => {
    if (!routeParams?.id) return;

    const fetchData = async (id) => {
      const {
        data: { name, email, avatar },
      } = await api.get(`couriers/${id}`);
      formik.setValues({ name, email });
      if (avatar) setPreviewUrl(avatar.url);
    };

    fetchData(routeParams.id);
  }, [routeParams]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValidating,
    isValid,
    isSubmitting,
  } = formik;

  const shouldDisableSubmit = !isValid || isValidating || isSubmitting;

  return (
    <Container>
      <div className="title-row">
        <h3>Cadastro de Empregadores</h3>

        <Spacer />

        <button type="button" onClick={history.goBack}>
          <IoIosArrowBack />
          Voltar
        </button>

        <button
          disabled={shouldDisableSubmit}
          type="button"
          onClick={handleSubmit}
        >
          <FiCheck />
          Salvar
        </button>
      </div>

      <form>
        <ImagePicker
          inputRef={filePickerRef}
          onChangeFile={setAvatarFile}
          previewUrl={previewUrl}
        />

        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? (
            <p className="error-message">{errors.name}</p>
          ) : null}
        </label>

        <label htmlFor="email">
          E-mail
          <input
            type="email"
            name="email"
            placeholder="example@rocketseat.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <p className="error-message">{errors.email}</p>
          ) : null}
        </label>
      </form>
    </Container>
  );
}

AddCourier.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default AddCourier;
