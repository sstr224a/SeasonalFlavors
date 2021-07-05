// Full Documentation - https://www.turbo360.co/docs
const sqreen = require('sqreen');
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const bcrypt = require('bcryptjs');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);
const saltRounds = 10;
var bodyParser = require('body-parser');
const salt = bcrypt.genSaltSync(saltRounds);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = vertex.router()
const colors = require('colors');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
router.use(passport.initialize());
router.use(passport.session());
var flash=require("connect-flash");


//require('../auth-init.js');

router.get('/', (req, res) => {
    if(req.user)  req.user["items"]=[];
	res.render('index.mustache',{'user':req.user})

})

router.post('/submit-form', (req,res)=>{    
    req.app.locals.collection.insertOne({"Name":req.body.name,"email":req.body.email,"Subject":req.body.subject, "Message":req.body.msg}).catch(error=>{res.sendStatus(404); return;});
})

router.post('/booktable', (req,res)=>{

  req.app.locals.collection.createIndex({"date":1},{unique:true});
  req.app.locals.collection.createIndex({"email":1},{unique:true});
  req.app.locals.collection.insertOne({"no_people":req.body["chose-people"],"date":req.body["calender"],"time":req.body["chose-time"],"name":req.body["your-name"],"email":req.body["your-mail"], "phone":req.body["your-phone"],"notes":req.body["special-notes"]}).catch(error=>{ res.render('reservation-02',{"overbooked" : true, "booked":false}); return;}).then(result=>{res.render('reservation-02',{"booked" : true,"overbooked":false});});
})

router.get('/cart', (req, res) => {
    var quantity = 1;
    var exists = req.user["items"].find(item => item[0]===req.query.name)
    if(req.user["items"].length == 0 || !exists) req.user["items"].push([req.query.name,req.query.price,quantity]);
    if(exists) exists[2] += 1;
    //var product = element[1] * element[2]; console.log(product); element.push(product);
 	res.redirect("/shop-page.mustache")
})

router.get('/contact-us.mustache', (req, res) => {
	res.render('contact-us.mustache')
})

router.get('/contact', (req, res) => {
	res.render('contact-us.mustache')
})

router.get('/reservation-02.mustache', (req, res) => {
	res.render('reservation-02.mustache')
})

router.get('/reservation-02', (req, res) => {
	res.render('reservation-02.mustache')
})

router.get('/reservation-01.mustache', (req, res) => {
	res.render('reservation-02.mustache')
})

router.get('/menu-01.mustache', (req, res) => {
	res.render('menu-01.mustache')
})

router.get('/menu-01', (req, res) => {
	res.render('menu-01.mustache')
})

router.get('/menu-02.mustache', (req, res) => {
	res.render('menu-02.mustache')
})

router.get('/menu-03.mustache', (req, res) => {
	res.render('menu-03.mustache')
})


router.get('/SignUp.mustache', (req, res) => {
	res.render('SignUp.mustache')
})

router.get('/SignUp', (req, res) => {
	res.render('SignUp.mustache')
})

router.get('/blog-detail.mustache', (req, res) => {
	res.render('blog-detail.mustache')
})

router.get('/reply.mustache', (req, res) => {
	res.render('reply.mustache')
})

router.get('/store.mustache', (req, res) => {
	res.render('store.mustache')
})

router.get('/blog-detail', (req, res) => {
	res.render('blog-detail.mustache')
})

router.get('/product-detail.mustache', (req, res) => {
	res.render('product-detail.mustache')
})

    
router.get('/shop-page.mustache', ensureAuthenticated, (req, res) => {
	res.render('shop-page.mustache')
})

router.get('/shop-page', ensureAuthenticated, (req, res) => {
	res.render('shop-page.mustache',{"user":req.user})
})

router.get('/shop-page2.mustache', (req, res) => {
	res.render('shop-page2.mustache')
})

router.get('/fresh_products.mustache', (req, res) => {
	res.render('fresh_products.mustache')
})
router.get('/Dessert_recipes.mustache', (req, res) => {
	res.render('Dessert_recipes.mustache')
})

router.get('/shopping-cart.mustache', (req, res) => {
    req.user["items"].forEach(element => {var product = element[1] * element[2]; element.push(product);})
    var sum=0;
    for(var i=0; i< req.user["items"].length;i++){
      var product = parseInt(req.user["items"][i][3]);
      sum = sum + product;
    
     }
    req.user.total  = sum;
    console.log(req.user)
  	res.render('shopping-cart.mustache',{"user": req.user})
})

router.post('/shop-form', (req,res)=>{ 
    console.log(req.body);
    //req.app.locals.collection3.insertOne({"product_1":req.body.num-product[0],"Coupon_Code":req.body["your-coupon"]})
    req.app.locals.collection3.findOne({"Coupon_Code":req.body["your-coupon"]}).catch(error=>{ res.render('shopping-cart.mustache',{"invalid" : true, "valid":false}); return;}).then(result=>{res.render('shopping-cart.mustache',{"valid" : true,"invalid":false});}).then(result=>{res.render('check-out.mustache')})
})

router.post('/coupon-form', (req, res) => {
	console.log(req.body)
    console.log("here")
    req.app.locals.collection3.insertOne({"product_1":req.body["num-product"],"Coupon_Code":req.body["your-coupon"],"city":req.body[your-city],"state":req.body[your-state],"pin":req.body[your-pin]});
})


router.get('/check-out', (req, res) => {
	res.render('check-out.mustache')
})

router.get('/check-out.mustache', (req, res) => {
	res.render('check-out.mustache',{"user":req.user,"checkout":true})
})

router.get('/product-detail', (req, res) => {
	res.render('product-detail.mustache')
})

router.get('/about-us.mustache', (req, res) => {
	res.render('about-us.mustache')
})

router.get('/about-us', (req, res) => {
	res.render('about-us.mustache')
})

router.get('/blog-list-with-sidebar-01.mustache',(req, res)=> {
    res.render('blog-list-with-sidebar-01.mustache');
  })

router.get('/blog-list-with-sidebar-01',(req, res)=> {
    res.render('blog-list-with-sidebar-01.mustache');
  })

router.get('/vegan_blog_responsive.mustache', (req, res) => {
	res.render('vegan_blog_responsive.mustache')
})

router.get('/vegan_snack_new.mustache', (req, res) => {
	res.render('vegan_snack_new.mustache')
})

router.get('/cookie.mustache',(req, res)=> {
    res.render('cookie.mustache');
  })

router.get('/butter-tart.mustache',(req, res)=> {
    res.render('butter-tart.mustache');
  })

router.get('/birthday-cake.mustache',(req, res)=> {
    res.render('birthday-cake.mustache');
  })

router.get('/food_blog.mustache',(req, res)=> {
    res.render('food_blog.mustache');
  })

router.get('/result',(req, res)=> {
    res.render('result');
  })

router.get('/deli-accoustics.mustache',(req, res)=> {
    res.render('deli-accoustics.mustache');
  })

router.get('/jazz.mustache',(req, res)=> {
    res.render('jazz.mustache');
  })

router.get('/Mothersday.mustache',(req, res)=> {
    res.render('Mothersday.mustache');
  })

router.post('/searchval', function(req, res) {
    console.log(req.body.searchval)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Font', 'Helvetica');
    res.setHeader('Color', 'Red');
    req.app.locals.collection2.findOne({"keyword":req.body.searchval}).catch(error=>{res.sendStatus(404); return;}).then(result=>{console.log( result) , res.send(result)});
    //var temp= console.log(result);
    //res.render('/searchval', {items : 'desc'});
     //res.send(temp);   
        
        //.catch(error=>{res.sendStatus(404); return;});
   // resultArr.push(doc);
    //console.log("desc" + res.json.doc);
})


router.get('/blog-list-with-sidebar-02.mustache', (req, res) => {
	res.render('blog-list-with-sidebar-02.mustache')
})

router.get('/american_restaurant.mustache', (req, res) => {
	res.render('american_restaurant.mustache')
})

router.get('/healthy_diet.mustache', (req, res) => {
	res.render('healthy_diet.mustache')
})

router.get('/salad_recipes.mustache', (req, res) => {
	res.render('salad_recipes.mustache')
})

router.get('/food_tips.mustache', (req, res) => {
	res.render('food_tips.mustache')
})

router.get('/Dessert_recipes.mustache', (req, res) => {
	res.render('Dessert_recipes.mustache')
})


router.get('/blog-mansory.mustache', (req, res) => {
	res.render('blog-mansory.mustache')
})

router.get('/shopping-cart.mustache', (req, res) => {
	res.render('shopping-cart.mustache')
})

router.get('/index.mustache', (req, res) => {
	res.render('index.mustache')
})

router.get('/index', (req, res) => {
	res.render('index.mustache')
})

router.get('/', (req, res) => {
	res.render('index.mustache')
})

router.get('/appetizer.mustache', (req, res) => {
	res.render('appetizer.mustache')
})

router.get('/mainmeal.mustache', (req, res) => {
	res.render('mainmeal.mustache')
})

router.get('/desserts.mustache', (req, res) => {
	res.render('desserts.mustache')
})

router.get('/drinks.mustache', (req, res) => {
	res.render('drinks.mustache')
})

router.get('/vegan_snack_new2.mustache', (req, res) => {
	res.render('vegan_snack_new2.mustache')
})

router.get('/vegan_snack_new3.mustache', (req, res) => {
	res.render('vegan_snack_new3.mustache')
})

router.get('/vegan_meal_01.mustache', (req, res) => {
	res.render('vegan_meal_01.mustache')
})

router.get('/vegan_meal_02.mustache', (req, res) => {
	res.render('vegan_meal_02.mustache')
})

router.get('/vegan_meal_03.mustache', (req, res) => {
	res.render('vegan_meal_03.mustache')
})

router.get('/vegan_dessert_01.mustache', (req, res) => {
	res.render('vegan_dessert_03.mustache')
})

router.get('/vegan_dessert_02.mustache', (req, res) => {
	res.render('vegan_dessert_02.mustache')
})

router.get('/vegan_dessert_03.mustache', (req, res) => {
	res.render('vegan_dessert_03.mustache')
})

router.get('/american_rest_1.mustache', (req, res) => {
	res.render('american_rest_1.mustache')
})

router.get('/american_rest_2.mustache', (req, res) => {
	res.render('american_rest_2.mustache')
})

router.get('/american_rest_3.mustache', (req, res) => {
	res.render('american_rest_3.mustache')
})

router.get('/tex_mex_01.mustache', (req, res) => {
	res.render('tex_mex_01.mustache')
})

router.get('/tex_mex_02.mustache', (req, res) => {
	res.render('tex_mex_02.mustache')
})

router.get('/tex_mex_03.mustache', (req, res) => {
	res.render('tex_mex_03.mustache')
})

router.get('/steakhouse_1.mustache', (req, res) => {
	res.render('steakhouse_1.mustache')
})

router.get('/steakhouse_2.mustache', (req, res) => {
	res.render('steakhouse_2.mustache')
})

router.get('/salad_1.mustache', (req, res) => {
	res.render('salad_1.mustache')
})
router.get('/salad_2.mustache', (req, res) => {
	res.render('salad_2.mustache')
})

router.get('/salad_3.mustache', (req, res) => {
	res.render('salad_3.mustache')
})

router.get('/salad_4.mustache', (req, res) => {
	res.render('salad_3.mustache')
})

router.get('/salad_5.mustache', (req, res) => {
	res.render('salad_5.mustache')
})

router.get('/salad_6.mustache', (req, res) => {
	res.render('salad_6.mustache')
})

router.get('/salad_7.mustache', (req, res) => {
	res.render('salad_7.mustache')
})

router.get('/salad_8.mustache', (req, res) => {
	res.render('salad_8.mustache')
})

router.get('/food_tips.mustache', (req, res) => {
	res.render('food_tips.mustache')
})

router.get('/food_tip_1.mustache', (req, res) => {
	res.render('food_tip_1.mustache')
})

router.get('/food_tip_2.mustache', (req, res) => {
	res.render('food_tip_2.mustache')
})
router.get('/food_tip_3.mustache', (req, res) => {
	res.render('food_tip_3.mustache')
})
router.get('/food_tip_4.mustache', (req, res) => {
	res.render('food_tip_4.mustache')
})
router.get('/food_tip_5.mustache', (req, res) => {
	res.render('food_tip_5.mustache')
})
router.get('/food_tip_6.mustache', (req, res) => {
	res.render('food_tip_6.mustache')
})
router.get('/food_tip_7.mustache', (req, res) => {
	res.render('food_tip_7.mustache')
})
router.get('/food_tip_8.mustache', (req, res) => {
	res.render('food_tip_8.mustache')
})
router.get('/food_tip_9.mustache', (req, res) => {
	res.render('food_tip_9.mustache')
})

router.get('/blog-list-with-sidebar-01.mustache', (req, res) => {
	res.render('blog-list-with-sidebar-01.mustache')
})

router.get('/blog-list-with-sidebar-02.mustache', (req, res) => {
	res.render('blog-list-with-sidebar-02.mustache')
})

router.post('/SignUp', (req, res) => {
    const saltRounds = 10; 
     req.app.locals.collection1.createIndex({"mail":1},{unique:true});
     bcrypt.hash(req.body.password, saltRounds).then(async hash=>{
      req.app.locals.collection1.insertOne({"mail":req.body.email,"phone": req.body.phone,"password":hash})
     }).catch(result=>{res.render('SignUp.mustache',{"userExists": true, "signUp" : false}); return;})
      .then(result=>{ res.render('SignUp.mustache',{"signUp": true, "userExists": false}); });
	//res.render('userlogin.mustache')
})


router.get("/login/error",(req,res)=>{
     res.render("userlogin.mustache",{"req":req,"success":"","error":true});
    });

router.get("/login/success",(req,res)=>{
     res.render("userlogin.mustache",{"req":req,"success":"Login successful","error":false});
    });


 

passport.use(new LocalStrategy({passReqToCallback: true},
  async function(req,username, password, done) {
     var user  = await req.app.locals.collection1.findOne({"mail":username});
     if(!user) return done(null,false);
      bcrypt.compare(password, user.password).then(result=>{
        if (result == true) {   return done(null, user);   }
        else return done(null, false)})
     }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
 
  done(null, user);
});


router.post('/userform', passport.authenticate('local', { successRedirect: '/',
                               failureRedirect: '/login/abc'}));



router.get('/userlogin.mustache', function(req, res) {
	res.render('userlogin.mustache', {"req":req,"success":"","error":false});
})

router.get('/userlogin', function(req, res) {
	res.render('userlogin.mustache', {"req":req,"success":"","error":false});
})


router.get('/check-out', (req, res) => {
	res.render('check-out.mustache')
})

/*
router.get('/check-out.mustache', (req, res) => {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('check-out.mustache', {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data)
      })
    }
  })
})
*/

router.post('/check-out', (req,res) => {
    console.log(req.body);
    //req.app.locals.collection.createIndex({"date":1},{unique:true});
  //req.app.locals.collection.createIndex({"email":1},{unique:true});
  req.app.locals.collection3.insertOne({"firstname":req.body["first-name"],"lastname":req.body["last-name"],"company":req.body["company"],"address":req.body["address"],"suit":req.body["suit"], "phone":req.body["your-phone"],"notes":req.body["special-notes"],"postalcode":req.body["postcode"], "card_number":req.body["card-number"],"expiry":req.body["expiry"],"card_code":req.body["card-code"] })
 res.render("index.mustache",{"user":req.user,"checkout":true})
      //.catch(error=>{ res.render('check-out.mustache',{"overbooked" : true, "booked":false}); return;}).then(result=>{res.render('check-out.mustache',{"booked" : true,"overbooked":false});});
})


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/userlogin')
}

module.exports = router;

