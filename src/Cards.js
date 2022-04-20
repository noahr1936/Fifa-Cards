// import { stringify } from "querystring";
import { useEffect, useState } from "react"
import Card from "./Card";
import "./Cards.css"
import Navbar from "./NavBar";
import datasource from "./datasource";

export default function Cards() {
    // initial state is set so that it can be used later
    const initialState = {
        id: 0,
        last_name: "",
        country: "",
        team: "",
        position: "",
        rating: ""
    }

    // state variables 
    const [card, setCard] = useState(initialState)
    const [list, setList] = useState([])
    const [message, setMessage] = useState("");

    //change handler that uses the event to change the state value
    const handleChange = (e) => {
        const { name, value } = e.target;

        setCard({
            ...card,
            [name]: value,
        });

    };

    /**
     * Adds card by calling the server endpoint and looks for the response
     * @param {*} event 
     */
    const addCard = (event) => {

        //the preventDefault prevents a reload
        event.preventDefault()

        fetch("http://localhost:8080/", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(card)
        })
            .then(response => response.json())
            .then(data => {
                // if the code returns a success it will update the message
                if (data.code > 0)
                    setMessage("Card Added");
                else
                    setMessage("Card Fault");
                // console.log(data.);
            });

    }

    /**
     * Calls the server endpoint to remove a card
     * @param {*} event 
     */
    const removeCard = async (event) => {
        event.preventDefault();

        //uses axios to make a delete request and pass an id in to the url
        const response = await datasource.delete("/" + card.id);

        // if the code returns a success it will update the message
        if (response.data.code > 0)
            setMessage("Removal Success")
        else
            setMessage("Removal Fault")
    }

    /**
     * Calls the update endpoint to update the card
     * @param {*} event 
     */
    const updateCard = async (event) => {
        event.preventDefault();

        //uses axios to make a update call and passes the card object into 
        // the body of the request
        const response = await datasource.put("/", card)

        // if the code returns a success it will update the message
        if (response.data.code > 0)
            setMessage("Update Success")
        else
            setMessage("Update Fault")
    }

    // use effect runs once when the app is first loaded
    // It it then runs everytime the message is updated
    useEffect(() => {
        fetch("http://localhost:8080/", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setList(data))
        // it runs when the message state is changed. Everytime a card is
        // added, removed, or updated, the message is changed which updates
        //the list
    }, [message])

    /**
     * Method is passed to the Card component which will return the id of the card
     * that was clicked on so that the form can be filled with the card data
     * @param {*} id 
     */
    const handleClick = (id) => {
        // filters through the list and grabs the sets the card state to the 
        // current elements data
        list.filter((element) => {
            if (element.id === id) {
                console.log(element);
                setCard(element)
            }
        })
    }

    // will set the fields to the initial state to clear the fields
    const clearFields = (event) => {
        event.preventDefault()
        setCard({ ...initialState })
    }

    // card list that created with cards. This list is displayed in the return 
    const cardList = list.map((element, index) => {
        // console.log(element);
        return <Card key={index} id={element.id} lastName={element.last_name} country={element.country} team={element.team} position={element.position} rating={element.rating} onClick={handleClick} />
    })




    return (
        <div>
            <Navbar />
            <main id="cards">
                <h1>Cards List</h1>

                <div id="container">
                    <aside>
                        <form>
                            <label>ID:</label>
                            <input type="text" name="id" onChange={handleChange} value={card.id} readOnly />

                            <label>Last Name:</label>
                            <input type="text" name="last_name" onChange={handleChange} value={card.last_name} />

                            <label>Country:</label>
                            <input type="text" name="country" onChange={handleChange} value={card.country} />

                            <label>Team:</label>
                            <input type="text" name="team" onChange={handleChange} value={card.team} />

                            <label>Position:</label>
                            <input type="text" name="position" onChange={handleChange} value={card.position} />

                            <label>Rating:</label>
                            <input type="number" name="rating" onChange={handleChange} value={card.rating} />

                            <button onClick={addCard}>Add</button>
                            <button onClick={removeCard}>Remove</button>
                            <button onClick={updateCard}>Update</button>
                            <button onClick={clearFields}>Clear</button>
                        </form>

                        <p>{message ? message : " "}</p>
                    </aside>
                    <section id="content">
                        {cardList}
                    </section>
                </div>
            </main >


        </div >

    )
}