import cookie from "cookie";

const handler = (req, res) => {
  if (req.method === "POST") {
    // handle logins
    const { username, password } = req.body; // destructure the obj req.body and stores in username, password

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      // setting cookie in the header
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60, // 1 hour
          sameSite: "strict", // make cookie more secure: strict,
          path: "/", // all application, no specific url
        })
      );
      // send a response
      res.status(200).json("Successfull.");
    } else {
      res.status(400).json("Wrong Credentials.");
    }
  }
};

export default handler;
