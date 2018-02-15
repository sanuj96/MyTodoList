var mongoose = require('mongoose');

var todoSchema = mongoose.Schema( {
	item: {
		type : String,
		required : true
	}
},
{
    versionKey: false // You should be aware of the outcome after set to false
});

var Todo = module.exports = mongoose.model('Todo',todoSchema);