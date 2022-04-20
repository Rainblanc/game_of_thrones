import { Pagination } from 'components/pagination';
import { Table, TableProps } from 'components/table';
import { TextInput } from 'components/text-input';
import useSkipFirstEffect from 'hooks/useSkipFirstEffect';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { listCharacterResourceRequest } from 'store/slices/thunks/resource';
import { CharacterItem } from 'store/types/resource';

const CharacterResource = () => {
  const dispatch = useDispatch();
  const { data, pageSize, totalPage } = useSelector((state) => state.resource.characters.list);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const loading = useSelector((state) => state.common.loading);

  const pageQuery = Number(useSearchParams()[0].get('page')) || 1;

  useEffect(() => {
    if (searchText) return;
    dispatch(
      listCharacterResourceRequest({
        page: pageQuery,
        pageSize,
      }),
    );
  }, [pageQuery]);

  useSkipFirstEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', '1');
    navigate(`/resources/characters?${queryParams.toString()}`);
    const timeout = setTimeout(() => {
      dispatch(
        listCharacterResourceRequest({
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

  const tableProps: TableProps<Pick<CharacterItem, 'name' | 'gender' | 'culture' | 'url'>> = {
    headers: [
      {
        name: 'Name',
        prop: 'name',
      },
      {
        name: 'Gender',
        prop: 'gender',
      },
      {
        name: 'Culture',
        prop: 'culture',
      },
    ],
    rows: data.map((item) => ({
      url: item.url,
      name: item.name,
      gender: item.gender,
      culture: item.culture,
    })),
  };

  return (
    <div>
      <TextInput
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search here ..."
        label="Search"
        className="w-80"
      />
      <Table
        onRowClick={(row) => {
          const regex = new RegExp(`${process.env.REACT_APP_BASE_API}/api/characters/`);
          const id = row.url.replace(regex, '');
          navigate(`/resources/characters/${id}`);
        }}
        loading={loading}
        rows={tableProps.rows}
        headers={tableProps.headers}
      />
      <Pagination
        onPageChange={(pageNumber) => {
          const queryParams = new URLSearchParams(location.search);
          queryParams.set('page', pageNumber.toString());
          navigate(`/resources/characters?${queryParams.toString()}`);
        }}
        page={pageQuery}
        totalPage={totalPage}
      />
    </div>
  );
};

export { CharacterResource };
