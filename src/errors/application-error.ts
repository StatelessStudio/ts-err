export class ApplicationError extends Error {
	public context?;
	public prev?: Error;

	public constructor(
		message: string,
		context?: any,
		prev?: Error
	) {
		super(message);
		this.context = context;
		this.prev = prev;
	}

	/**
	 * Get the error summary
	 *
	 * @returns Returns the summary as a string
	 */
	public toString(): string {
		return `${this.constructor.name}: ${this.message}`;
	}
}
