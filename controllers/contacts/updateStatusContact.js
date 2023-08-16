const { HttpError } = require("../../utilities");
const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  // if (!("favorite" in req.body)) {
  //   res.status(400).json({ message: "missing field favorite" });
  //   return;
  // }

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateStatusContact;