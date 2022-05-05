import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order); // sending a response
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "PUT") {
    // for update
    try {
      const product = await Order.findByIdAndUpdate(id, req.body, {
        new: true, // tells mongodb to return newest version
      }); // req.body refers to {status: currentStatus+1}
      res.status(201).json(product); // added successfully
    } catch (error) {
      res.status(500).json(err); // server error
    }
  }
  if (method === "DELETE") {
  }
};

export default handler;
