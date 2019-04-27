exports.create = async (db, data) => {
    return await db.insertOne(data);
}

exports.update = async (db, data, criteria) => {
    return await db.updateOne(criteria, { $set: data });
}

exports.remove = async (db, criteria) => {
    return await db.remove(criteria);
}

exports.findOne = async (db, criteria) => {
    return await db.findOne(criteria);
}

exports.find = async (db, criteria) => {
    return await db.find(criteria).toArray();
}
