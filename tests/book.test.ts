import http from 'http';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import BookService from '../src/services/book.service';
import { request } from './helpers/httpClient';

const token = jwt.sign({ userId: 'test-user' }, process.env.JWT_SECRET || 'default-secret');
const authHeaders = { Authorization: `Bearer ${token}` };

describe('Book API', () => {
  let addBookSpy: jest.SpyInstance;
  let listBooksSpy: jest.SpyInstance;
  let findBookSpy: jest.SpyInstance;
  let modifyBookSpy: jest.SpyInstance;
  let removeBookSpy: jest.SpyInstance;
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
    addBookSpy = jest.spyOn(BookService.prototype, 'addBook');
    listBooksSpy = jest.spyOn(BookService.prototype, 'listBooks');
    findBookSpy = jest.spyOn(BookService.prototype, 'findBook');
    modifyBookSpy = jest.spyOn(BookService.prototype, 'modifyBook');
    removeBookSpy = jest.spyOn(BookService.prototype, 'removeBook');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockBook = { id: '1', title: '1984', author: 'George Orwell' };

  it('should create a new book', async () => {
    addBookSpy.mockResolvedValue(mockBook as any);

    const response = await request('POST', '/books', mockBook, serverPort, { headers: authHeaders });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockBook);
  });

  it('should list books', async () => {
    listBooksSpy.mockResolvedValue([mockBook] as any);

    const response = await request('GET', '/books', undefined, serverPort, { headers: authHeaders });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockBook]);
  });

  it('should get a book by ID', async () => {
    findBookSpy.mockResolvedValue(mockBook as any);

    const response = await request('GET', '/books/1', undefined, serverPort, { headers: authHeaders });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBook);
  });

  it('should update a book', async () => {
    const updatedBook = { ...mockBook, title: 'Animal Farm' };
    modifyBookSpy.mockResolvedValue(updatedBook as any);

    const response = await request('PUT', '/books/1', updatedBook, serverPort, { headers: authHeaders });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedBook);
  });

  it('should delete a book', async () => {
    removeBookSpy.mockResolvedValue(true as any);

    const response = await request('DELETE', '/books/1', undefined, serverPort, { headers: authHeaders });

    expect(response.status).toBe(204);
    expect(response.body).toBeUndefined();
  });
});
