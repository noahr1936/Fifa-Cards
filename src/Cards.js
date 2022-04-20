// import { stringify } from "querystring";
import { useEffect, useState } from "react"
import Card from "./Card";
import "./Cards.css"
import Navbar from "./NavBar";
import datasource from "./datasource";

export default function Cards() {
    const initialState = {
        id: 0,
        last_name: "",
        country: "",
        team: "",
        position: "",
        rating: ""
    }
    const [card, setCard] = useState(initialState)
    const [list, setList] = useState([])
    const [message, setMessage] = useState("");
    // const [cardList, setCardList] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCard({
            ...card,
            [name]: value,
        });

    };

    const addCard = (event) => {
        event.preventDefault()
        fetch("http://localhost:8080/", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(card)
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const removeCard = async (event) => {
        event.preventDefault();

        const response = await datasource.delete("/" + card.id);

        console.log(response);
        setMessage("set to false");
    }

    const updateCard = async (event) => {
        event.preventDefault();
        setMessage("Update Success")
    }

    useEffect(() => {
        console.log('test');
        fetch("http://localhost:8080/", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setList(data))
    }, [message])



    const handleClick = (id) => {
        list.filter((element) => {
            if (element.id === id) {
                console.log(element);
                setCard(element)
            }
        })
    }

    const clearFields = (event) => {
        event.preventDefault()
        setCard({ ...initialState })
    }


    const cardList = list.map((element, index) => {
        // console.log(element);
        return <Card key={index} id={element.id} lastName={element.last_name} country={element.country} team={element.team} position={element.position} rating={element.rating} onClick={handleClick} />
    })




    return (
        <div>
            <Navbar />
            <main>
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
                            <button>Update</button>
                            <button onClick={clearFields}>Clear</button>
                        </form>

                        <p>{message ? message : "test"}</p>
                    </aside>
                    <section id="content">
                        {cardList}
                    </section>
                </div>
            </main >


        </div >

    )
}