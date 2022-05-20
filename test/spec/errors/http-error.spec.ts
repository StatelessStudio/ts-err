import { default as axios } from 'axios';
import { HttpError } from '../../../src/';

describe('errors/HttpError', () => {
	it('can handle connection failure', async  () => {
		await axios.post('https://notreal:1234').catch(err => {
			const error = new HttpError('Could not fetch fake domain', err);

			expect(error.toString()).toEqual('HttpError: Could not fetch fake domain');
			expect(error.context.request.request).toEqual('POST https://notreal:1234');
			expect(error.context.request.body).toBeUndefined();
		});
	});

	it('can handle 4xx errors', async () => {
		await axios.get('https://google.com/teapot').catch(err => {
			const error = new HttpError('Could not fetch teapot', err);

			expect(error.toString()).toEqual('HttpError: Could not fetch teapot');
			expect(error.context.request.request).toEqual('GET https://google.com/teapot');
			expect(error.status).toEqual(418);
			expect(error.body).toContain('Tip me over and pour me out');
		});
	});

	it('can handle thrown Error', () => {
		const error = new HttpError('Rethrown', new Error('Original'));

		expect(error.toString()).toEqual('HttpError: Rethrown');
		expect(error.prev.toString()).toEqual('Error: Original');
	});

	it('can handle error chains', () => {
		const e1 = new HttpError('Chain1', { foo: 'bar' });
		const e2 = new HttpError('Chain2', e1);
		const e3 = new HttpError('Chain3', e2);

		expect(e3.toString()).toEqual('HttpError: Chain3');
		expect(e3.prev?.toString()).toEqual('HttpError: Chain2');
	});

	it('can handle null error', () => {
		const error = new HttpError('Null', null);

		expect(error.toString()).toEqual('HttpError: Null');
		expect(error.status).toBeUndefined();
		expect(error.body).toBeUndefined();
	});
});
