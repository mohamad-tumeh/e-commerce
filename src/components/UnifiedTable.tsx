import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';

interface UnifiedTableProps {
  data: any[];
  columns: { id: string; label: string; render?: (item: any) => React.ReactNode }[];
  totalCount: number;
  rowsPerPage: number;
  page: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowClick?: (item: any) => void;
}

const UnifiedTable: React.FC<UnifiedTableProps> = ({
  data,
  columns,
  totalCount,
  rowsPerPage,
  page,
  onChangePage,
  onChangeRowsPerPage,
  onRowClick,
}) => {
  
  const reversedData = [...data].reverse();

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reversedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={item.id} onClick={() => onRowClick && onRowClick(item)} hover sx={{ cursor: 'pointer' }}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.render ? column.render(item) : item[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </>
  );
};

export default UnifiedTable;
