# sql_twitter_clone

An implementation of a Twitter-esque website using JavaScript and MySQL.

# Requirements

Requires node.js to run the server and install dependencies.
Requires MySQL installation to 

# Build

## Install MySQL

Refer to [the offical website](https://dev.mysql.com/downloads/) for downloading and installing MySQL.
I recommend `MySQL Community Server` to host the database, and `MySQL Workbench` as a GUI.

## Install node dependencies

1. Run `npm install` in the base directory to install all packages listed in package.json

## Create the database

1. Modify `src/create_database.js` to contain the relevent MySQL host, user and password.
2. Run `node src/create_database.js` to fully build the database.

# Start the server

1. Run `node src/server.js`. Currently only runs on localhost.

# License

[MIT](https://choosealicense.com/licenses/mit/)
