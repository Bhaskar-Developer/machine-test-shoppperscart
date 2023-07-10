const queryConstructor = (updates, id, tableName) => {
  const updatesKeys = Object.keys(updates);
  const count = updatesKeys.length;
  let query = `UPDATE ${tableName} SET `;
  let parameterIterator = 1;
  let paramsArray = [];

  // Dynamically construct query based on updates
  for (let update in updates) {
    let fieldUpdate =
      parameterIterator === count
        ? `${update} = $${parameterIterator} `
        : `${update} = $${parameterIterator}, `;
    paramsArray.push(updates[update]);
    parameterIterator++;
    query = query + fieldUpdate;
  }

  // add where clause to query
  query = query + `WHERE id = $${parameterIterator};`;
  // add id param to params array
  paramsArray.push(id);

  return {
    query,
    paramsArray,
  };
};

module.exports = queryConstructor;
