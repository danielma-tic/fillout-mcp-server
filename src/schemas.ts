import { z } from 'zod';

// Common schemas
const PaginationSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

// Form schema definitions
export const ListFormsSchema = PaginationSchema;

export const GetFormSchema = z.object({
  formId: z.string(),
});

export const GetFormResponsesSchema = z.object({
  formId: z.string(),
  filters: z.record(z.any()).optional(),
  pageSize: z.number().optional(),
  afterDate: z.string().optional(),
  beforeDate: z.string().optional(),
  offset: z.number().optional(),
  status: z.enum(['in_progress', 'completed']).optional(),
  includeEditLink: z.boolean().optional(),
});

export const SubmitFormResponseSchema = z.object({
  formId: z.string(),
  responses: z.array(z.object({
    questionId: z.string(),
    value: z.any(),
  })),
  calculations: z.array(z.object({
    name: z.string(),
    value: z.any(),
  })).optional(),
});

export const CreateFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  questions: z.array(z.object({
    type: z.enum([
      'ShortAnswer',
      'LongAnswer',
      'MultipleChoice',
      'Checkbox',
      'Email',
      'Phone',
      'Number',
      'Date',
      'FileUpload'
    ]),
    name: z.string(),
    required: z.boolean().optional(),
    choices: z.array(z.string()).optional(),
    validation: z.record(z.any()).optional(),
  })),
});