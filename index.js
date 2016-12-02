var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var config = require('./config.js');
//Need to enter username and password for your database
var connString = "postgres://postgres:"+config.PWD+"@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());


//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    db.user_create_seed(function(){
    });
    db.vehicle_create_seed(function(){
    });
})

  /////////////////////////////////
  //            CREATE           //
  /////////////////////////////////

app.post('/api/users', function(req, res){
  var slot = req.body;
  db.user_create_seed([slot.firstname, slot.lastname, slot.email], function(err, result){
    res.json(result);
  })
});

app.post('/api/vehicles', function(req, res){
  var slot = req.body;
  db.vehicle_create_seed([slot.make, slot.model, slot.year, slot.ownerId], function(err, result){
    res.json(result);
  })
});


  /////////////////////////////////
  //            GET              //
  /////////////////////////////////

app.get('/api/users', function(req, res){
  db.get_users(function(err, response){
    res.json(response);
  })
});

app.get('/api/vehicles', function(req, res){
  db.get_vehicles(function(err, response){
    res.json(response);
  })
})

app.get('/api/user/:userId/vehiclecount', function(req, res){
  var obj = {
    count: 0
  }
  db.get_vehicle_count_for_given_user([req.params.userId],function(err, response){
    for(var i = 0; i < response.length; i++){
      obj.count += 1;
    }
    res.json(obj);
  })
})

app.get('/api/user/:userId/vehicle', function(req, res){
  db.get_vehicles_for_specific_user([req.params.userId], function(err, response){
    res.status(200).json(response);
  })
})

app.get('/api/vehicle', function(req, res) {
    if (req.query.userFirstStart) {
        var slot = req.query.userFirstStart + '%';
        db.get_vehicle_by_first_name(slot, function(err, resp) {
                res.status(200).send(resp);
        });
    } else {
        db.get_vehicle_by_user_email(req.query.UserEmail, function(err, resp) {
                res.status(200).send(resp);
        });
    }
});


app.get('/api/newervehiclesbyyear', function(req, res){
  db.get_cars_by_year(function(err, response){
    res.status(200).json(response);
  })
})

  /////////////////////////////////
  //            PUT              //
  /////////////////////////////////

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res) {
    var vehicleId = parseInt(req.params.vehicleId);
    var userId = parseInt(req.params.userId);
    db.change_ownership(vehicleId, userId, function(err, resp) {
            res.status(200).send(resp);
    })
})

  /////////////////////////////////
  //           DELETE            //
  /////////////////////////////////

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res) {
    var vehicleId = parseInt(req.params.vehicleId);
    var userId = parseInt(req.params.userId);
    db.remove_ownership_vehicle(vehicleId, function(err, resp) {
            res.status(200).send(resp);
    })
})

app.delete('/api/vehicle/:vehicleId', function(req, res) {
    var id = parseInt(req.params.vehicleId);
    db.remove_vehicle(id, function(err, resp) {
            res.status(200).send(resp);
    })
})


  /////////////////////////////////
  //            PORT             //
  /////////////////////////////////
app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
