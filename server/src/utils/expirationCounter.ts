import { addDays, format, formatISO } from 'date-fns';

import { config } from '../config/index.js';

export function countExpirationTimestamp(): string {
	const now = new Date();

	const expirationDate = addDays(now, config.REFRESH_TOKEN_EXPIRATION);

	return formatISO(format(expirationDate, 'yyyy-MM-dd HH:mm:ss.SSS'));
}
