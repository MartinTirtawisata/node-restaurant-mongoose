'use strict';

const monGoose = require('mongoose');

const restSchema = monGoose.Schema({
    name: {type: String, required: true},
    borough: {type: String, required: true},
    cuisine: {type: String, required: true},
    address: {
        building: String,
        coords: [String],
        street: String,
        zipcode: String
    },
    grades = [
        {
            date: Date,
            grade: String,
            score: Number
        }
    ]
});

restSchema.virtual("addressString").get(()=>{
    return `${this.address.building} ${this.address.street}, ${this.address.zipcode}`.trim();
});

restSchema.virtual('grade').get(()=>{
    const gradeObj = this.grades.sort((a, b) => {
        return b.date - a.date;
    })[0] || {};
    return gradeObj.grade;
});

restSchema.methods.serialize = function(){
    return {
        name: this.name,
        borough: this.borough,
        cuisine: this.cuisine,
        address: this.addressString,
        grades: this.grade
    }
}

const Rest = mongoose.model("restaurant", restSchema);

module.exports = { Rest };