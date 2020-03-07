const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {};
  (user = "vaca3245"), (password = "vaca2299"), (dbName = ""), (colName = "");

  mu.connect = () => {
    const client = new MongoClient(
      `mongodb+srv://${user}:${password}@cluster0-3mnil.mongodb.net/test?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true
      }
    );
    return client.connect();
  };

  mu.databases = {};

  mu.databases.listDatabases = () =>
    mu.connect().then(client => {
      return client
        .db()
        .admin()
        .listDatabases() // Returns a promise that will resolve to the list of databases
        .finally(() => client.close());
    });

  mu.databases.listcollections = dbName =>
    mu.connect().then(client => {
      return client
        .db(dbName)
        .listCollections()
        .toArray() // Returns a promise that will resolve to the list of the collections
        .finally(() => client.close());
    });

  mu.databases.find = (dbName, colName) =>
    mu.connect().then(client => {
      return client
        .db(dbName)
        .collection(colName)
        .find()
        .limit(20)
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close());
    });

  mu.databases.insert = (dbName, colName, item) =>
    mu.connect().then(client => {
      return client
        .db(dbName)
        .collection(colName)
        .insertOne(item)
        .finally(() => client.close());
    });

  return mu;
}
module.exports = MongoUtils();
