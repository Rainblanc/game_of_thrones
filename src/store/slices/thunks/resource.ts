import { PaginationPayload } from 'interfaces/pagination';
import { startCase } from 'lodash';
import { AppThunk } from 'store';
import {
  getRootResources,
  getBookResources,
  getCharacterResources,
  getHouseResources,
  getSpecificBook,
  getSpecificCharacter,
  getSpecificHouse,
} from 'store/services/resource';
import { commonActions } from '../common';
import { resourceActions } from '../resource';

export const listRootResourcesRequest = (): AppThunk => async (dispatch) => {
  try {
    dispatch(commonActions.setLoading(true));
    const { data } = await getRootResources();
    const resources = Object.keys(data).map((key) => ({
      name: startCase(key),
      identifier: key,
      url: data[key],
    }));
    dispatch(resourceActions.setRootResources(resources));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(commonActions.setLoading(false));
  }
};

export const listBookResourceRequest =
  (payload: PaginationPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(commonActions.setLoading(true));
      const { data, headers } = await getBookResources(payload);
      dispatch(
        resourceActions.setBookResources({
          data,
          page: payload.page,
          pageSize: payload.pageSize,
          totalPage: Number(headers.totalPage),
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(commonActions.setLoading(false));
    }
  };

export const listCharacterResourceRequest =
  (payload: PaginationPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(commonActions.setLoading(true));
      const { data, headers } = await getCharacterResources(payload);
      dispatch(
        resourceActions.setCharacterResources({
          data,
          page: payload.page,
          pageSize: payload.pageSize,
          totalPage: Number(headers.totalPage),
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(commonActions.setLoading(false));
    }
  };

export const listHouseResourceRequest =
  (payload: PaginationPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(commonActions.setLoading(true));
      const { data, headers } = await getHouseResources(payload);
      dispatch(
        resourceActions.setHouseResources({
          data,
          page: payload.page,
          pageSize: payload.pageSize,
          totalPage: Number(headers.totalPage),
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(commonActions.setLoading(false));
    }
  };

export const getSpecificBookRequest =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(commonActions.setLoading(true));
      const { data } = await getSpecificBook(id);
      dispatch(resourceActions.setBookDetail(data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(commonActions.setLoading(false));
    }
  };

export const getSpecificCharacterRequest =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(commonActions.setLoading(true));
      const { data } = await getSpecificCharacter(id);
      dispatch(resourceActions.setCharacterDetail(data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(commonActions.setLoading(false));
    }
  };

export const getSpecificHouseRequest =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(commonActions.setLoading(true));
      const { data } = await getSpecificHouse(id);
      dispatch(resourceActions.setHouseDetail(data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(commonActions.setLoading(false));
    }
  };
