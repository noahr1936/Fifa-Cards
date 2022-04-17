"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(id, last_name, country, team, position, rating) {
        this.id = id;
        this.last_name = last_name;
        this.country = country;
        this.team = team;
        this.position = position;
        this.rating = rating;
    }
    get $id() {
        return this.id;
    }
    set $id(value) {
        this.id = value;
    }
    get $last_name() {
        return this.last_name;
    }
    set $last_name(value) {
        this.last_name = value;
    }
    get $country() {
        return this.country;
    }
    set $country(value) {
        this.country = value;
    }
    get $team() {
        return this.team;
    }
    set $team(value) {
        this.team = value;
    }
    get $position() {
        return this.position;
    }
    set $position(value) {
        this.position = value;
    }
    get $rating() {
        return this.rating;
    }
    set $rating(value) {
        this.rating = value;
    }
}
exports.default = Card;
