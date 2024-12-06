import React from 'react';
import { useParams } from 'react-router-dom';
import {Container,Typography,Box,List,ListItem,ListItemText,Paper,Divider,} from '@mui/material';
import { questions, Question } from '../data/mockData';
import '../Style/auth.css'; 

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = parseInt(id || '0', 10);

  // Lấy danh sách câu hỏi trong danh mục dựa trên `categoryId`
  const filteredQuestions = questions.filter((q) => q.categoryId === categoryId);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Danh Mục {categoryId}
        </Typography>
        <Paper elevation={3}>
          <List>
            {filteredQuestions.map((question) => (
              <React.Fragment key={question.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={question.title}
                    secondary={question.content}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default CategoryDetailPage;
