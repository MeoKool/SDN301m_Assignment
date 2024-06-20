const { body, validationResult } = require("express-validator");
const moment = require("moment");

//validate Register
const validateCreateMember = [
  body("memberName")
    .isLength({ min: 5 })
    .withMessage("memberName must be at least 5 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),
  body("yob")
    .matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .withMessage("yob must be in the format YYYY-MM-DD")
    .custom((value) => {
      if (moment(value).isAfter(moment())) {
        throw new Error("Date of birth cannot be in the future");
      }
      if (moment().diff(moment(value), "years") < 18) {
        throw new Error("You must be at least 18 years old");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json(messages);
    }
    next();
  },
];
//validate Login
const validateLogin = [
  body("memberName")
    .isLength({ min: 5 })
    .withMessage("memberName must be at least 5 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json(messages);
    }
    next();
  },
];
//validate Update
const validateUpdateMember = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),
  body("yob")
    .matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .withMessage("yob must be in the format YYYY-MM-DD")
    .custom((value) => {
      if (moment(value).isAfter(moment())) {
        throw new Error("Date of birth cannot be in the future");
      }
      if (moment().diff(moment(value), "years") < 18) {
        throw new Error("You must be at least 18 years old");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json(messages);
    }
    next();
  },
];
const middleWareValidation = {
  validateCreateMember,
  validateLogin,
  validateUpdateMember,
};

module.exports = middleWareValidation;
