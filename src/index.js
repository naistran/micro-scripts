// @flow

import type { ClientRequest, ServerResponse } from 'http';

export default async (req: ClientRequest, res: ServerResponse) => {
  res.end('Hello, world.');
};
