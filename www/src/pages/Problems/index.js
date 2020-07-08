import React, { useEffect, useState, useRef } from 'react';
import { GoSearch, GoItalic, GoTrashcan } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import { toast } from 'react-toastify';
import { debounce } from 'debounce';
import Modal from 'react-modal';

import { Container } from '~/styles/TableContainer';
import api from '~/services/api';
import { ModalContent } from '../OrdersList/styles';

function Problems() {
  const [problems, setProblems] = useState([]);
  const [query, setQuery] = useState('');
  const [viewProblem, setViewProblem] = useState();
  const debounceRef = useRef();

  useEffect(() => {
    if (debounceRef.current) debounceRef.current.clear();

    debounceRef.current = debounce(async () => {
      const { data } = await api.get('delivery-problems/', {
        params: {
          q: query,
        },
      });
      setProblems(data);
    }, 400);

    debounceRef.current();
  }, [query]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await api.get('delivery-problems/');
      setProblems(data);
    };

    loadData();
  }, []);

  const handleCancel = async ({ id }) => {
    try {
      if (!window.confirm('Deseja cancelar a entrega?')) return;

      await api.post(`/delivery-problems/${id}/cancel-delivery/`);
      toast.success('Esta entrega foi cancelada');
    } catch (err) {
      toast.error(
        err.response?.data?.message ?? 'Não foi possível cancelar a entrega'
      );
    }
  };

  return (
    <Container>
      <h3>Problemas na Entrega </h3>

      <div className="table-tools">
        <div className="input-container">
          <GoSearch className="input-icon" />
          <input
            placeholder="Buscar por destinatários"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={String(problem.id)}>
              <td>#{problem.order.id}</td>
              <td>{problem.description}</td>
              <td>
                <Dropdown
                  trigger={['click']}
                  animation="slide-up"
                  overlay={
                    <Menu style={{ width: 110 }} selectable={false}>
                      <MenuItem
                        key="1"
                        onClick={() => setViewProblem(problem)}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <GoItalic style={{ marginRight: 10 }} color="#4D85EE" />
                        Visualizar
                      </MenuItem>
                      <MenuItem
                        key="2"
                        onClick={() => handleCancel(problem)}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <GoTrashcan
                          style={{ marginRight: 10 }}
                          color="#DE3B3B"
                        />
                        Cancelar
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
        isOpen={!!viewProblem}
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
        onRequestClose={() => setViewProblem(null)}
        contentLabel="Informações da Encomenda"
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
      >
        <ModalContent>
          <p>{viewProblem?.description ?? 'Nenhuma descrição'}</p>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default Problems;
