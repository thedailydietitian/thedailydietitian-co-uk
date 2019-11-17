const got = require('got');

module.exports = async () => {
  try {
    const { body } = await got('https://api.thedailydietitian.co.uk/recipes');
    return JSON.parse(body);
  } catch (error) {
    throw new Error(error);
  }
};
