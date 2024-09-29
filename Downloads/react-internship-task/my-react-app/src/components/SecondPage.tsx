import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Container } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import DepartmentList from './DepartmentList';
import { Post } from '../models/Post';

const SecondPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Card sx={{ width: '100%', mb: 5 }}>
          <CardContent>
            <Typography variant="h4" mb={2} align="center">Posts</Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid 
                rows={posts.map((post, index) => ({ ...post, id: index }))} 
                columns={columns} 
                //pageSize={5} 
                //rowsPerPageOptions={[5]} 
                pagination
              />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h5" mb={2} align="center">Departments</Typography>
            <DepartmentList />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SecondPage;
