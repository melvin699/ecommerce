const port = 5000;
const express = require ("express");
const app = express();
const mongoose = require ("mongoose");
const jwt = require('jsonwebtoken');
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const bcrypt = require('bcrypt');
const paypal = require('paypal-rest-sdk');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const mpesa = require('mpesa-node');
const nodemailer = require('nodemailer');
const unirest = require('unirest');

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://bettmelvin:Mnelvin12pc!@cluster0.jc4fnmi.mongodb.net/price-pulse")


app.get("/",(req,res)=>{
    res.send("welcome to pricepulse Api")

})
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:  (req, file, cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer ({storage : storage});


app.use ('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=> {
    res.json({
        success: 1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})





function generateRandomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); 
}

const VoucherSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    discountPercentage: {
        type: Number,
        required: true
    }
});

const Voucher = mongoose.model('Voucher', VoucherSchema);

app.post('/validate-voucher', async (req, res) => {
    const { voucherCode } = req.body;
    try {
        const voucher = await Voucher.findOne({ code: voucherCode });
        if (!voucher) {
            return res.status(404).json({ error: 'Invalid voucher code' });
        }
        res.json({ success: true, discountPercentage: voucher.discountPercentage });
    } catch (error) {
        console.error('Error validating voucher:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/generate-vouchers', async (req, res) => {
    try {
        const code = generateRandomCode();

        const discountPercentage = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

        const newVoucher = new Voucher({
            code,
            discountPercentage,
        });

        await newVoucher.save();

        res.json({
            success: true,
            message: 'Voucher code generated successfully',
            voucher: {
                code: newVoucher.code,
                discountPercentage: newVoucher.discountPercentage
            }
        });
    } catch (error) {
        console.error('Error generating voucher code:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required:true,
    },
    old_price:{
        type: Number,
        required:true,
    },
    type: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
    },
    inStock: {
        type: Boolean,
        default: true, 
        required: true
    },
    quantityInStock: {
        type: Number,
        default: 0, 
        required: true
    },
})

app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        type: req.body.type,
    });
    console.log(product);
    await product.save();
    console.log('Product added successfully');
    res.json({
        success:true,
        name:req.body.name,
    })
})

app.post('/removeproduct', async (req, res) => {
    const { id } = req.body;
    try {
        await Product.findOneAndDelete({ id });
        console.log("Product removed successfully");
        res.json({
            success: true,
            id 
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
 });
 

//API for all_products
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("all products have been fetched");
    res.send(products);
})



const Users = mongoose.model('Users',{
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        unique : true ,  
    },
    password:{
        type:String,  
        required: true,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date, 
        default: Date.now(),
    }
})

//registration Endpoint 
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExist = await Users.findOne({ email });
        if (userExist) {
            return res.status(409).json("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        
        const confirmationToken = jwt.sign({ email }, 'confirmation_secret', { expiresIn: '1d' });

        const cart = {};
        for (let i = 0; i < 200; i++) {
            cart[i] = 0;
        }

        const user = new Users({
            name,
            email,
            password: hashedPassword,
            confirmationToken,
            cartData: cart,
        });

        await user.save();

         sendConfirmationEmail(email, confirmationToken);

        const token = jwt.sign({ userId: user._id }, 'secret_ecom');

        res.status(201).json({ success: true, token });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: "Invalid Data" });
    }


    async function sendConfirmationEmail(email, confirmationToken) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "infopricepulse@gmail.com",
                pass: "from imem phgo qemj"
            },
            secure: true, 
            tls: {
                rejectUnauthorized: false,
                minVersion: 'TLSv1.2' 
            }
        });
    
        const mailOptions = {
            from: "infopricepulse@gmail.com",
            to: email,
            subject: 'Confirm Your Email - PricePulse',
            html: `<p>Welcome to PRICEPULSE!</p>
                   <p>Please click <a href="http://localhost:3000/confirm/${confirmationToken}">here</a> to confirm your email address.</p>`
        };
    
        try {
            await transporter.sendMail(mailOptions);
            console.log('Confirmation email sent');
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            throw new Error('Email sending failed');
        }
    }
    
    module.exports = { sendConfirmationEmail };
});




app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide both email and password' });
        }

        const user = await Users.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        res.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

     //   endpoint for front page
    //  app.get('/newcollection',async(req,res)=>{
    //  let products = await  Product.find({}); 
    //  let newcollection = products.slice(1).slice(-8);
    //  console.log ("New collection",newcollection);
    //    res.send(newcollection)
    //   })

//middleware to fetch user

const fetchUser = async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"use a valid token"})
    }
    else{
        try{
            const data= jwt.verify(token,'secret_econ');
            req.user = data.user;
            next();

        }catch(error){
            res.status(201).send({errors:"authenticate using a valid token"})
 
        }
    }
}
// //Add to cart endpoint
// app.post('/addtocart',fetchUser,async(req,res)=>{
 
//     console.log("added",req.body.itemId);
//     let userData = await Users.findOne({_id:req.user.id});
//     userData.cartData[req.body.itemId]  += 1;
//     await Users.findOneAndUpdate({_id : req.user.id},{cartData:userData.cartData});
//      res.send("added to cart succesfully")
// })

//paypal intergration
paypal.configure({
    'mode': 'sandbox', 
    'client_id': 'Ad34TY65ANUAZn_Agef0vum_A7BfFBdQ3cMJ0ZdMZ44LrvJ0wDFhZ5ObYu1oJfqKwn4IB8PLLx6l9HMr',
    'client_secret': 'EJ7kQTatIFs0NomDWULf0gFjOzpwIycv1IsMdiDtCeYACs1nWmF0OR408Dx8lROcDte0lVP4LvY2imj7'
});
app.post('/createpayment', async (req, res) => {
    const paymentData = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: 'http://localhost:5000/execute-payment',
            cancel_url: 'http://localhost:5000/cancel-payment'
        },
        transactions: [{
            item_list: {
                items: [{
                    name: 'Product Name',
                    sku: '001',
                    price: '10.00',
                    currency: 'kes',
                    quantity: 1
                }]
            },
            amount: {
                currency: 'kes',
                total: '10.00'
            },
            description: 'Description of the payment'
        }]
    };

    try {
        const createPayment = await new Promise((resolve, reject) => {
            paypal.payment.create(paymentData, function (error, payment) {
                if (error) {
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        });
        res.json({ success: true, payment: createPayment });
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
app.get('/executepayment', async (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    try {
        const executePayment = await new Promise((resolve, reject) => {
            paypal.payment.execute(paymentId, { payer_id: payerId }, function (error, payment) {
                if (error) {
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        });
        res.redirect('/payment-success');
    } catch (error) {
        console.error('Error executing PayPal payment:', error);
        res.redirect('/payment-error');
    }
});

app.get('/cancelpayment', (req, res) => {
    res.redirect('/payment-cancelled');
});




app.post("/subscribe-newsletter", async (req, res) => {
    const { email } = req.body;
    try {
        const existingSubscriber = await NewsletterSubscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ error: 'Email already subscribed to newsletter' });
        }
        const newSubscriber = new NewsletterSubscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ success: true, message: 'Subscribed to newsletter successfully' });
        const confirmationToken = "someGeneratedToken";
        await sendConfirmationEmail(email, confirmationToken);
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/removefromcart',fetchUser,async(req,res)=>{
 
console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]  -= 1;
    await Users.findOneAndUpdate({_id : req.user.id},{cartData:userData.cartData});
     res.send("removed")
})


app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("cart data");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})



// Endpoint for processing M-Pesa payments
// async function mpesa(phone, amount, ordernum) {
//     // Callback URL
//     const CALLBACK_URL = 'https://example.co.ke/include/callback_url.php?orderid=';
  
//     // M-Pesa API credentials
//     const consumerKey = 'WBO40j0jMAthf4Go9hgjAPLr8BtSlnSd'; // Fill with your app Consumer Key
//     const consumerSecret = 'hGF79OCNOSeIPuaQ'; // Fill with your app Secret
//     const businessShortCode = '174379'; // Business short code
//     const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'; // Live passkey
  
//     // Prepare phone number
//     const formattedPhone = phone.replace(/^0/, '254').replace("+", "");
  
//     // Get the timestamp, format YYYYmmddhms -> 20181004151020
//     const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
  
//     // Generate password
//     const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64');
  
//     // Get access token
//     const accessTokenResponse = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`
//       }
//     });
//     const accessTokenData = await accessTokenResponse.json();
//     const accessToken = accessTokenData.access_token;
  
//     // Initiate transaction
//     const initiateResponse = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`
//       },
//       body: JSON.stringify({
//         BusinessShortCode: businessShortCode,
//         Password: password,
//         Timestamp: timestamp,
//         TransactionType: 'CustomerPayBillOnline', // CustomerBuyGoodsOnline
//         Amount: amount,
//         PartyA: formattedPhone,
//         PartyB: businessShortCode,
//         PhoneNumber: formattedPhone,
//         CallBackURL: CALLBACK_URL + ordernum,
//         AccountReference: ordernum,
//         TransactionDesc: 'Pay Order'
//       })
//     });
//     const initiateData = await initiateResponse.json();
//     const responseCode = initiateData.ResponseCode;
//     return responseCode;
//   }
  

 




// let ImageSchema=new mongoose.Schema({
//     name : String ,
//     image : String
// });

app.get("/popular",async(req,res)=>{
    let products= await Product.find({});
    let popular = products.slice(1).slice(-8);
    console.log("popular products fetched");
    res.send(popular);
})

app.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const results = await Product.find({ name: { $regex: query, $options: 'i' } });
        console.log('Search results:', results);
        res.json(results);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const MessageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    adminReply: {
        type: String,
        default: ''
    },
    userReplies: [
        {
        type: String,
        default: ''
      }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', MessageSchema);


app.post('/submit-message', async (req, res) => {
    const { userId, name, email, message } = req.body;

  let validUserId = userId;
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: 'Invalid userId' });
  }

    try {
        const newMessage = new Message({
            userId: validUserId,
            name,
            email,
            message
        });

        await newMessage.save();
        res.json({ success: true, message: 'Message submitted successfully' });
    } catch (error) {
        console.error('Error submitting message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().populate('userId', 'name email');
        res.json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/reply-message', async (req, res) => {
    const { messageId, adminReply } = req.body;

    try {
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        message.adminReply = adminReply;
        await message.save();

        res.json({ success: true, message: 'Reply sent successfully' });
    } catch (error) {
        console.error('Error replying to message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
app.post('/messages/:messageId/user-reply', async (req, res) => {
    const {messageId, userReply } = req.body;
  
    try {
      const message = await Message.findById(messageId);
      if (!message) {
        return res.status(404).json({ success: false, message: 'Message not found' });
      }
      message.userReplies .push(userReply);
      await message.save();
      res.json({ success: true, reply: message.userReply });
    } catch (error) {
      console.error('Error replying to message:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });


app.delete('/delete-message/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Message.findByIdAndDelete(id);
        res.json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});





app.listen (port,(error)=>{
    if (!error){
        console.log("Server Running on port"+port)
    }
    else{
        console.log("Error : "+error)
    }
})
