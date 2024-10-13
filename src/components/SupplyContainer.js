import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Chance from 'chance';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';

const chance = new Chance(42);

function createData(id) {
  return {
    id,
    name: chance.first(),
    category: chance.last(),
    quantity: chance.age(),
    phone: chance.phone(),
    measure: chance.state({ full: true }),
  };
}

const columns = [
  {
    width: 100,
    label: 'Nombre',
    dataKey: 'name',
  },
  {
    width: 100,
    label: 'Categoría',
    dataKey: 'category',
  },
  {
    width: 50,
    label: 'Cantidad Existente',
    dataKey: 'quantity',
    numeric: true,
  },
  {
    width: 110,
    label: 'Unidad de Medida',
    dataKey: 'measure',
  },
  {
    width: 130,
    label: 'Phone Number',
    dataKey: 'phone',
  },
];

const rows = Array.from({ length: 200 }, (_, index) => createData(index));

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: '#fafafa' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}


const SupplyContainer = () => {
  console.log(rows[0]);
  return (
    <Box>
      <Box m={2}>
        <SearchBar />
      </Box>
      
      <Paper style={{ height: 400, width: '100%' }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </Box>
    
  );
}

export default SupplyContainer;
