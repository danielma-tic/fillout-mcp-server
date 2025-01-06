import axios from 'axios';
import { FilloutError, handleFilloutError } from './errors';

const API_BASE = 'https://api.fillout.com/v1/';

export class FilloutClient {
  private api: ReturnType<typeof axios.create>;

  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: API_BASE,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async listForms(params: { limit?: number; offset?: number } = {}) {
    try {
      const { data } = await this.api.get('forms', { params });
      return data;
    } catch (error) {
      handleFilloutError(error);
    }
  }

  async getForm(formId: string) {
    try {
      const { data } = await this.api.get(`forms/${formId}`);
      return data;
    } catch (error) {
      handleFilloutError(error);
    }
  }

  async getFormResponses(formId: string, params?: any) {
    try {
      const { data } = await this.api.get(`forms/${formId}/submissions`, { params });
      return data;
    } catch (error) {
      handleFilloutError(error);
    }
  }

  async submitFormResponse(formId: string, responses: any[]) {
    try {
      const { data } = await this.api.post(`forms/${formId}/submissions`, {
        responses
      });
      return data;
    } catch (error) {
      handleFilloutError(error);
    }
  }

  async createForm(params: {
    name: string;
    description?: string;
    questions: any[];
  }) {
    try {
      const { data } = await this.api.post('forms', params);
      return data;
    } catch (error) {
      handleFilloutError(error);
    }
  }

  async deleteForm(formId: string) {
    try {
      const { data } = await this.api.delete(`forms/${formId}`);
      return data;
    } catch (error) {
      handleFilloutError(error);
    }
  }

  async getFormSubmission(formId: string, submissionId: string) {
    try {
      const { data } = await this.api.get(`forms/${formId}/submissions/${submissionId}`);
      return data;
    } catch (error) {
      handleFilloutError(error);
    }
  }
}