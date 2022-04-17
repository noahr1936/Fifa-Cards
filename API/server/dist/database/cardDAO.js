"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardDAO = void 0;
require("dotenv").config();
const mysql2_1 = __importDefault(require("mysql2"));
const util = __importStar(require("util"));
const Card_1 = __importDefault(require("../model/Card"));
//Connection pool is created for connections to utilize so the database doesnt repeatedly have to be connected to
const pool = mysql2_1.default.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
class cardDAO {
    /**
     * Takes in a card and opens up a database connection to enter in a card. Will check the response variable and send back
     * response. Completes asynchronously and logs errors
     * @param card Cards details are used to create card
     * @param callback Returns the database response of either a insertID or null
     */
    createCard(card, callback) {
        pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err)
                    throw err;
            }
            catch (error) {
                console.log(error);
                callback(0);
                return;
            }
            let sql = "INSERT INTO card(ID, LAST_NAME, COUNTRY, TEAM, POSITION, RATING) VALUES(?,?,?,?,?,?)";
            try {
                connection.query = util.promisify(connection.query);
                var result = yield connection.query(sql, [
                    0,
                    card.$last_name,
                    card.$country,
                    card.$team,
                    card.$position,
                    card.$rating,
                ]);
                // console.log(result);
                if (result.insertId == 0)
                    callback(null);
                else
                    callback(result.insertId);
            }
            catch (error) {
                console.log(error);
                callback(0);
            }
        }));
    }
    /**
     * Takes id number. Opens up database connection and removes card at the specified id number. Will catch errors and
     * return response to user.
     * @param id Uses id to specify card to be removed
     * @param callback Callback sends database response of positive number or null
     */
    removeCard(id, callback) {
        pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err)
                    throw err;
            }
            catch (error) {
                console.log(error);
                callback(0);
                return;
            }
            let sql = "DELETE FROM card WHERE ID = ?";
            try {
                connection.query = util.promisify(connection.query);
                var result = yield connection.query(sql, [id]);
                // console.log(result);
                if (result.affectedRows == 0)
                    callback(null);
                else
                    callback(result.affectedRows);
            }
            catch (error) {
                console.log(error);
                callback(0);
            }
        }));
    }
    /**
     * Opens up database connection and uses the id associated with the card to update the rest of the details
     * @param card Takes card details to update in database
     * @param callback Sends back response of positive number or null
     */
    updateCard(card, callback) {
        pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err)
                    throw err;
            }
            catch (error) {
                console.log(error);
                callback(null);
                return;
            }
            let sql = "UPDATE card SET LAST_NAME = ?, COUNTRY = ?, TEAM=?, POSITION = ?, RATING = ? WHERE ID = ?";
            // var cards: Card[]
            //
            try {
                connection.query = util.promisify(connection.query);
                var result = yield connection.query(sql, [
                    card.$last_name,
                    card.$country,
                    card.$team,
                    card.$position,
                    card.$rating,
                    card.$id,
                ]);
                console.log(result);
                if (result.affectedRows == 0)
                    callback(null);
                else
                    callback(result.affectedRows);
            }
            catch (error) {
                console.log(error);
                callback(null);
            }
        }));
    }
    findCard(id, callback) {
        pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err)
                    throw err;
            }
            catch (error) {
                console.log(error);
                callback(null);
                return;
            }
            let sql = "SELECT * FROM card WHERE ID = ?";
            try {
                connection.query = util.promisify(connection.query);
                var [result] = yield connection.query(sql, id);
                if (result === undefined) {
                    callback(null);
                    return;
                }
                else {
                    let card;
                    card = new Card_1.default(result.ID, result.LAST_NAME, result.COUNTRY, result.TEAM, result.POSITION, result.RATING);
                    callback(card);
                }
            }
            catch (error) {
                console.log(error);
                callback(null);
            }
        }));
    }
    /**
     * Opens up database connection and selects all cards from database table
     * @param callback Sends back a null response or array of cards
     */
    findAllCards(callback) {
        pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err)
                    throw err;
            }
            catch (error) {
                console.log(error);
                callback(null);
                return;
            }
            let sql = "SELECT * FROM card";
            // var cards: Card[]
            try {
                connection.query = util.promisify(connection.query);
                var result = yield connection.query(sql);
                if (result[0] == null) {
                    callback(null);
                    return;
                }
                else {
                    var cards = Array();
                    result.forEach((element) => {
                        cards.push(new Card_1.default(element.ID, element.LAST_NAME, element.COUNTRY, element.TEAM, element.POSITION, element.RATING));
                    });
                    callback(cards);
                }
            }
            catch (error) {
                console.log(error);
                callback(null);
            }
        }));
    }
}
exports.cardDAO = cardDAO;
