const mongoose = require('mongoose')

const rewardPoints = mongoose.Schema(
    {
        transactionID: {
            type: String,
            required: true
        },
        transactionType: {
            type: String,
            required: true
        },
        transactionDescription: {
            type: String,
            required: true
        },
        transactionDate: {
            type: Date,
            required: true
        },
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        accountID: {
            type: String,
            required: true
        },
        activityID: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const RewardPoints = mongoose.model('RewardPoints', rewardPointsSchema);

module.exports = RewardPoints;