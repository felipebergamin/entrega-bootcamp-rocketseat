import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('É necessário informar um e-mail'),
  name: Yup.string().required('É necessário informar um nome'),
});
