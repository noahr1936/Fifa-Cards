/** Dependencies */
require("dotenv").config();
import express from "express";
import { cardDAO } from "./database/cardDAO";
import Card from "./model/Card";
import cors from "cors";

/** Create express and assign it to App */
const app = express();

/** Create database object for index */
const database = new cardDAO();

/** Used for parsing the json request bodys */
app.use(cors());
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(express.json());

/** Get calls the database and shows all cards in a json response
 * or a no cards found message
 */
app.get("/", (req, res) => {
    database.findAllCards((result: any) => {
        if (result == null) {
            console.log("Empty");

            //Both responses have status codes
            res.status(400).json({ message: "No cards found", code: 0 });
        } else {
            console.log("Not Empty");
            res.status(200).json(result);
        }
    });
});

app.get("/card/:id", (req, res) => {
    console.log("In GET /:id");

    let id = Number(req.params.id);
    database.findCard(id, (result: any) => {
        if (result == null)
            res.status(400).json({ message: "Card NOT found", code: 0 });
        else res.status(200).json({ code: 1, content: result });
    });
});

/** Post takes request body parameters and creates card to be put in database */
app.post("/", (req, res) => {
    //req body is put into detail variable
    var details = req.body;
    console.log(details);

    //checks to see if object has more than 4 variables ensuring all card attributes are entered
    if (Object.keys(req.body).length < 4) {
        console.log("Empty");
        res.json(405).json({ message: "No body entered", code: -1 });
    } else {
        //new card object is created with detials
        var card = new Card(
            0,
            details.last_name,
            details.country,
            details.team,
            details.position,
            details.rating
        );
        database.createCard(card, (result: any) => {
            if (result == null)
                res.status(400).json({ message: "Not Created", code: 0 });
            else
                res.status(200).json({
                    message: `Created with ID: ${result}`,
                    code: result,
                });
        });
    }
});

/** Delete takes id parameter and deletes card in database */
app.delete("/:id", (req, res) => {
    //req parameter that is passed into url is turned into number
    let id = Number(req.params.id);

    database.removeCard(id, (result: any) => {
        if (result == null)
            res.status(400).json({ message: "Card NOT deleted", code: 0 });
        else res.status(200).json({ message: "Card Deleted", code: result });
    });
});

/** Put takes request body parameters to update card in database */
app.put("/", (req, res) => {
    //details is assigned the request body
    var details = req.body;
    console.log(details);

    //checks for appropriate amount of variables for card object
    if (Object.keys(req.body).length < 4) {
        console.log("Empty");
        res.json(405).json({ message: "No body entered" });
    } else {
        //creates new card object with request body parameters
        var card = new Card(
            details.id,
            details.last_name,
            details.country,
            details.team,
            details.position,
            details.rating
        );
        database.updateCard(card, (result: any) => {
            if (result == null)
                res.status(400).json({ message: "Card NOT Updated", code: 0 });
            else
                res.status(200).json({ message: "Card Updated", code: result });
        });
    }
});

/** listen turns on server and listens to the .env port */
app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`App listening on port ${process.env.EXPRESS_PORT}`);
});
