import React from 'react';
import {Container,Typography,Box,List,ListItem,ListItemText,ListItemAvatar,Avatar,} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { categories } from '../data/mockData';
import '../Style/auth.css'; 
const CategoryListPage: React.FC = () => {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Danh Sách Danh Mục
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem key={category.id} button>
              <ListItemAvatar>
                <Avatar>{category.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <Link
                component={RouterLink}
                to={`/category/${category.id}`}
                color="inherit"
                underline="none"
              >
                <ListItemText primary={category.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default CategoryListPage;
