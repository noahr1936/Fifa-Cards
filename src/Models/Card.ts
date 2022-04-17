export class Card {
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

    public get Id(): number {
        return this.id;
    }
    public set Id(value: number) {
        this.id = value;
    }

    public get Last_name(): string {
        return this.last_name;
    }
    public set Last_name(value: string) {
        this.last_name = value;
    }

    public get Country(): string {
        return this.country;
    }
    public set Country(value: string) {
        this.country = value;
    }

    public get Team(): string {
        return this.team;
    }
    public set Team(value: string) {
        this.team = value;
    }

    public get Position(): string {
        return this.position;
    }
    public set Position(value: string) {
        this.position = value;
    }

    public get Rating(): number {
        return this.rating;
    }
    public set Rating(value: number) {
        this.rating = value;
    }
}
