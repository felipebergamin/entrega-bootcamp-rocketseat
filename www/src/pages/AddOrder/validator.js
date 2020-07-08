import * as Yup from 'yup';

export default Yup.object().shape({
  recipient_id: Yup.number().required('Por favor, selecione um destinatário'),
  courier_id: Yup.number().required('Por favor, selecione um entregador'),
  product: Yup.string().required('Informe o nome do produto a ser entregue'),
});
