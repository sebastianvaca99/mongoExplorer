const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {};

  mu.databases = {};

  mu.databases.listDatabases = () => {
    const url = "mongodb://localhost:27017/";
    const client = new MongoClient(url, { useUnifiedTopology: true });
    // Connect
    return client.connect()
      .then(
        client =>
          client
            .db()
            .admin()
            .listDatabases() // Returns a promise that will resolve to the list of databases
      )
      .then(dbs => {
        console.log("Mongo databases", dbs);
      })
      .finally(() => client.close());
  };

  mu.databases.listcollections = (datab) => {
    const url = "mongodb://localhost:27017/";
    const client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect
    mu.client
      .connect()
      .then(
        client =>
          client
            .db()
            .admin()
            .listDatabases() // Returns a promise that will resolve to the list of databases
      )
      .then(dbs => {
        console.log("Mongo databases", dbs);
      })
      .finally(() => client.close());
  };
}
module.exports = MongoUtils();
