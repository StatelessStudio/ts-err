export interface HttpRequestContext {
	request: string;
	body?: any;
}

export interface HttpResponseContext {
	status?: number;
	message?: string;
	body?: any;
}

export interface HttpContext {
	request?: HttpRequestContext;
	response?: HttpResponseContext;
}
