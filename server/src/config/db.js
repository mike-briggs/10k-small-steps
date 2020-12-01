const mongoose = require("mongoose");
module.exports = function (app){
    mongoose.connect("mongodb+srv://admin:10kc-mongo-admin@cluster0.ohiqs.mongodb.net/photo-sharing?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser:true,
        useFindAndModify:false,

    })
    .then(connection => console.log("Application is connected to DB"))
    .catch(err => console.log(err));
    
    mongoose.Promise = global.Promise;

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);

    if(app) {
        app.set("mongoose", mongoose);
    }
};

function cleanup(){
    mongoose.connection.close(function () {
        process.exit(0);
    });
}