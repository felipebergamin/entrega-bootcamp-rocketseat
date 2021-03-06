import { Op } from 'sequelize';

import Order from '../models/Order';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';
import File from '../models/File';

import Queue from '../../lib/Queue';
import NewOrderMail from '../jobs/NewOrderMail';

class OrderController {
  async view(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) return res.status(404).end();

    return res.json(order);
  }

  async store(req, res) {
    try {
      const created = await Order.create(req.body);
      const courier = await Courier.findByPk(req.body.courier_id);
      const recipient = await Recipient.findByPk(req.body.recipient_id);

      await Queue.add(NewOrderMail.key, {
        courier,
        recipient,
      });

      return res.json(created);
    } catch (err) {
      return res.status(500).end();
    }
  }

  async delete(req, res) {
    try {
      const order = await Order.findByPk(req.params.id);

      if (!order) return res.status(404).end();

      await order.destroy();

      return res.status(200).end();
    } catch (err) {
      return res.status(500).end();
    }
  }

  async update(req, res) {
    try {
      const order = await Order.findByPk(req.params.id);

      if (!order) return res.status(404).end();

      order.set(req.body);
      await order.save();

      return res.json(req.body);
    } catch (err) {
      return res.status(500).end();
    }
  }

  async list(req, res) {
    const { q } = req.query;

    const where = q
      ? {
          product: { [Op.like]: `%${q}%` },
        }
      : {};

    try {
      const orders = await Order.findAll({
        where,
        include: [
          {
            model: Courier,
            as: 'courier',
          },
          {
            model: Recipient,
            as: 'recipient',
          },
          {
            model: File,
            as: 'signature',
          },
        ],
      });

      return res.json(orders);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new OrderController();
