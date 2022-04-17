import "./Card.css"

export default function Card(props) {
    return (
        <div id="card">
            <section>
                <p>{props.rating}</p>
                <p>{props.position}</p>
                <p>{props.country}</p>
                <p>{props.team}</p>
            </section>
            <section>
                <p>{props.lastName}</p>
                <div id="grid">
                    <p>99 PAC</p>
                    <p>99 SHO</p>
                    <p>99 PAS</p>
                    <p>99 DRI</p>
                    <p>99 DEF</p>
                    <p>99 PHY</p>
                </div>
            </section>
        </div>
    )
}