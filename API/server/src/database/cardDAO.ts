require("dotenv").config();
import mysql2 from "mysql2";
import * as util from "util";
import Card from "../model/Card";

//Connection pool is created for connections to utilize so the database doesnt repeatedly have to be connected to
const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

export class cardDAO {
    /**
     * Takes in a card and opens up a database connection to enter in a card. Will check the response variable and send back
     * response. Completes asynchronously and logs errors
     * @param card Cards details are used to create card
     * @param callback Returns the database response of either a insertID or null
     */
    public createCard(card: Card, callback: any) {
        pool.getConnection(async (err: any, connection: any) => {
            try {
                if (err) throw err;
            } catch (error) {
                console.log(error);
                callback(0);
                return;
            }

            let sql =
                "INSERT INTO card(ID, LAST_NAME, COUNTRY, TEAM, POSITION, RATING) VALUES(?,?,?,?,?,?)";

            try {
                connection.query = util.promisify(connection.query);
                var result = await connection.query(sql, [
                    0,
                    card.$last_name,
                    card.$country,
                    card.$team,
                    card.$position,
                    card.$rating,
                ]);

                // console.log(result);

                if (result.insertId == 0) callback(null);
                else callback(result.insertId);
            } catch (error) {
                console.log(error);
                callback(0);
            }
        });
    }

    /**
     * Takes id number. Opens up database connection and removes card at the specified id number. Will catch errors and
     * return response to user.
     * @param id Uses id to specify card to be removed
     * @param callback Callback sends database response of positive number or null
     */
    public removeCard(id: number, callback: any) {
        pool.getConnection(async (err: any, connection: any) => {
            try {
                if (err) throw err;
            } catch (error) {
                console.log(error);
                callback(0);
                return;
            }

            let sql = "DELETE FROM card WHERE ID = ?";

            try {
                connection.query = util.promisify(connection.query);
                var result = await connection.query(sql, [id]);

                // console.log(result);
                if (result.affectedRows == 0) callback(null);
                else callback(result.affectedRows);
            } catch (error) {
                console.log(error);
                callback(0);
            }
        });
    }

    /**
     * Opens up database connection and uses the id associated with the card to update the rest of the details
     * @param card Takes card details to update in database
     * @param callback Sends back response of positive number or null
     */
    public updateCard(card: Card, callback: any) {
        pool.getConnection(async (err: any, connection: any) => {
            try {
                if (err) throw err;
            } catch (error) {
                console.log(error);
                callback(null);
                return;
            }

            let sql =
                "UPDATE card SET LAST_NAME = ?, COUNTRY = ?, TEAM=?, POSITION = ?, RATING = ? WHERE ID = ?";
            // var cards: Card[]
            //
            try {
                connection.query = util.promisify(connection.query);
                var result = await connection.query(sql, [
                    card.$last_name,
                    card.$country,
                    card.$team,
                    card.$position,
                    card.$rating,
                    card.$id,
                ]);

                console.log(result);

                if (result.affectedRows == 0) callback(null);
                else callback(result.affectedRows);
            } catch (error) {
                console.log(error);
                callback(null);
            }
        });
    }

    public findCard(id: number, callback: any) {
        pool.getConnection(async (err: any, connection: any) => {
            try {
                if (err) throw err;
            } catch (error) {
                console.log(error);
                callback(null);
                return;
            }

            let sql = "SELECT * FROM card WHERE ID = ?";

            try {
                connection.query = util.promisify(connection.query);
                var [result] = await connection.query(sql, id);

                if (result === undefined) {
                    callback(null);
                    return;
                } else {
                    let card;

                    card = new Card(
                        result.ID,
                        result.LAST_NAME,
                        result.COUNTRY,
                        result.TEAM,
                        result.POSITION,
                        result.RATING
                    );

                    callback(card);
                }
            } catch (error) {
                console.log(error);
                callback(null);
            }
        });
    }

    /**
     * Opens up database connection and selects all cards from database table
     * @param callback Sends back a null response or array of cards
     */
    public findAllCards(callback: any) {
        pool.getConnection(async (err: any, connection: any) => {
            try {
                if (err) throw err;
            } catch (error) {
                console.log(error);
                callback(null);
                return;
            }

            let sql = "SELECT * FROM card";
            // var cards: Card[]

            try {
                connection.query = util.promisify(connection.query);
                var result = await connection.query(sql);

                if (result[0] == null) {
                    callback(null);
                    return;
                } else {
                    var cards = Array();
                    result.forEach((element: any) => {
                        cards.push(
                            new Card(
                                element.ID,
                                element.LAST_NAME,
                                element.COUNTRY,
                                element.TEAM,
                                element.POSITION,
                                element.RATING
                            )
                        );
                    });

                    callback(cards);
                }
            } catch (error) {
                console.log(error);
                callback(null);
            }
        });
    }
}
