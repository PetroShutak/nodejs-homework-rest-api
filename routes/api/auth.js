const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     description: Реєстрація нового користувача з використанням даних, які надає користувач.
 *     parameters:
 *       - name: user
 *         in: body
 *         description: Дані нового користувача.
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/registerLoginSchema"
 *     responses:
 *       '200':
 *         description: Успішно зареєстровано.
 */
router.post(
  "/register",
  validateBody(schemas.registerLoginSchema),
  ctrl.register
);

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Надіслати підтвердження електронної пошти
 *     description: Надіслати підтвердження електронної пошти для вказаної адреси.
 *     parameters:
 *       - name: email
 *         in: body
 *         description: Електронна пошта для надсилання підтвердження.
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/emailSchema"
 *     responses:
 *       '200':
 *         description: Підтвердження надіслано успішно.
 */
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

/**
 * @swagger
 * /verify/{verificationToken}:
 *   get:
 *     summary: Підтвердження електронної пошти
 *     description: Підтвердження електронної пошти за допомогою токена підтвердження.
 *     parameters:
 *       - name: verificationToken
 *         in: path
 *         description: Токен підтвердження, відправлений на електронну пошту користувача.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Електронну пошту підтверджено успішно.
 */
router.get("/verify/:verificationToken", ctrl.verifyEmail);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Авторизація користувача
 *     description: Виконати вхід користувача з використанням вказаних даних.
 *     parameters:
 *       - name: user
 *         in: body
 *         description: Дані користувача для авторизації.
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/registerLoginSchema"
 *     responses:
 *       '200':
 *         description: Успішний вхід.
 */
router.post("/login", validateBody(schemas.registerLoginSchema), ctrl.login);

/**
 * @swagger
 * /current:
 *   get:
 *     summary: Отримати інформацію про поточного користувача
 *     description: Отримати інформацію про авторизованого користувача.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Інформація про користувача успішно отримана.
 *       '401':
 *         description: Користувач не авторизований.
 */
router.get("/current", authenticate, ctrl.getCurrent);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Вихід користувача
 *     description: Виконати вихід авторизованого користувача.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Успішний вихід.
 *       '401':
 *         description: Користувач не авторизований.
 */
router.post("/logout", authenticate, ctrl.logout);

/**
 * @swagger
 * /:
 *   patch:
 *     summary: Оновлення інформації про користувача
 *     description: Оновити інформацію про користувача, включаючи підписку.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: user
 *         in: body
 *         description: Нові дані користувача для оновлення.
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/updateSubscriptionSchema"
 *     responses:
 *       '200':
 *         description: Інформація про користувача успішно оновлена.
 *       '401':
 *         description: Користувач не авторизований.
 */
router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

/**
 * @swagger
 * /avatars:
 *   patch:
 *     summary: Оновлення аватара користувача
 *     description: Завантажити новий аватар для користувача.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: avatar
 *         in: formData
 *         description: Зображення аватара користувача.
 *         required: true
 *         type: file
 *     responses:
 *       '200':
 *         description: Аватар користувача успішно оновлено.
 *       '401':
 *         description: Користувач не авторизований.
 */
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;



// const express = require("express");
// const { validateBody, authenticate, upload } = require("../../middlewares");
// const { schemas } = require("../../models/user");
// const { users: ctrl } = require("../../controllers");

// const router = express.Router();

// router.post(
//   "/register",
//   validateBody(schemas.registerLoginSchema),
//   ctrl.register
// );

// router.post(
//   "/verify",
//   validateBody(schemas.emailSchema),
//   ctrl.resendVerifyEmail
// );

// router.get("/verify/:verificationToken", ctrl.verifyEmail);

// router.post("/login", validateBody(schemas.registerLoginSchema), ctrl.login);

// router.get("/current", authenticate, ctrl.getCurrent);

// router.post("/logout", authenticate, ctrl.logout);

// router.patch(
//   "/",
//   authenticate,
//   validateBody(schemas.updateSubscriptionSchema),
//   ctrl.updateSubscription
// );

// router.patch(
//   "/avatars",
//   authenticate,
//   upload.single("avatar"),
//   ctrl.updateAvatar
// );

// module.exports = router;
