// Returns a list of saved recipes by a certain user
const connection = require('../models/db');

const getRecipeBySaves = async (accountId) => {
    const sql = `SELECT * FROM saves INNER JOIN accounts ON saves.account_id = accounts.id WHERE account_id = ?;`;
    const results = await new Promise((resolve, reject) => {
      connection.query(sql, [accountId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    return results;
  };

module.exports = getRecipeBySaves;

