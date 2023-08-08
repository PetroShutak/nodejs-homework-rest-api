const { catchAsync } = require("../../utils/catch");
const { updateContact } = require("../../models/contacts");
const { HttpError } = require("../../utils/errors");

const updateFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  try {
    const updatedContact = await updateContact(contactId, favorite);

    if (!updatedContact) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact favorite status:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

module.exports = {
  updateFavorite: catchAsync(updateFavorite),
};
