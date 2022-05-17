const mongoose = require('mongoose');
const PostSchema = require('./schemas/post');
const connect = require('../dbconfig.json');

//미들웨어에서 데이터 처리할때 앞으로 사용할 이름 => Post
const Post = mongoose.model('Post', PostSchema);

const url = 'mongodb://' + connect.username + ':' + connect.password
    + '@' + connect.url + '/' + connect.dbname;


const dbconnect = () => {
    mongoose.connect(
        url,
        error => {
            if (error) {
                console.log("mongodb connect error", error);
            } else {
                console.log("mongodb-connect-success");
            }
        }
    );
};

mongoose.connection.on('error', error => {
    console.log('mongodb connection error', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('mongodb disconnected try reconnect....');
});

module.exports = {
  Post,
  dbconnect
}