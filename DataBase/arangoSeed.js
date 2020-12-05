// arangodb seeding sample

const collection = db.collection(collectionName);
const trx = db.transaction(transactionId);

// INSTEAD: Always perform a single operation per step:
await trx.step(() => collection.save(doc1));
await trx.step(() => collection.save(doc2));