export interface Question {
    id: number;
    title: string;
    content: string;
    categoryId: number;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  
  export const categories: Category[] = [
    { id: 1, name: 'Khoa học' },
    { id: 2, name: 'Công nghệ' },
    { id: 3, name: 'Toán học' },
    // Thêm các danh mục khác
  ];
  
  export const questions: Question[] = [
    { id: 1, title: 'Câu hỏi về Vật lý', content: 'Nội dung câu hỏi 1', categoryId: 1 },
    { id: 2, title: 'Câu hỏi về Lập trình', content: 'Nội dung câu hỏi 2', categoryId: 2 },
    { id: 3, title: 'Câu hỏi về Đại số', content: 'Nội dung câu hỏi 3', categoryId: 3 },
    // Thêm các câu hỏi khác
  ];
  