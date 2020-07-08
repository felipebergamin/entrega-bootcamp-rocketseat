import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('Por favor, informe o nome'),
  street: Yup.string().required('Por favor, informe o nome da rua'),
  number: Yup.string().required('Por favor, informe o número'),
  complement: Yup.string(),
  state: Yup.string().required('Por favor, informe o estado'),
  city: Yup.string().required('Por favor, informe o nome da cidade'),
  cep: Yup.string().required('Por favor, informe o CEP'),
});
