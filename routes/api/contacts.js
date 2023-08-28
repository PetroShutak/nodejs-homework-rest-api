const express = require("express");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

const { schemas } = require("../../models");

const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Отримати список контактів
 *     description: Отримати список усіх контактів.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Список контактів успішно отримано.
 *       '401':
 *         description: Користувач не авторизований.
 */
router.get("/", authenticate, ctrl.listContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Отримати контакт за ID
 *     description: Отримати інформацію про контакт за його унікальним ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Унікальний ID контакту.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Інформація про контакт успішно отримана.
 *       '401':
 *         description: Користувач не авторизований.
 *       '404':
 *         description: Контакт з вказаним ID не знайдено.
 */
router.get("/:id", authenticate, isValidId, ctrl.getById);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Додати новий контакт
 *     description: Додати новий контакт з вказаними даними.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contact
 *         in: body
 *         description: Дані нового контакту.
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/addSchema"
 *     responses:
 *       '201':
 *         description: Контакт успішно додано.
 *       '401':
 *         description: Користувач не авторизований.
 */
router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Оновити контакт за ID
 *     description: Оновити інформацію про контакт за його унікальним ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Унікальний ID контакту.
 *         required: true
 *         schema:
 *           type: string
 *       - name: contact
 *         in: body
 *         description: Нові дані для оновлення контакту.
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/addSchema"
 *     responses:
 *       '200':
 *         description: Інформація про контакт успішно оновлена.
 *       '401':
 *         description: Користувач не авторизований.
 *       '404':
 *         description: Контакт з вказаним ID не знайдено.
 */
router.put(
  "/:id",
  isValidId,
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

/**
 * @swagger
 * /contacts/{id}/favorite:
 *   patch:
 *     summary: Оновити статус улюбленого контакту за ID
 *     description: Оновити статус улюбленого контакту за його унікальним ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Унікальний ID контакту.
 *         required: true
 *         schema:
 *           type: string
 *       - name: favorite
 *         in: body
 *         description: Новий статус улюбленого контакту.
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/updateFavoriteSchema"
 *     responses:
 *       '200':
 *         description: Статус улюбленого контакту успішно оновлено.
 *       '401':
 *         description: Користувач не авторизований.
 *       '404':
 *         description: Контакт з вказаним ID не знайдено.
 */
router.patch(
  "/:id/favorite",
  isValidId,
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Видалити контакт за ID
 *     description: Видалити контакт за його унікальним ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Унікальний ID контакту.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Контакт успішно видалено.
 *       '401':
 *         description: Користувач не авторизований.
 *       '404':
 *         description: Контакт з вказаним ID не знайдено.
 */
router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

module.exports = router;



// const express = require("express");

// const { validateBody, isValidId, authenticate } = require("../../middlewares");
// const { contacts: ctrl } = require("../../controllers");

// const { schemas } = require("../../models");

// const router = express.Router();

// router.get("/", authenticate, ctrl.listContacts);

// router.get("/:id", authenticate, isValidId, ctrl.getById);

// router.post(
//   "/",
//   authenticate,
//   validateBody(schemas.addSchema),
//   ctrl.addContact
// );

// router.put(
//   "/:id",
//   isValidId,
//   authenticate,
//   validateBody(schemas.addSchema),
//   ctrl.updateContact
// );

// router.patch(
//   "/:id/favorite",
//   isValidId,
//   authenticate,
//   validateBody(schemas.updateFavoriteSchema),
//   ctrl.updateStatusContact
// );
// router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

// module.exports = router;

