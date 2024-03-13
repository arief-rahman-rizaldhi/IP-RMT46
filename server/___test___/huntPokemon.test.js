const app = require('../app.js');
const request = require('supertest');

const { hashPassword } = require('../helpers/bcrypt.js');
const { signToken } = require('../helpers/jwt.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let access_token_user_1;
let access_token_user_2;

const user_test_1 = {
    username: "kocak",
    email: "yakali@gmail.com",
    password: "testazah",
    role: "Admin",
    gender: "female",
    age: 25,
}

const user_test_2 = {
    username: "kocakbener",
    email: "yakaligagal@gmail.com",
    password: "testskuy",
    role: "Trainer",
    gender: "male",
    age: 18,
}

const pokemon_test_1 = {
    "name": "pokemon 4",
    "type": "water",
    "pokedex": 4,
    "attack": 90,
    "hp": 70,
    "weight": 67,
    "height": 4,
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif",
    "UserId": 1
}

const pokemon_test_2 = {
    "name": "pokemon 5",
    "type": "fire",
    "pokedex": 5,
    "attack": 70,
    "hp": 80,
    "weight": 70,
    "height": 7,
    "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
    "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/5.gif",
    "UserId": 1
}

describe("POST /hunt", () => {
    describe("Success", () => {
        test("should return status 201 and object create new pokemon", async () => {
            let { status, body } = await request(app)
                .post("/hunt?type=water")
                .set("Authorization", "Bearer " + access_token_user_1)

            expect(status).toBe(201)
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", expect.any(String));
            expect(body).toHaveProperty("type", expect.any(String));
            expect(body).toHaveProperty("pokedex", expect.any(String));
            expect(body).toHaveProperty("attack", expect.any(String));
            expect(body).toHaveProperty("hp", expect.any(String));
            expect(body).toHaveProperty("weight", expect.any(String));
            expect(body).toHaveProperty("height", expect.any(String));
            expect(body).toHaveProperty("imagePokedex", expect.any(String));
            expect(body).toHaveProperty("imageBattleFront", expect.any(String));
            expect(body).toHaveProperty("imageBattleBack", expect.any(String));
            expect(body).toHaveProperty("UserId", expect.any(Number));
        })

    })

    describe("Failed", () => {
        test("should return status 500 and internal server error", async () => {
            let { status, body } = await request(app)
                .post("/hunt?type=water")
                .send(pokemon_test_2)

            expect(status).toBe(500)
            expect(body).toHaveProperty("message", "Internal server error");
        })

        test("should return status 401 and invalid token", async () => {
            let { status, body } = await request(app)
                .post("/hunt?type=water")
                .set("Authorization", "Bearer " + "randomtokensalah")
                .send(pokemon_test_2)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Token");
        })

        test("should return status 400 and required a name", async () => {
            let { status, body } = await request(app)
                .post("/hunt?type=water")
                .set("Authorization", "Bearer " + access_token_user_1)
                .send({
                    name: "",
                    type: pokemon_test_2.type,
                    pokedex: pokemon_test_2.pokedex,
                    attack: pokemon_test_2.attack,
                    hp: pokemon_test_2.hp,
                    weight: pokemon_test_2.weight,
                    height: pokemon_test_2.height,
                    imagePokedex: pokemon_test_2.imagePokedex,
                    imageBattleFront: pokemon_test_2.imageBattleFront,
                    imageBattleBack: pokemon_test_2.imageBattleBack,
                    UserId: pokemon_test_2.UserId,
                })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Name is required");
        })

    })
});

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', [{
        username: user_test_1.username,
        email: user_test_1.email,
        password: hashPassword(user_test_1.password),
        role: user_test_1.role,
        gender: user_test_1.gender,
        age: user_test_1.age,
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        username: user_test_2.username,
        email: user_test_2.email,
        password: hashPassword(user_test_2.password),
        role: user_test_2.role,
        gender: user_test_2.gender,
        age: user_test_2.age,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});

    access_token_user_1 = signToken({ id: 1 });
    access_token_user_2 = signToken({ id: 2 });

    await queryInterface.bulkInsert('Pokemons',
        [{
            "name": "pokemon 1",
            "type": "water",
            "pokedex": 1,
            "attack": 48,
            "hp": 44,
            "weight": 90,
            "height": 9,
            "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
            "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif",
            "UserId": 1,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "name": "pokemon 2",
            "type": "fire",
            "pokedex": 2,
            "attack": 60,
            "hp": 60,
            "weight": 62,
            "height": 12,
            "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
            "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
            "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/2.gif",
            "UserId": 1,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }, {
            "name": "pokemon 3",
            "type": "ground",
            "pokedex": 3,
            "attack": 72,
            "hp": 98,
            "weight": 24,
            "height": 6,
            "imagePokedex": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
            "imageBattleFront": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
            "imageBattleBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/3.gif",
            "UserId": 1,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }
        ], {});

});

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });

    await queryInterface.bulkDelete('Pokemons', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
});