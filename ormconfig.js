module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "apivendas",
    "migrations": [
        "./src/shared/typeorm/migrations/*.ts"
    ],
    "cli": {
        "migrationDir": "./src/shared/typeorm/migrations"
    }
}
