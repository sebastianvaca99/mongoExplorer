const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

function MongoUtils() {
    const url = "mongodb://localhost:27017/";
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    
    // Connect
    client
      .connect()
      .then(client =>
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

  mu.grades = {};

  mu.grades.find = query =>
    mu.connect().then(client => {
      const gradesCol = client.db(dbName).collection(colName);

      console.log("query", query);

      return gradesCol
        .find(query)
        .limit(20)
        .sort({ timestamp: -1 })
        .toArray()
        .finally(() => client.close());
    });

  mu.grades.findOneByID = id =>
    mu.connect().then(client => {
      const gradesCol = client.db(dbName).collection(colName);

      // when searching by id we need to create an ObjectID
      return gradesCol
        .findOne({ _id: new ObjectID(id) })
        .finally(() => client.close());
    });

  mu.grades.insert = grade =>
    mu.connect().then(client => {
      const gradesCol = client.db(dbName).collection(colName);

      return gradesCol.insertOne(grade).finally(() => client.close());
    });
  return mu;
}

module.exports = MongoUtils();
