import express from "express";
import {
    getSession, postSession
} from "./apiController.js";

const route = express.Router();

route.route('/session/:id').get(getSession).post(postSession);

export default route;