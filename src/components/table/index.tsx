import { useEffect, useState, Fragment } from 'react';
import times from 'lodash/times';
import classNames from 'classnames';

export interface TableProps<T> {
  rows: T[];
  headers: {
    name: string;
    prop: keyof T;
  }[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
}

const Table = <
  T extends Record<string, string | number | JSX.Element> = Record<string, string | number | JSX.Element>,
>({
  headers,
  rows,
  onRowClick,
  ...props
}: TableProps<T>) => {
  const [loading, setLoading] = useState<boolean>(props.loading || true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(props.loading || false);
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [props.loading]);

  if (loading) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          {times(6, (num) => (
            <Fragment key={num}>
              <div className="h-2 bg-slate-200 rounded" />
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th className="text-left p-2" key={index}>
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr
            className={classNames('border-t', {
              ['cursor-pointer']: !!onRowClick,
            })}
            onClick={() => {
              onRowClick?.(row);
            }}
            key={index}
          >
            {headers.map((header, idx) => (
              <td className="text-left p-2" key={idx}>
                {row[header.prop]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
