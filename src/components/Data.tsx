import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DepartmentTree from './Dropdown/DropdownMenu';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
];

const Data = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = response.data;
    setRows(data);
  };
  fetchData();
}, []);


  return (
    <>
    <DataGrid
      rows={rows}
      columns={columns} 
      pageSizeOptions={[10, 20, 50]}
      checkboxSelection
    />
    <DepartmentTree />
    </>
  );
};

export default Data