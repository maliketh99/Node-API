const express = require('express')
const mongoose = require('mongoose')
const RewardPoints = require('./models/rewardPointsModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.get('/rewardpoints', async(req, res) => {
    try {
        const rewardPoints = await RewardPoints.find({});
        res.status(200).json(rewardPoints);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/rewardpoints/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const rewardPoints = await RewardPoints.findById(id);
        res.status(200).json(rewardPoints);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/rewardpoints', async(req, res) => {
    try {
        const rewardPoints = await RewardPoints.create(req.body)
        res.status(200).json(rewardPoints);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a rewardpoints
app.put('/rewardpoints/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const rewardPoints = await RewardPoints.findByIdAndUpdate(id, req.body);
        // we cannot find any RewardPoints in database
        if(!rewardPoints){
            return res.status(404).json({message: `cannot find any rewardPoints with ID ${id}`})
        }
        const rewardPoints = await rewardPoints.findById(id);
        res.status(200).json(updatedRewardPoints);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a rewardPoints

app.delete('/rewardpoints/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const rewardPoints = await RewardPoints.findByIdAndDelete(id);
        if(!rewardPoints){
            return res.status(404).json({message: `cannot find any rewardPoints with ID ${id}`})
        }
        res.status(200).json(rewardPoints);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://admin:12345678Admin@devtaminapi.zpncstm.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})