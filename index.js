const express = require('express');
const db = require('./config/mongooseConfig')
const port = 5000;
const ejs = require('ejs')
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./assests'))
app.use('/', require('./routes/index'));

app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(port, (err)=>{
	if(err){console.log(`error in running in ${port}`)}
	console.log(`app running on port ${port}`);
})