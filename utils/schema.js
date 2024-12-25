
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview =pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy'),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('MockID').notNull()
})

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('MockID').notNull(),
    question:varchar('question').notNull(),
    correctAns:varchar('correctAns'),
    UserAns:text('UserAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
})



