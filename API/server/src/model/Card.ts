export default class Card {
    private id: number;
    private last_name: string;
    private country: string;
    private team: string;
    private position: string;
    private rating: number;

    constructor(
        id: number,
        last_name: string,
        country: string,
        team: string,
        position: string,
        rating: number
    ) {
        this.id = id;
        this.last_name = last_name;
        this.country = country;
        this.team = team;
        this.position = position;
        this.rating = rating;
    }

    public get $id(): number {
        return this.id;
    }
    public set $id(value: number) {
        this.id = value;
    }

    public get $last_name(): string {
        return this.last_name;
    }
    public set $last_name(value: string) {
        this.last_name = value;
    }

    public get $country(): string {
        return this.country;
    }
    public set $country(value: string) {
        this.country = value;
    }

    public get $team(): string {
        return this.team;
    }
    public set $team(value: string) {
        this.team = value;
    }

    public get $position(): string {
        return this.position;
    }
    public set $position(value: string) {
        this.position = value;
    }

    public get $rating(): number {
        return this.rating;
    }
    public set $rating(value: number) {
        this.rating = value;
    }
}
