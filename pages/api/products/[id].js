import dbConnect from "../../../util/mongo"; // DB Connection
import Product from "../../../models/Product"; // Model

// async because no way to know how long it will take
export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product); // successfull
    } catch (error) {
      res.status(500).json(err); // error
    }
  }

  if (method === "PUT") {
    // for update
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true, // tells mongodb to return newest version
      }); // req.body refers to {status: currentStatus+1}
      res.status(201).json(product); // added successfully
    } catch (error) {
      res.status(500).json(err); // server error
    }
  }

  if (method === "DELETE") {
    // for update
    try {
      await Product.findByIdAndDelete(id);
      res.status(201).json("The product has been deleted."); //  successfully
    } catch (error) {
      res.status(500).json(err); // server error
    }
  }
}
