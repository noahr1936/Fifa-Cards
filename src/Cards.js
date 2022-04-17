// import { stringify } from "querystring";
import { useEffect, useState } from "react"
import Card from "./Card";
import "./Cards.css"

export default function Cards() {
    const [readOnly, setReadOnly] = useState("")
    const [card, setCard] = useState({
        id: 0,
        lastName: "",
        country: "",
        team: "",
        position: "",
        rating: ""
    })
    const [list, setList] = useState()

    const [message, setMessage] = useState("");

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

    const removeCard = (event) => {
        event.preventDefault();
        setMessage("set to false");
    }

    useEffect(() => {
        fetch("http://localhost:8080/", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setList(data.map((element, index) => {
                    return <Card key={index} lastName={element.lastName} country={element.country} team={element.team} position={element.position} rating={element.rating} />
                }))
            })
    }, [])





    return (
        <div>
            <main>
                <h1>Cards List</h1>

                <div id="main">

                    <aside>
                        <form>
                            <label>ID:</label>
                            <input type="text" name="id" onChange={handleChange} value={card.id} readOnly={true} />

                            <label>Last Name:</label>
                            <input type="text" name="lastName" onChange={handleChange} value={card.lastName} />

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
                        </form>

                        <p>{message ? message : "test"}</p>
                    </aside>
                    <section>
                        {list}
                    </section>
                </div>
            </main >


        </div >

    )
}