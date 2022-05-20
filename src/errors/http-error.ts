import { ApplicationError } from './application-error';
import {
	HttpContext,
	HttpRequestContext,
	HttpResponseContext
} from '../interface';

export class HttpError extends ApplicationError {
	public context?: HttpContext;

	public get status(): undefined | null | number {
		return this.context?.response?.status;
	}

	public get body(): undefined | null | string {
		return this.context?.response?.body;
	}

	constructor(message: string, error: any) {
		if (error?.response) {
			super(message, {
				request: HttpError.buildHttpRequestContext(error),
				response: HttpError.buildHttpResponseContext(error),
			});
		}
		else if (error?.request) {
			super(message, {
				request: HttpError.buildHttpRequestContext(error),
				response: null
			});
		}
		else if (error instanceof Error) {
			super(message, null, error);
		}
		else {
			super(message, error);
		}
	}

	static buildHttpRequestContext(error: any): HttpRequestContext {
		const request = error.config;

		return {
			request: `${request.method.toUpperCase()} ${request.url}`,
			body: request.data,
		};
	}

	static buildHttpResponseContext(error: any): HttpResponseContext {
		const response = error.response;

		return {
			status: response.status,
			message: response.statusText,
			body: response.data,
		};
	}
}
