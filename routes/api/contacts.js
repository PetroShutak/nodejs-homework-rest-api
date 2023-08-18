const express = require("express");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

const { schemas } = require("../../models");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  "/:id",
  isValidId,
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);
router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

module.exports = router;


// /**
//  * @swagger
//  * tags:
//  *   name: Contacts
//  *   description: API для управління контактами
//  * 
//  * /api/contacts:
//  *   get:
//  *     summary: Отримати список контактів
//  *     description: Отримати список всіх контактів.
//  *     security:
//  *       - api_key: []
//  *     responses:
//  *       200:
//  *         description: Успішно отримано список контактів
//  * 
//  * /api/contacts/{id}:
//  *   get:
//  *     summary: Отримати інформацію про контакт
//  *     description: Отримати інформацію про конкретний контакт за його ID.
//  *     security:
//  *       - api_key: []
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID контакта
//  *     responses:
//  *       200:
//  *         description: Успішно отримано інформацію про контакт
//  *       404:
//  *         description: Контакт не знайдено
//  * 
//  * /api/contacts:
//  *   post:
//  *     summary: Додати новий контакт
//  *     description: Додати новий контакт до списку.
//  *     security:
//  *       - api_key: []
//  *     requestBody:
//  *       description: Об'єкт з даними контакта
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/AddContactSchema'
//  *     responses:
//  *       201:
//  *         description: Контакт успішно створено
//  *       400:
//  *         description: Некоректний запит
//  * 
//  * /api/contacts/{id}:
//  *   put:
//  *     summary: Оновити контакт за ID
//  *     description: Оновити дані про контакт за його ID.
//  *     security:
//  *       - api_key: []
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID контакта
//  *     requestBody:
//  *       description: Об'єкт з оновленими даними контакта
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/UpdateContactSchema'
//  *     responses:
//  *       200:
//  *         description: Контакт успішно оновлено
//  *       400:
//  *         description: Некоректний запит
//  *       404:
//  *         description: Контакт не знайдено
//  * 
//  * /api/contacts/{id}/favorite:
//  *   patch:
//  *     summary: Оновити статус улюбленого контакта за ID
//  *     description: Оновити статус улюбленого контакта за його ID.
//  *     security:
//  *       - api_key: []
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID контакта
//  *     requestBody:
//  *       description: Об'єкт з оновленим статусом улюбленого контакта
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/UpdateFavoriteSchema'
//  *     responses:
//  *       200:
//  *         description: Статус улюбленого контакта успішно оновлено
//  *       400:
//  *         description: Некоректний запит
//  *       404:
//  *         description: Контакт не знайдено
//  * 
//  * /api/contacts/{id}:
//  *   delete:
//  *     summary: Видалити контакт за ID
//  *     description: Видалити контакт за його ID.
//  *     security:
//  *       - api_key: []
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID контакта
//  *     responses:
//  *       204:
//  *         description: Контакт успішно видалено
//  *       404:
//  *         description: Контакт не знайдено
//  */