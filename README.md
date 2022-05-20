# ts-err

## Installation

`npm i ts-err`

## Basic Errors

ApplicationError(*message: string*, *context: any*, *previous: Error*)

```typescript
import { ApplicationError } from 'ts-error';

const a = 5;

throw new ApplicationError('Something happened!', {
	value: a
});
```

## Error chains

```typescript
import { ApplicationError } from 'ts-error';

try {
	throw new Error('Hello!');
}
catch(e) {
	throw new ApplicationError('Greeting failed', null, e);
}
```

## Http Errors (with Axios)

HttpError(*message: string*, *error: any*)

```typescript
import { default as axios } from 'axios';
import { HttpError } from 'ts-err';

axios.get('https://google.com/teapot').catch(err => {
	throw new HttpError('Could not fetch teapot', err);
})
```
