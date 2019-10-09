const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
};

function find() {
  return db("schemes");
}

function findById(id) {
  return (
    db("schemes")
      .where({ id })
      .first() || null
  );
}

function findSteps(schemeId) {
  return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .where({ scheme_id: schemeId })
    .orderBy("step_number")
    .select('steps.id',"scheme_name", "step_number", "instructions");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return (
    db("schemes")
      .where({ id })
      .del() || null
  );
}

function addStep(step, scheme_id) {
  return db("schemes")
    .where({ id:scheme_id })
    .then(() => {
        return db("steps").insert(step).then(() => {
          return findSteps(scheme_id);
      });
    });
}
