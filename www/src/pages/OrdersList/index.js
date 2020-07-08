import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GoPlus, GoSearch, GoPencil, GoX, GoItalic } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import Modal from 'react-modal';
import { debounce } from 'debounce';

import { Container } from '~/styles/TableContainer';
import { ModalContent, SignatureImage } from './styles';
import api from '~/services/api';
import StatusTag from './extras/StatusTag';

function OrdersList() {
  const [ordersList, setOrdersList] = useState([]);
  const [viewOrder, setViewOrder] = useState();
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (debounceRef.current) debounceRef.current.clear();

    debounceRef.current = debounce(async () => {
      const { data } = await api.get('orders/', {
        params: {
          q: query,
        },
      });
      setOrdersList(data);
    }, 400);

    debounceRef.current();
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('orders/');
      setOrdersList(data);
    };

    fetchData();
  }, []);

  const handleDelete = async ({ id, product }) => {
    try {
      if (
        !window.confirm(`Tem certeza que deseja remover a entrega: ${product}?`)
      )
        return;

      await api.delete(`orders/${id}/`);
      setOrdersList((state) => state.filter((order) => order.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <h3>Gerenciando Encomendas</h3>

      <div className="table-tools">
        <div className="input-container">
          <GoSearch className="input-icon" />
          <input
            placeholder="Buscar por destinatários"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>

        <Link className="btn-add" to="/orders/add">
          <GoPlus className="icon" color="#fff" />
          Cadastrar
        </Link>
      </div>

      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((order) => (
            <tr key={String(order.id)}>
              <td>{order.id}</td>
              <td>{order.recipient.name}</td>
              <td>{order.courier.name}</td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>
                <StatusTag status={order.status} />
              </td>
              <td>
                <Dropdown
                  trigger={['click']}
                  animation="slide-up"
                  overlay={
                    <Menu selectable={false} style={{ width: 90 }}>
                      <MenuItem
                        key="1"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => setViewOrder(order)}
                      >
                        <GoItalic style={{ marginRight: 10 }} color="#8E5BE8" />
                        Visualizar
                      </MenuItem>
                      <MenuItem
                        key="2"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => history.push(`orders/${order.id}/edit`)}
                      >
                        <GoPencil style={{ marginRight: 10 }} color="#4D85EE" />
                        Editar
                      </MenuItem>
                      <MenuItem
                        key="3"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleDelete(order)}
                      >
                        <GoX style={{ marginRight: 10 }} color="#DE3B3B" />
                        Excluir
                      </MenuItem>
                    </Menu>
                  }
                >
                  <BsThreeDots className="action-icon" />
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={!!viewOrder}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, .4)',
          },
        }}
        onRequestClose={() => setViewOrder(null)}
        contentLabel="Informações da Encomenda"
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
      >
        <ModalContent>
          <strong>Informações da Encomenda</strong>

          <p>
            {viewOrder?.recipient.street}, {viewOrder?.recipient.number}
          </p>

          <p>
            {viewOrder?.recipient.city} - {viewOrder?.recipient.state}
          </p>

          <p>{viewOrder?.recipient.cep}</p>

          <hr />

          <strong>Datas</strong>

          <strong>Retirada:</strong>
          <p>{viewOrder?.start_date}</p>

          <strong>Entrega:</strong>
          <p>{viewOrder?.end_date}</p>

          {viewOrder?.signature && (
            <>
              <hr />

              <strong>Assinatura do destinatário</strong>

              <SignatureImage src={viewOrder.signature.url} alt="Assinatura" />
            </>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default OrdersList;
