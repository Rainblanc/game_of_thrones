import { Table, TableProps } from 'components/table';
import { useEffect } from 'react';
import isString from 'lodash/isString';
import startCase from 'lodash/startCase';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpecificHouseRequest } from 'store/slices/thunks/resource';
import { HouseItem } from 'store/types/resource';

const SpecificHouse = () => {
  const id = Number(useParams().id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecificHouseRequest(id));
  }, [id]);

  const detail = useSelector((state) => state.resource.houses.detail);
  const loading = useSelector((state) => state.common.loading);

  if (!detail) return <></>;

  const rows = Object.keys(detail)
    .map((key) => {
      return {
        header: startCase(key),
        value: detail[key as keyof HouseItem],
      };
    })
    .filter((row) => isString(row.value)) as { header: string; value: string }[];

  const tableProps: TableProps<{ header: string; value: string }> = {
    headers: [
      {
        name: 'Property',
        prop: 'header',
      },
      {
        name: 'Value',
        prop: 'value',
      },
    ],
    rows,
  };

  return <Table loading={loading} rows={tableProps.rows} headers={tableProps.headers} />;
};

export { SpecificHouse };
