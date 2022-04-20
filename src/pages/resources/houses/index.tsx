import { Pagination } from 'components/pagination';
import { Table, TableProps } from 'components/table';
import { TextInput } from 'components/text-input';
import useSkipFirstEffect from 'hooks/useSkipFirstEffect';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { listHouseResourceRequest } from 'store/slices/thunks/resource';
import { HouseItem } from 'store/types/resource';

const HouseResource = () => {
  const dispatch = useDispatch();
  const { data, pageSize, totalPage } = useSelector((state) => state.resource.houses.list);
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');

  const loading = useSelector((state) => state.common.loading);

  const pageQuery = Number(useSearchParams()[0].get('page')) || 1;

  useEffect(() => {
    if (searchText) return;
    dispatch(
      listHouseResourceRequest({
        page: pageQuery,
        pageSize,
      }),
    );
  }, [pageQuery]);

  useSkipFirstEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', '1');
    navigate(`/resources/houses?${queryParams.toString()}`);
    const timeout = setTimeout(() => {
      dispatch(
        listHouseResourceRequest({
          page: 1,
          pageSize,
          q: searchText,
        }),
      );
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  const tableProps: TableProps<Pick<HouseItem, 'name' | 'region' | 'coatOfArms' | 'url'>> = {
    headers: [
      {
        name: 'Name',
        prop: 'name',
      },
      {
        name: 'Region',
        prop: 'region',
      },
      {
        name: 'Coat Of Arms',
        prop: 'coatOfArms',
      },
    ],
    rows: data.map((item) => ({
      url: item.url,
      name: item.name,
      region: item.region,
      coatOfArms: item.coatOfArms,
    })),
  };

  const onSeachChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <TextInput onChange={onSeachChange} placeholder="Search here ..." label="Search" className="w-80" />
      <Table
        onRowClick={(row) => {
          const regex = new RegExp(`${process.env.REACT_APP_BASE_API}/api/houses/`);
          const id = row.url.replace(regex, '');
          navigate(`/resources/houses/${id}`);
        }}
        loading={loading}
        rows={tableProps.rows}
        headers={tableProps.headers}
      />
      <Pagination
        onPageChange={(pageNumber) => {
          const queryParams = new URLSearchParams(location.search);
          queryParams.set('page', pageNumber.toString());
          navigate(`/resources/houses?${queryParams.toString()}`);
        }}
        page={pageQuery}
        totalPage={totalPage}
      />
    </div>
  );
};

export { HouseResource };
