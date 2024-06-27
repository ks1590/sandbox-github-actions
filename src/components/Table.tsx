import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'mantine-react-table';
import { Box, Button, Text } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { data, type Person } from '../data/makeData';

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 40,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    size: 120,
    Cell: ({ cell }) => {
      const firstName = cell.getValue() as string;
      return (
        <Box
          style={{
            background: firstName.length < 5 ? 'green' : '',
            padding: '1rem',
          }}>
          <Text>{cell.getValue() as React.ReactNode}</Text>
        </Box>
      );
    },
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    size: 120,
    Cell: ({ cell }) => {
      const firstName = cell.getValue() as string;
      return (
        <Box
          style={{
            background: firstName.length < 5 ? 'orange' : '',
            padding: '1rem',
          }}>
          <Text>{cell.getValue() as React.ReactNode}</Text>
        </Box>
      );
    },
  },
  {
    accessorKey: 'company',
    header: 'Company',
    size: 300,
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'country',
    header: 'Country',
    size: 220,
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

const Example = () => {
  const handleExportRows = (rows: MRT_Row<Person>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    // mantineTableProps: {
    //   highlightOnHover: false,
    //   withColumnBorders: true,
    //   // withBorder: colorScheme === 'light',
    //   sx: {
    //     'thead > tr': {
    //       backgroundColor: 'inherit',
    //     },
    //     'thead > tr > th': {
    //       backgroundColor: 'inherit',
    //     },
    //     'tbody > tr > td': {
    //       backgroundColor: 'inherit',
    //       padding: 0,
    //     },
    //   },
    // },
    mantineTableBodyCellProps: (row) => {
      // 特定の条件に基づいてスタイルを適用
      // if (row.row.original.firstName === 'Elenora') {
      //   return {
      //     style: {
      //       backgroundColor: 'black',
      //       color: 'orange',
      //     },
      //   };
      // }
      return {
        style: {
          padding: 0,
        },
      }; // その他の場合はデフォルトのスタイル
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}>
        <Button
          color='lightblue'
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          leftIcon={<IconDownload />}
          variant='filled'>
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          leftIcon={<IconDownload />}
          variant='filled'>
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          leftIcon={<IconDownload />}
          variant='filled'>
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          leftIcon={<IconDownload />}
          variant='filled'>
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default Example;
