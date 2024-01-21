const express = require('express')
const router = express.Router()
const {
    getSingle,
    getAll,
    createNew,
    deleteSinle,
    updateDocument,
    createGrade,
    getByUnit
} = require('./question.controller')



//Get all 
router.get('/',getAll) 

//Get a single document
router.get('/:id',getSingle)

//Get a by unit id
router.get('/byunit/:unitID',getByUnit)

//POST a new document
router.post('/', createNew)

//Delete a  document
router.delete('/:id', deleteSinle)

//Update a document
router.patch('/:id',updateDocument)


module.exports = router;