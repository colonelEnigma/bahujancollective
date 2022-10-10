const router = require('express').Router();
const User = require('../models/User');
const logger = require('../helper/logger');
const verifyToken = require('../helper/verifyToken');
const Story = require('../models/Story');
const Registration = require('../models/Registration');
const EventStory = require('../models/EventStory');
const { default: mongoose } = require('mongoose');
const AdditionalDetails = require('../models/AdditionalDetails');


router.post('/add', verifyToken, async (req, res) => {
    const data = req.body;
    let reg;
    let evenArr = []
    let addDetails;

    if (data.registration) {
        if (data.registration.events) {
            for (let aa in data.registration.events) {
                let obj = new Object({
                    title: data.registration.events[aa].title,
                    regisrationStatus: data.registration.events[aa].regisrationStatus,
                    startDateTime: data.registration.events[aa].startDateTime,
                    endDateTime: data.registration.events[aa].endDateTime,
                    topics: data.registration.events[aa].topics,
                    host: data.registration.events[aa].host,
                    coach: data.registration.events[aa].coach,
                    link: data.registration.events[aa].link,
                })
                evenArr.push(obj)
            }
        }

        reg = new Registration({
            title: data.registration.title,
            events: evenArr
        })

        try {
            await reg.save();
            logger.customLogger.log('info', `registration Added `);
        } catch (error) {
            logger.customLogger.log('error', `error while adding registration...${error}`);
            // res.status(400).send(error)
        }
    }

    if (data.aditionalDetails) {
        addDetails = new AdditionalDetails({
            lable: data.aditionalDetails.lable,
            points: data.aditionalDetails.points,
        })

        try {
            await addDetails.save();
            logger.customLogger.log('info', `additional details Added `);
        } catch (error) {
            logger.customLogger.log('error', `error while adding additonal details...${error}`);
            // res.status(400).send(error)
        }
    }





    const storyData = new Story({
        title: data.title,
        subtitle: data.subtitle,
        about: {
            title: data.about.title,
            description: data.about.description,
            startDate: data.about.startDate,
            endDate: data.about.endDate,
            subDescription: data.about.subDescription,
            note: data.about.note,
        }
    });

    // console.log("Reggg", reg)
    storyData.registration.push(reg);
    storyData.aditionalDetails.push(addDetails);

    try {
        const savedData = await storyData.save();
        logger.customLogger.log('info', `story created`);
        res.status(200).send(savedData._id);

    } catch (error) {
        logger.customLogger.log('error', `error while adding story...${error}`);
        res.status(400).send(error)
    }

})




router.get('/findbyfilter', verifyToken, async (req, res) => {
    const data = req.body;
    var filter = "";
    var filterVal = "";

    for (var key of Object.keys(data)) {
        filter = key;
        filterVal = data[key]
    }

    try {
        var query = Story.find();
        query.where(filter).equals(filterVal);
        query.exec(function (err, resp) {
            if (resp) {
                console.log("resp..", resp);
                res.status(200).send(resp);
                logger.customLogger.log('info', `fetched all stories for ${filter} as ${filterVal}`);
            } else {
                logger.customLogger.log('error', `error while fetching story...${error}`);
                res.status(400).send(err)
            }
        })

    } catch (error) {
        logger.customLogger.log('error', `error while fetching story...${error}`);
        res.status(400).send(error)
    }

})

router.get('/findall', verifyToken, async (req, res) => {
    try {
        const docs = await Story.find({});
        logger.customLogger.log('info', `fetched all stories`);
        res.status(200).send(docs);

    } catch (error) {
        logger.customLogger.log('error', `error while fetching all stories...${error}`);
        res.status(400).send(error)
    }
})


/**
 * story find by ID
 */
router.get('/findbyid', verifyToken, async (req, res) => {
    try {
        const docs = await Story.findById(req.query.id).exec();
        logger.customLogger.log('info', `fetched stories by id`);
        res.status(200).send(docs);
    } catch (error) {
        logger.customLogger.log('error', `error while fetching all stories...${error}`);
        res.status(400).send(error)
    }
})


/**
 * get registration details
 */
router.get('/reg/regDetails', verifyToken, async (req, res) => {
    try {
        const docs = await Registration.findById(req.query.id).exec();
        logger.customLogger.log('info', `fetched reg details of story.. ${req.query.id}`);
        res.status(200).send(docs);

    } catch (error) {
        logger.customLogger.log('error', `error while fetching reg details of story...${error}`);
        res.status(400).send(error)
    }
})


/**
 * get additonal details
 */
 router.get('/reg/additionalDetails', verifyToken, async (req, res) => {
    try {
        const docs = await AdditionalDetails.findById(req.query.id).exec();
        logger.customLogger.log('info', `fetched reg details of story.. ${req.query.id}`);
        res.status(200).send(docs);

    } catch (error) {
        logger.customLogger.log('error', `error while fetching reg details of story...${error}`);
        res.status(400).send(error)
    }
})




router.delete('/delete', verifyToken, async (req, res) => {
    try {
        var ifIdExist = await Story.findById(req.body.id);
        if (ifIdExist) {
            var query = await Story.deleteOne({ _id: req.body.id });
            res.status(200).send(query);
            logger.customLogger.log('info', `deleting story for ${req.body.id}`);
        }
        else {
            logger.customLogger.log('error', `error while deleting story..for.${req.body.id}`);
            res.status(404).send(`${req.body.id} not found`);
        }

    } catch (error) {
        logger.customLogger.log('error', `error while deleting story for id ${req.body.id}...${error}`);
        res.status(400).send(error)
    }
})


module.exports = router;