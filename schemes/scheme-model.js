const db = require('../data/db-config.js')

module.exports = {
    find,
    findById,
    findSteps,
    add,
}



function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes").where({ id }).first();
}

function findSteps(schemeId) {
    return db("steps")
        .join("schemes", "schemes.id", "steps.scheme_id")
        .where({ scheme_id: schemeId })
        .orderBy("step_number").select("scheme_name","step_number","instructions")
    
}

function add(scheme) {
    return db("schemes").insert(scheme, "id").then(([id]) => {
        return findById(id)
    })
}