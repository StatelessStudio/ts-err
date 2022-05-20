import { ApplicationError } from '../../../src/';

describe('errors/ApplicationError', () => {
	it('accepts optional context', () => {
		const error = new ApplicationError('test');

		expect(error.context).toEqual(undefined);
		expect(error.message).toEqual('test');
		expect(error.toString()).toEqual('ApplicationError: test');
	});

	it('accepts context object', () => {
		const error = new ApplicationError('test', { foo: 'bar' });

		expect(error.context.foo).toEqual('bar');
		expect(error.message).toEqual('test');
	});

	it('accepts context string', () => {
		const error = new ApplicationError('test', 'foobar');

		expect(error.context).toEqual('foobar');
		expect(error.message).toEqual('test');
	});

	it('accepts context number (non-zero)', () => {
		const error = new ApplicationError('test', 5);

		expect(error.context).toEqual(5);
		expect(error.message).toEqual('test');
	});

	it('accepts context number (zero)', () => {
		const error = new ApplicationError('test', 0);

		expect(error.context).toEqual(0);
		expect(error.message).toEqual('test');
	});

	it('accepts original ApplicationError', () => {
		const e1 = new ApplicationError('test1');
		const e2 = new ApplicationError('test2', null, e1);

		expect(e2.prev.toString()).toEqual('ApplicationError: test1');
	});

	it('accepts original Error', () => {
		const e1 = new Error('test1');
		const e2 = new ApplicationError('test2', null, e1);

		expect(e2.prev.toString()).toEqual('Error: test1');
	});
});
