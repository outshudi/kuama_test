import details from '../models/details.js';

export const getDetails = async (req, res) => {
      try {
            const list = await details.find();
            res.status(200).json(list);
      } catch (error) {
            res.status(404).json(error.message)
      }
}