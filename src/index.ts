import { MCP } from '@modelcontextprotocol/core';
import { FilloutClient } from './fillout-client';
import * as schemas from './schemas';

const FILLOUT_API_KEY = process.env.FILLOUT_API_KEY;

if (!FILLOUT_API_KEY) {
  throw new Error('FILLOUT_API_KEY environment variable is required');
}

const client = new FilloutClient(FILLOUT_API_KEY);

const server = new MCP({
  tools: {
    list_forms: {
      schema: schemas.ListFormsSchema,
      handler: async (params) => {
        return await client.listForms(params);
      }
    },
    get_form: {
      schema: schemas.GetFormSchema,
      handler: async (params) => {
        return await client.getForm(params.formId);
      }
    },
    get_form_responses: {
      schema: schemas.GetFormResponsesSchema,
      handler: async (params) => {
        const { formId, ...filters } = params;
        return await client.getFormResponses(formId, filters);
      }
    },
    submit_form_response: {
      schema: schemas.SubmitFormResponseSchema,
      handler: async (params) => {
        return await client.submitFormResponse(params.formId, params.responses);
      }
    },
    create_form: {
      schema: schemas.CreateFormSchema,
      handler: async (params) => {
        return await client.createForm(params);
      }
    },
    delete_form: {
      schema: schemas.GetFormSchema,
      handler: async (params) => {
        return await client.deleteForm(params.formId);
      }
    },
    get_form_submission: {
      schema: z.object({
        formId: z.string(),
        submissionId: z.string()
      }),
      handler: async (params) => {
        return await client.getFormSubmission(params.formId, params.submissionId);
      }
    }
  }
});

server.start();