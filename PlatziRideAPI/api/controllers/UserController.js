/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const joi = require('joi');
const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports = {


  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
      const schema = joi.object().keys({
        email: joi.string().required().email(),
        password: joi.string().required(),
      });
      const {email, password} = await joi.validate(req.allParams(), schema);
      const encryptedPassword = await bcrypt.hash(password, saltRound);
      // USE WITHOUT AWAIT FIRST *************
      const user = await User.create({email, password: encryptedPassword}).fetch();
      return res.ok(user);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({err}).json();
      }
      return res.serverError(err).json();
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    return res.json({
      todo: 'login() is not implemented yet!'
    });
  }

};

