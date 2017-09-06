
var Express = require("Express");
var BodyParser = require("Body-Parser");
var PouchDB = require("PouchDB");
var database = new PouchDB("http://127.0.0.1:5984/god");
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
//Get all documents
app.get("/god", function(req,res) {
  database.allDocs({include_docs: true}).then(function(result) {
    res.send(result.rows.map(function(item) {
      return item.doc;
      }));
  }, function(error) {
    res.status(400).send(error);
    });
});
//Get specific document
app.get("/god:id", function(req, res) {
  if(!req.params.id) {
    return res.status(400).send({"status": "error", "message": "An ´id´ is required"});
  }
  database.get(req.params.id).then(function(result) {
    res.send(result);
  }, function(error) {
    res.status(400).send(error);
    });
});
//Update a document
app.put("/god/:id", function(req, res) {
    if(!req.params.id) {
        return res.status(400).send({"status": "error", "message": "An `id` is required"});
    }

    database.get(req.params.id).then(function(result) {
        result.title = req.body.title;//change firstname and lastname
        database.put(result);//update the doc in db
        res.send(result);

    }, function(error) {
        res.status(400).send(error);
    });
});

//Add a document
app.post("/god", function(req, res) {

    database.post(req.body).then(function(result) {
        res.send(result);
    }, function(error) {
        res.status(400).send(error);
    });
});

//Delete a document
app.delete("/god", function(req, res) {
    if(!req.body.id) {
        return res.status(400).send({"status": "error", "message": "An `id` is required"});
    }
    database.get(req.body.id).then(function(result) {
        return database.remove(result);
    }).then(function(result) {
        res.send(result);
    }, function(error) {
        res.status(400).send(error);
    });
});

app.listen(3000);
