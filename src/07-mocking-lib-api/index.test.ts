import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((cb) => cb),
  };
});

const POSTS_PATH = '/posts/1';
describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(POSTS_PATH);
    expect(axiosSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(POSTS_PATH);
    expect(axiosGetSpy).toBeCalledWith(POSTS_PATH);
  });

  test('should return response data', async () => {
    const mockPost = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body:
        'quia et suscipit\n' +
        'suscipit recusandae consequuntur expedita et cum\n' +
        'reprehenderit molestiae ut ut quas totam\n' +
        'nostrum rerum est autem sunt rem eveniet architecto',
    };
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: mockPost }));

    const postRes = await throttledGetDataFromApi(POSTS_PATH);
    expect(postRes).toBe(mockPost);
  });
});
