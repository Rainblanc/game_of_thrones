import { Table, TableProps } from 'components/table';
import isString from 'lodash/isString';
import startCase from 'lodash/startCase';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpecificBookRequest } from 'store/slices/thunks/resource';
import { BookItem } from 'store/types/resource';

const SpecificBook = () => {
  const id = Number(useParams().id);
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.resource.books.detail);
  const loading = useSelector((state) => state.common.loading);

  useEffect(() => {
    dispatch(getSpecificBookRequest(id));
  }, [id]);

  if (!detail) return <></>;

  const rows = Object.keys(detail)
    .map((key) => {
      return {
        header: startCase(key),
        value: detail[key as keyof BookItem],
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

export { SpecificBook };
