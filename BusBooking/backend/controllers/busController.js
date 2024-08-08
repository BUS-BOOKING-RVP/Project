const Bus = require('../models/bus');
const { Op } = require('sequelize');

exports.searchBuses = async (req, res) => {
  try {
    const { start_location, end_location, date } = req.body;

    // Construct query options
    const queryOptions = {
      where: {
        start_location,
        end_location
      }
    };

    // Add date filter if provided
    if (date) {
      queryOptions.where.departure_time = {
        [Op.startsWith]: date // Adjust this depending on how you want to handle the date filtering
      };
    }

    const buses = await Bus.findAll(queryOptions);
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getBusById = async (req, res) => {
  try {
    const { busId } = req.params;
    const bus = await Bus.findByPk(busId);

    if (bus) {
      res.json(bus);
    } else {
      res.status(404).json({ error: 'Bus not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
