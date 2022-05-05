import dbConnect from "../../../util/mongo"; // DB Connection
import Product from "../../../models/Product"; // Model

// async because no way to know how long it will take
export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token;

  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products); // successfull
    } catch (error) {
      res.status(500).json(error); // error
    }
  }

  if (method === "POST") {
    // for security: only admin can post.
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("You are not authenticated.");
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product); // added successfully
    } catch (error) {
      res.status(500).json(error); // server error
    }
  }
}
