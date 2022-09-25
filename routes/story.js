const router = require('express').Router();
const User = require('../models/User');
const logger = require('../helper/logger');
const verifyToken = require('../helper/verifyToken');
const Story = require('../models/Story');
const Registration = require('../models/Registration');
const EventStory = require('../models/EventStory');


router.post('/add', verifyToken, async (req, res) => {

    //get email from req
    const data = req.body;

    // console.log("data...", data.registration.events);
    // console.log("data", title);
    let reg;
    let evenArr = []

    if (data.registration) {

        if (data.registration.events) {
            for (let aa in data.registration.events) {
                let even = new EventStory({
                    title: data.registration.events[aa].title,
                    regisrationStatus: data.registration.events[aa].regisrationStatus,
                    startDateTime: data.registration.events[aa].startDateTime,
                    endDateTime: data.registration.events[aa].endDateTime,
                    topics: data.registration.events[aa].topics,
                    host: data.registration.events[aa].host,
                    coach: data.registration.events[aa].coach,
                    link: data.registration.events[aa].link,
                })
                evenArr.push(even)
            }

            try {
                evenArr.forEach(async function (element) {
                    await element.save();
                });
                logger.customLogger.log('info', `event Added`);

            } catch (error) {
                logger.customLogger.log('error', `error while adding event...${error}`);
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
        },
        aditionalDetails: {
            lable: data.aditionalDetails.lable,
            points: data.aditionalDetails.points,
        }
    });

    // console.log("Reggg", reg)
    storyData.registration.push(reg)

    try {
        const savedData = await storyData.save();
        logger.customLogger.log('info', `user created`);
        res.status(200).send(savedData);

    } catch (error) {
        logger.customLogger.log('error', `error while adding story...${error}`);
        res.status(400).send(error)
    }

})




router.post('/findbyfilter', verifyToken, async (req, res) => {
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