const checkExist = (Model, type) => async (req, res, next) => {
  try {
    const valueCheck = req.body[type];
    const id = req.params.id;
    const detail = await Model.findOne({
      where: {
        [type || "id"]: valueCheck || id,
      },
    });
    if (detail) {
      next();
    } else {
      res.status(404).send({
        messages: `${type || "id"} does not exist`,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  checkExist,
};
