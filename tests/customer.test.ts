import http from 'http';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import CustomerService from '../src/services/customer.service';
import { request } from './helpers/httpClient';

const token = jwt.sign({ userId: 'test-user' }, process.env.JWT_SECRET || 'default-secret');
const authHeaders = { Authorization: `Bearer ${token}` };

describe('Customer API', () => {
  let addCustomerSpy: jest.SpyInstance;
  let findCustomerSpy: jest.SpyInstance;
  let modifyCustomerSpy: jest.SpyInstance;
  let removeCustomerSpy: jest.SpyInstance;
  let server: http.Server;
  let serverPort = 0;

  beforeAll(async () => {
    await new Promise<void>(resolve => {
      server = app.listen(0, () => {
        const address = server.address();
        if (address && typeof address !== 'string') {
          serverPort = address.port;
        }
        resolve();
      });
    });
  });

  afterAll(done => {
    server.close(done);
  });

  beforeEach(() => {
    addCustomerSpy = jest.spyOn(CustomerService.prototype, 'addCustomer');
    findCustomerSpy = jest.spyOn(CustomerService.prototype, 'findCustomer');
    modifyCustomerSpy = jest.spyOn(CustomerService.prototype, 'modifyCustomer');
    removeCustomerSpy = jest.spyOn(CustomerService.prototype, 'removeCustomer');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockCustomer = { id: '1', name: 'John Doe', email: 'john@example.com' };

  it('should create a new customer', async () => {
    addCustomerSpy.mockResolvedValue(mockCustomer as any);

    const response = await request('POST', '/customers', mockCustomer, serverPort, { headers: authHeaders });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockCustomer);
  });

  it('should get a customer by ID', async () => {
    findCustomerSpy.mockResolvedValue(mockCustomer as any);

    const response = await request('GET', '/customers/1', undefined, serverPort, { headers: authHeaders });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCustomer);
  });

  it('should update a customer', async () => {
    const updatedCustomer = { ...mockCustomer, name: 'Jane Doe' };
    modifyCustomerSpy.mockResolvedValue(updatedCustomer as any);

    const response = await request('PUT', '/customers/1', updatedCustomer, serverPort, { headers: authHeaders });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedCustomer);
  });

  it('should delete a customer', async () => {
    removeCustomerSpy.mockResolvedValue(true as any);

    const response = await request('DELETE', '/customers/1', undefined, serverPort, { headers: authHeaders });

    expect(response.status).toBe(204);
    expect(response.body).toBeUndefined();
  });
});
