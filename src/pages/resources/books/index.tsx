import { Table, TableProps } from 'components/table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBookResourceRequest } from 'store/slices/thunks/resource';
import { BookItem } from 'store/types/resource';
import format from 'date-fns/format';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from 'components/pagination';
import { TextInput } from 'components/text-input';
import useSkipFirstEffect from 'hooks/useSkipFirstEffect';

const BookResource = () => {
  const dispatch = useDispatch();
  const { data, pageSize, totalPage } = useSelector((state) => state.resource.books.list);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState('');

  const pageQuery = Number(useSearchParams()[0].get('page')) || 1;

  const loading = useSelector((state) => state.common.loading);

  useEffect(() => {
    if (searchText) return;
    dispatch(
      listBookResourceRequest({
        page: pageQuery,
        pageSize,
      }),
    );
  }, [pageQuery]);

  useSkipFirstEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', '1');
    navigate(`/resources/books?${queryParams.toString()}`);
    const timeout = setTimeout(() => {
      dispatch(
        listBookResourceRequest({
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

  const tableProps: TableProps<Pick<BookItem, 'name' | 'country' | 'mediaType' | 'released' | 'url'>> = {
    headers: [
      {
        name: 'Name',
        prop: 'name',
      },
      {
        name: 'Media Type',
        prop: 'mediaType',
      },
      {
        name: 'Country',
        prop: 'country',
      },
      {
        name: 'Released',
        prop: 'released',
      },
    ],
    rows: data.map((item) => ({
      url: item.url,
      name: item.name,
      country: item.country,
      mediaType: item.mediaType,
      released: format(new Date(item.released), 'PPP'),
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
          const regex = new RegExp(`${process.env.REACT_APP_BASE_API}/api/books/`);
          const id = row.url.replace(regex, '');
          navigate(`/resources/books/${id}`);
        }}
        loading={loading}
        rows={tableProps.rows}
        headers={tableProps.headers}
      />
      <Pagination
        onPageChange={(pageNumber) => {
          const queryParams = new URLSearchParams(location.search);
          queryParams.set('page', pageNumber.toString());
          navigate(`/resources/books?${queryParams.toString()}`);
        }}
        page={pageQuery}
        totalPage={totalPage}
      />
    </div>
  );
};

export { BookResource };
