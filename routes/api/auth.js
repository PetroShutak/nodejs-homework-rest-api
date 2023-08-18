const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerLoginSchema),
  ctrl.register
);

router.post("/login", validateBody(schemas.registerLoginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API для управління користувачами
 * 
 * /api/users/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Users]
 *     requestBody:
 *       description: Дані для реєстрації користувача
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 maxLength: 30
 *     responses:
 *       201:
 *         description: Користувача успішно створено
 *       400:
 *         description: Некоректний запит
 * 
 * /api/users/login:
 *   post:
 *     summary: Вхід користувача
 *     tags: [Users]
 *     requestBody:
 *       description: Дані для входу користувача
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 maxLength: 30
 *     responses:
 *       200:
 *         description: Успішний вхід
 *       400:
 *         description: Некоректний запит
 * 
 * /api/users/current:
 *   get:
 *     summary: Отримати поточного користувача
 *     tags: [Users]
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: Успішно отримано інформацію про поточного користувача
 * 
 * /api/users/logout:
 *   post:
 *     summary: Вихід користувача
 *     tags: [Users]
 *     security:
 *       - api_key: []
 *     responses:
 *       200:
 *         description: Успішний вихід
 * 
 * /api/users:
 *   patch:
 *     summary: Оновити підписку користувача
 *     tags: [Users]
 *     security:
 *       - api_key: []
 *     requestBody:
 *       description: Об'єкт з оновленою підпискою
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSubscriptionSchema'
 *     responses:
 *       200:
 *         description: Успішно оновлено підписку користувача
 *       400:
 *         description: Некоректний запит
 */
