import { HttpConnection } from 'constants/variables/http-connection';
import { PaginationPayload } from 'interfaces/pagination';
import { BookItem, CharacterItem, HouseItem } from 'store/types/resource';

export const getRootResources = () => {
  return HttpConnection.get<Record<string, string>>('/api');
};

const getResources = async <T>(identifier: 'books' | 'characters' | 'houses', params?: any) => {
  const res = await HttpConnection.get<T>(`/api/${identifier}`, {
    params,
  });
  const lastLink = res.headers.link?.split(',').find((relLink) => {
    return !!relLink.match(/rel="last"/);
  });
  const queryString = lastLink?.split(';')[0].replace(/<|>/g, '').split('?')[1] || '';
  res.headers.totalPage = new URLSearchParams(queryString).get('page') || '0';
  return res;
};

export const getBookResources = (params: PaginationPayload) => {
  return getResources<BookItem[]>('books', {
    page: params.page,
    pageSize: params.pageSize,
    name: params.q,
  });
};

export const getCharacterResources = (params: PaginationPayload) => {
  return getResources<CharacterItem[]>('characters', {
    page: params.page,
    pageSize: params.pageSize,
    name: params.q,
  });
};

export const getHouseResources = (params: PaginationPayload) => {
  return getResources<HouseItem[]>('houses', {
    page: params.page,
    pageSize: params.pageSize,
    name: params.q,
  });
};

export const getSpecificBook = (id: number) => {
  return HttpConnection.get<BookItem>(`/api/books/${id}`);
};

export const getSpecificHouse = (id: number) => {
  return HttpConnection.get<HouseItem>(`/api/houses/${id}`);
};

export const getSpecificCharacter = (id: number) => {
  return HttpConnection.get<CharacterItem>(`/api/characters/${id}`);
};
