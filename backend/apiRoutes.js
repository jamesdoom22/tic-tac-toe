import express from "express";
import {
    getSession
} from "./apiController.js";

const route = express.Router();

route.route('/session/:id').get(getSession);

// route.get('/getUserInfo/:email/:googleId/:name', getStats);
// route.get('/checkEmail/:email', check(['email']), getAdmin);


// // route.get('/testfunc', testfunc);
// // route.get('/testfunc', replace);
// route.get('/setting/:item', getSetting);
// route.patch('/setting/:item', patchSetting);

// route.post('/question', postQuestion);
// route.patch('/question/:_id', updateQuestion);
// route.delete('/question/:_id', deleteQuestion);

// route.get('/user/:item', getUser);
// route.post('/user', postUser);

// route.get('/googleLogin', googleLogin);

// //ONE TIME FUNCTIONS
// // route.get('/addAllQuestionToLive', addAllQuestionToLive);
// route.get('/decodeHTML', decodeHTML);

export default route;