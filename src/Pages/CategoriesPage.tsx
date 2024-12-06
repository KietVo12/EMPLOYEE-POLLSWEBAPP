import React, { useState } from 'react';
import {Container,Typography,Box,Grid,Card,CardContent,CardActions,Button,TextField,} from '@mui/material';
import { categories, Category } from '../data/mockData';
import '../Style/auth.css'; 
const CategoriesPage: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '') {
      const newCategory: Category = {
        id: categoryList.length + 1,
        name: newCategoryName.trim(),
      };
      setCategoryList([...categoryList, newCategory]);
      setNewCategoryName('');
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Phân Loại Câu Hỏi
        </Typography>
        <Box mb={3}>
          <TextField
            label="Tên danh mục mới"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ marginRight: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddCategory}>
            Thêm Danh Mục
          </Button>
        </Box>
        <Grid container spacing={2}>
          {categoryList.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{category.name}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Xem Câu Hỏi
                  </Button>
                  <Button size="small" color="secondary">
                    Xóa
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CategoriesPage;
