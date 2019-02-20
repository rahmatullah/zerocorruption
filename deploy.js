const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const landModule = require('./models/land');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "view"));

mongoose.set('useCreateIndex', true);
mongoose.connection.openUri('mongodb://localhost:27017/land', { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log(
            "Error connecting database, please check if MongoDB is running."
        );
    } else {
        console.log("Connected to database...");
    }
});

web3 = new Web3( Web3.currentProvider || new Web3.providers.HttpProvider( "http://localhost:7545"));
//web3 = new Web3(ganache.provider());

//web3.setProvider(ganache.provider());

const inboxPath =  path.resolve(__dirname, 'contracts', 'test.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

compiledContracts = solc.compile(source);
landContract = compiledContracts.contracts[':Test'];
//console.log(landContract);
//return 0; 
bytecode = '0x' + landContract.bytecode;
abi = JSON.parse(landContract.interface);
//console.log(bytecode);
//return 0;
//tc = new web3.eth.contract(JSON.parse(JSON.stringify(abi)));

async function main(){
    // return 0;
    accounts = await web3.eth.getAccounts();
    
    //return 0;
    web3.eth.defaultAccount = accounts[1];
    address = web3.eth.defaultAccount;
    
    tc = await new web3.eth.Contract(JSON.parse(JSON.stringify(abi)) ).deploy({ data: bytecode }).send({from:address , gas: '1000000', value: '2000000000'} );
    
    await tc.methods.setDataToDb(2 ,2 , "Ahmad", "Khan").send({from: accounts[0]}).then(transaction => {
        landModule.create({land_id: 2, age: 2, first_name: "Ahmad", last_name: "Khan"}, (err, resp) => {
            if(err) {
                console.log(error);
            }
            else {
                console.log('adeedeeeee');
            }
        });
    });
    await tc.methods.GetValue(2).call().then( function( value ) { console.log( "Current Value: ", value ); } );
}

main();

// routes
app.get('/', (req, res) => {
    landModule.find({},(err, resp)=>{
        value = '';
        if(err){
            value = ''
            console.log(errr);
        }else{
            value = resp;
        }
        res.render('index',{ title: 'Hey', message: 'Hello there!', values:value})
    })
});

app.get('/showContent/:id', (req, res) => {
    landModule.findOne({land_id: req.params.id},(err, resp)=>{
        value = '';
        if(err){
            value = ''
            console.log(errr);
        }else{
            value = resp;
        }
        tc.methods.GetValue(req.params.id).call().then( function( val ) {
            res.render('details',{ value: value, ether: val })

         });
    })
});


app.post("/getLandById", (req, res) => {
    _id = parseInt(req.body._id);
    landModule.findOne({land_id: _id},(err, resp)=>{
        value = '';
        if(err){
            value = ''
            console.log(errr);
        }else{
            value = resp;
        }
        tc.methods.GetValue(_id).call().then( function( val ) {
            res.render('details',{ value: value, ether: val })

         });
    })
    /* tc.methods.GetValue(_id).call().then( function( value ) {
        //return res.status(200).json(value);
        res.render('index', { title: 'Hey', message: 'Hello there!', value: value })
    } ); */
    
});


app.post("/addLandOwner", (req, res) => {

    tc.methods.setDataToDb(
        req.body._id ,
        req.body.age , 
        req.body.firstname, 
        req.body.lastname).send({from: accounts[0]}).then(transaction => {
            landModule.create({land_id: req.body._id, age: req.body.age, first_name: req.body.firstname, last_name: req.body.lastname}, (err, resp) => {
                return res.status(200).json({blochai: transaction, database: resp});
            });
        
    });
    
});

//Set Port
const port = process.env.PORT || 8080;
app.set("port", port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));

return server;
//console.log(tc);
//tc.deploy({ data: bytecode }).send({ from: address, gas: 100000000 } );
//console.log(tc);
//console.log(abi);
