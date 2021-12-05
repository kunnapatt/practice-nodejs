const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async(req, res) => {
    // res.send('get all jobs')
    const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt")
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async(req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async(req, res) => {
    // res.json(req.user)
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
        // res.json(req.body)
    res.status(StatusCodes.CREATED).json({ job })
        // res.send('create job')
}

const updateJob = async(req, res) => {
    // res.send('update job')
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId },
    } = req
    // res.send('update job')

    if (company === '' || position === '') {
        throw new BadRequestError("Company or position fields cannot be empty")
    }

    const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async(req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req

    const job = await Job.findOneAndDelete({
        _id: jobId,
        createdBy: userId
    })

    if (!job) {
        throw new NotFoundError(`No job with id ${jobid}`)
    }

    res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}