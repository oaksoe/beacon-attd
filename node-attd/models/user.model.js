"use strict";

var uuid = require('../helpers/uuid');

class User {
    constructor(username, password, name, type) {
        this.id = uuid.create();
        this.username = username;
        this.password = password;
        this.name = name;
        this.type = type;
        this.createdAt = new Date();
    }

    set username(username) {
        this._username = username; 
    }

    get username() {
        return this._username;
    }

    set password(password) {
        this._password = password; 
    }

    get password() {
        return this._password;
    }

    set name(name) {
        this._name = name; 
    }

    get name() {
        return this._name;
    }

    set type(type) {
        this._type = type; 
    }

    get type() {
        return this._type;
    }
}

module.exports = User;
