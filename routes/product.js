var express = require('express');
var router = express.Router();
var fs = require('fs');
var products = JSON.parse(
fs.readFileSync('./data/products.json')
);

router.get('/',function(req,res,next){
    res.json(products);
});

router.get('/:id',function(req,res,next){
    res.json(products[req.params.id]);
});


router.get('/instock/:qt',function(req,res,next){
    var instock = [];
    for(var p in products){
        if(products[p]["stock"] >= req.params.qt){
            instock.push(products[p]);
        }
    }
    res.json(instock);
});

router.get('/:id/:qt',function(req,res,next){
    var prix_unit = products[req.params.id]["price"];
    res.json({
        "id": req.params.id,
        "prix_unit": prix_unit,
        "total_price": prix_unit * req.params.qt
    }
        );
});

module.exports = router;