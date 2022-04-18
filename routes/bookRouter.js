var dbConn = require('../dbconfig');
var express = require('express');
var bookrouter = express.Router();
console.log("we are in routes")



// get all books
bookrouter.get('/',(req , res)=>{
    const bookid = req.params.id
    const queryString = "SELECT * FROM book"
    dbConn.query(queryString, [bookid], (err, rows, fields) => {
        if (err) {
          console.log("Failed to query for book: " + err)
          res.sendStatus(500)
          return
          // throw err
        }
        console.log("I think we fetched users successfully")
    
        const books = rows.map((row) => {
          return {bookid:row.bookid ,name: row.name, year: row.year , author: row.author}
        })
        console.log("Fetching user with id: " + req.params.bookid)
        res.json(books)
      })
    })
module.exports = bookrouter;

//get by id 

bookrouter.get('/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const bookid = req.params.id
    const queryString = "SELECT * FROM book WHERE bookid = ?"
    dbConn.query(queryString, [bookid], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
        // throw err
      }
      console.log("I think we fetched users successfully")
  
      const books = rows.map((row) => {
        return {bookid:row.bookid ,name: row.name, year: row.year , author: row.author}
      })
  
      res.json(books)
    })
  
    // res.end()
  })


  // create a new book
  bookrouter.post('/:id' ,(req , res)=>{
    console.log("we are in post api "+req.body)
    console.log(req.body)
    const data={
        id:req.params.id,
        Name: req.body.name,
        Year:  req.body.year,
        Author: req.body.author
    }


    const queryString = "INSERT INTO book(bookid , name , year , author)values(?,?,?,?)"
    dbConn.query(queryString, Object.values(data), (err, rows, fields) => {
        if (err) {
          console.log("Failed to query for users: " + err)
          res.sendStatus(500)
        }
        else{
            res.json({status:"success", data:data})
        }
})
})


//put method


bookrouter.put('/:id',(req , res)=>{
    console.log("we are in put api ")
    console.log(req.body)
    const data={
        Name: req.body.name,
        Year:  req.body.year,
        Author: req.body.author,
        id:req.params.id
    }
      const queryString = "UPDATE book SET name=?, year=?, author=? where bookid = ?"
      dbConn.query(queryString, Object.values(data), (err, rows, fields) => {
          if (err) {
            console.log("Failed to query for books: " + err)
            res.sendStatus(500)    
          }
          else{
            console.log("I think we fetched books successfully")
            res.json({status:"success", data:data})
          }
        })
  
  
  })

  // delete method
  bookrouter.delete('/:id' ,(req , res)=>{
    console.log("we are in delete api "+req.params.id)
    const bookid = req.params.id
    const queryString = "delete FROM book where bookid =?"
    dbConn.query(queryString, [bookid], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
        // throw err
      }
    res.send("done")


})
})