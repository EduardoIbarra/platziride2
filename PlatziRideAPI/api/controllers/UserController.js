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
      const hashedPassword = await bcrypt.hash(password, saltRound);
      // USE WITHOUT AWAIT FIRST *************
      const user = await User.create({email, password: hashedPassword}).fetch();
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
    try {
      const schema = joi.object().keys({
        email: joi.string().required().email(),
        password: joi.string().required(),
      });
      const {email, password} = await joi.validate(req.allParams(), schema);
      const user = await User.findOne({email});
      if (!user) {
        return res.notFound({err: 'User not found'});
      }
      const comparedPassword = await bcrypt.compare(password, user.password);
      return (comparedPassword) ? res.ok(user) : res.badRequest({err: 'Unauthorized'});
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({err}).json();
      }
      return res.serverError(err).json();
    }
  }

};

