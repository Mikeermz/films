const homeController = (req, resp) => {
  const suma = 2 + 3;
  const { headers } = req;
  const { host } = headers;
  if (host === 'localhost:3002') {
    resp.send({
      message: `Server on ${host}`,
    });
  } else {
    resp.send({suma});
  }
};

module.exports = { homeController };
