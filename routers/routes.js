const express = require('express')
const fs = require('fs')

const router = express.Router();

const saveUserData = (data) => {
    console.log(data)
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}

const getUserData = () => {
    const jsonData = fs.readFileSync('users.json')
    return JSON.parse(jsonData)    
}


router.post('/add', (req, res) => {
    var data = req.body.data
    console.log(data)
    var existing = getUserData()
    existing.push(data)
    saveUserData(existing)
    res.send({success: true, message: "User Added Successfully! "})    
})

router.get('/all', (req, res) => {
    const rec = getUserData();
    res.send(rec)
})

router.delete('/delete/:name', (req, res) => {
    const name = req.params.name
    const existing = getUserData()
    const filter = existing.filter( user => user.name !== name )
    saveUserData(filter)
    res.send({success: true, message: "User Deleted Successfully! "})
})

module.exports = router