
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

const MockInterview =pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy'),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('MockID').notNull()
})

export default MockInterview;

