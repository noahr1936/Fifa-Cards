import "./Card.css"

export default function Card(props) {

    /**
     * Method that returns the id of the clicked card to the parent
     */
    const handleClick = () => {
        props.onClick(props.id)
    }

    return (
        <div id="card" onClick={handleClick}>
            <div id="cardContainer">
                <section id="cardTop">
                    <div id="detailsContainer">
                        <div>
                            <p>{props.rating}</p>
                            <p>{props.position}</p>
                            <p>{props.country}</p>
                            <p>{props.team}</p>
                        </div>
                    </div>
                    <img src="/lionelMessi.png" alt="Messi Head" />
                </section>
                <section id="cardBottom">
                    <p id="lastName">{props.lastName}</p>
                    <div id="statsContainer">
                        <p>99 PAC</p>
                        <p>99 SHO</p>
                        <p>99 PAS</p>
                        <p>99 DRI</p>
                        <p>99 DEF</p>
                        <p>99 PHY</p>
                    </div>
                </section>
            </div>
        </div>
    )
}