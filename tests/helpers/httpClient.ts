import http from 'http';

export interface HttpResponse<T = any> {
  status: number;
  body?: T;
}

export interface RequestOptions {
  headers?: Record<string, string>;
}

export const request = <T = any>(
  method: string,
  path: string,
  data?: unknown,
  port = 3000,
  options: RequestOptions = {}
) => {
  const payload = data ? JSON.stringify(data) : undefined;
  const defaultHeaders =
    payload !== undefined
      ? {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload).toString(),
        }
      : undefined;

  return new Promise<HttpResponse<T>>((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path,
        method,
        headers: {
          ...(defaultHeaders || {}),
          ...(options.headers || {}),
        },
      },
      res => {
        const chunks: Buffer[] = [];
        res.on('data', chunk => chunks.push(Buffer.from(chunk)));
        res.on('end', () => {
          const rawBody = Buffer.concat(chunks).toString();
          let parsed: any;
          if (rawBody) {
            try {
              parsed = JSON.parse(rawBody);
            } catch (error) {
              return reject(error);
            }
          }
          resolve({ status: res.statusCode || 0, body: parsed });
        });
      }
    );

    req.on('error', reject);

    if (payload) {
      req.write(payload);
    }

    req.end();
  });
};
