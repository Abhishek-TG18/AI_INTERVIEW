/** @type {import("drizzle-kit").Config } */


export default {
    
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials: {
        url:'postgresql://AI_Interview_owner:4yGvPITYc6Qb@ep-blue-hill-a517se9s.us-east-2.aws.neon.tech/NextStep?sslmode=require'
    }
}