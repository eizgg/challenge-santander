const express = require('express');

const app = express();

const port =5000;

app.listen(port, ()=>console.log(`server started on port${port}`));


app.post('/api/cervezas',(req,res) =>{
const cervezas=[{id: 1, firstName: 'john'}]
    res.json(cervezas)
})