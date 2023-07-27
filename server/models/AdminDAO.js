require('../utils/MongooseUtil');
const Models = require('./Models');

const AdminDAO = {
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    const admin = await Models.Admin.findOne(query);
    return admin;
  },
  async delete(_id) {
    const result = await Models.Product.findByIdAndRemove(_id);
    return result;
  }
};
module.exports = AdminDAO;