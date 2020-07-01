const { check } = require("express-validator");

exports.contactFormValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Please add a valid email"),
  check("message")
    .not()
    .isEmpty()
    .isLength({ min: 20 })
    .withMessage("Message should be at 20 characters long."),
];
