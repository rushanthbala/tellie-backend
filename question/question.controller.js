//Workout Model imported
const defaultQuestionModel = require('./question.model')
const gradeModel = require('../grade/grade.model')
const subjectModel = require('../subject/subject.model')
const unitModel = require('../unit/unit.model')

const mongoose = require('mongoose')

// get all 
const getAll = async (req, res) => {
    const defaultQuestionModels = await defaultQuestionModel.find({}).sort({ createdAt: -1 })

    res.status(200).json(defaultQuestionModels)

}


// get a single 
const getSingle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Volunteer Job' })
    }
    const defaultQuestionModels = await defaultQuestionModel.findById(id)

    if (!defaultQuestionModels) {
        return res.status(404).json({ error: 'No Such Volunteer Job' })

    }
    res.status(200).json(defaultQuestionModels)
}

// get a by unit id 
const getByUnit = async (req, res) => {
    const { unitID } = req.params

    if (!mongoose.Types.ObjectId.isValid(unitID)) {
        return res.status(404).json({ error: 'No Such Volunteer Job' })
    }
    const defaultQuestionModels = await defaultQuestionModel.find({unitID:unitID})

    if (!defaultQuestionModels) {
        return res.status(404).json({ error: 'No Such Volunteer Job' })

    }
    res.status(200).json(defaultQuestionModels)
}

// create a new defaultQuestionModel
const createWithoutReqBodyCheck = async (req, res) => {
    //add doc to db
    try {
        const defaultQuestionModels = await defaultQuestionModel.create(req.body)
        res.status(200).json(defaultQuestionModels)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createNew = async (req, res) => {
    const { name } = req.body;

    try {
        // Check if a grade id is avalable or not
        const existingGrade = await gradeModel.findOne({ _id: req.body.gradeID });
        const existingSubject = await subjectModel.findOne({ _id: req.body.subjectID });
        const unitSubject = await unitModel.findOne({ _id: req.body.unitID });
        if (!existingGrade) {
            res.status(400).json({ error: 'Grade not found' })
            return;
        }
        if (!existingSubject) {
            res.status(400).json({ error: 'Subject not found' })
            return;
        }
        if (!unitSubject) {
            res.status(400).json({ error: 'Unit not found' })
            return;
        }
        // const existingName = await defaultQuestionModel.findOne({ name });

        // if (existingName) {
        //     return res.status(400).json({ error: 'A subject with the same name already exists' });
        // }

        // Create a new document
        const defaultQuestionModels = await defaultQuestionModel.create(req.body)
        res.status(200).json(defaultQuestionModels);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a defaultQuestionModel
const deleteSinle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Volunteer Job' })
    }
    const defaultQuestionModels = await defaultQuestionModel.findOneAndDelete({ _id: id })

    if (!defaultQuestionModels) {
        return res.status(400).json({ error: 'No Such Volunteer Job' })
    }

    res.status(200).json(defaultQuestionModels)

}


// update a workout
const updateDocument = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Workout' })
    }
    const defaultQuestionModels = await defaultQuestionModel.findByIdAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true })

    if (!defaultQuestionModels) {
        return res.status(400).json({ error: 'No Such Workout' })
    }

    res.status(200).json(defaultQuestionModels)

}

module.exports = {
    getSingle,
    getAll,
    createNew,
    deleteSinle,
    updateDocument, createWithoutReqBodyCheck,
    getByUnit
}

