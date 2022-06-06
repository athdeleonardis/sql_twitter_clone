const mysql = require('mysql')

const HOST = "localhost"
const USER = "root"
const PASSWORD = "*******"
const DATABASE_NAME = `SQL_Twitter_Clone`

// Type Sizes
const USERNAME_SIZE = 15
const HASH_SIZE = 32
const NAME_SIZE = 50
const TEXT_SIZE = 255
const TOPIC_SIZE = 50

// Profile Types
const PROFILE_ID_TYPE = `INTEGER UNSIGNED`
const USERNAME_TYPE = `VARCHAR(${USERNAME_SIZE})`
const PASSWORD_TYPE = `BINARY(${HASH_SIZE})`
const NAME_TYPE = `VARCHAR(${NAME_SIZE})`
const COUNT_TYPE = `INTEGER UNSIGNED`

// Post Types
const POST_ID_TYPE = `INTEGER UNSIGNED`
const TEXT_TYPE = `VARCHAR(${TEXT_SIZE})`

// Topic Types
const TOPIC_ID_TYPE = `INTEGER UNSIGNED`
const TOPIC_NAME_TYPE = `VARCHAR(${TOPIC_SIZE})`

function throw_error(err) {
    if (err)
        throw err
}

const pre_connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
})

pre_connection.connect((err) => {
    throw_error(err)

    console.log("Beginning database construction.")

    // Create Database
    pre_connection.query(`CREATE DATABASE ${DATABASE_NAME}`, (err, _) => { throw_error(err) })
    console.log(`Created database '${DATABASE_NAME}'`)

    connection = mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE_NAME
    })

    connection.connect((err) => {
        throw_error(err)
    
        
    
        connection.database = DATABASE_NAME
    
        connection.query(
            `CREATE TABLE Profile (\
            id ${PROFILE_ID_TYPE} AUTO_INCREMENT, \
            username ${USERNAME_TYPE} NOT NULL UNIQUE, \
            password ${PASSWORD_TYPE} NOT NULL, \
            name ${NAME_TYPE} NOT NULL, \

            is_private BOOLEAN, \
            post_count ${COUNT_TYPE}, \
            follow_count ${COUNT_TYPE}, \
            date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, \
            is_deleted BOOLEAN, \
            PRIMARY KEY (id)\
            )`,
            (err, _) => { throw_error(err) }
        )
        console.log("Created table 'Profile'")
    
        connection.query(
            `CREATE TABLE Follow (\
            follower ${PROFILE_ID_TYPE}, \
            followee ${PROFILE_ID_TYPE}, \
            FOREIGN KEY (follower) REFERENCES Profile(id), \
            FOREIGN KEY (followee) REFERENCES Profile(id), \
            PRIMARY KEY (follower, followee)\
            )`,
            (err, _) => { throw_error(err) }
        )
        console.log("Created table 'follow'")
    
        connection.query(
            `CREATE TABLE Post (\
            id ${POST_ID_TYPE} AUTO_INCREMENT, \
            posted_by ${PROFILE_ID_TYPE}, \
            text ${TEXT_TYPE} NOT NULL, \
            is_repost BOOLEAN, \
            repost_id ${POST_ID_TYPE}, \
            like_count ${COUNT_TYPE}, \
            FOREIGN KEY (posted_by) REFERENCES Profile(id), \
            FOREIGN KEY (repost_id) REFERENCES Post(id), \
            PRIMARY KEY (id)\
            )`,
            (err, _) => { throw_error(err) }
        )
        console.log("Created table 'Post'")
    
        connection.query(
            `CREATE TABLE PostLike (\
            post_id ${POST_ID_TYPE}, \
            liked_by ${PROFILE_ID_TYPE} NOT NULL, \
            FOREIGN KEY (post_id) REFERENCES Post(id), \
            FOREIGN KEY (liked_by) REFERENCES Profile(id), \
            PRIMARY KEY (post_id, liked_by)\
            )`,
            (err, _) => { throw_error(err) }
        )
        console.log("Created table 'like'")
    
        connection.query(
            `CREATE TABLE TagProfile (\
            post_id ${POST_ID_TYPE}, \
            taggee ${PROFILE_ID_TYPE} NOT NULL, \
            FOREIGN KEY (post_id) REFERENCES Post(id), \
            FOREIGN KEY (taggee) REFERENCES Profile(id), \
            PRIMARY KEY (post_id, taggee)\
            )`,
            (err, _) => { throw_error(err) }
        )
        console.log("Created table 'TagProfile'")
    
        connection.query(
            `CREATE TABLE Topic (\
            id ${TOPIC_ID_TYPE} AUTO_INCREMENT, \
            name ${TOPIC_NAME_TYPE} UNIQUE, \
            PRIMARY KEY (id)\
            )`,
            (err, _) => { throw_error(err) }
        )
    
        connection.query(
            `CREATE TABLE TagTopic (\
            post_id ${POST_ID_TYPE}, \
            topic_id ${TOPIC_ID_TYPE}, \
            FOREIGN KEY (post_id) REFERENCES Post(id), \
            FOREIGN KEY (topic_id) REFERENCES Topic(id), \
            PRIMARY KEY(post_id, topic_id)\
            )`,
            (err, _) => { throw_error(err) }
        )
        console.log("Created table 'TagTopic'")
    
        console.log("Finished database construction.")
    })    
})
