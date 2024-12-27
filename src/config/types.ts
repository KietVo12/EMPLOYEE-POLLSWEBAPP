// Định nghĩa các props cơ bản cho một section
export interface SectionProps extends React.HTMLProps<HTMLDivElement> {
	name: string;
	path: string;
	title: string;
}

// Định nghĩa một action trong Redux
export type ReduxAction = {
	type: string;
	payload?: any; // Payload có thể là bất kỳ kiểu dữ liệu nào
}

// Định nghĩa kiểu dữ liệu User
export type User = {
	id: string; // ID người dùng
	password: string; // Mật khẩu
	name: string; // Tên người dùng
	avatarURL: string; // URL avatar
	answers?: Record<string, string>; // Các câu trả lời của người dùng (id câu hỏi -> lựa chọn đã chọn)
	questions?: string[]; // Danh sách các câu hỏi đã tạo
}

// Chi tiết người dùng (sử dụng khi không cần mật khẩu)
export type UserDetails = {
	id: string;
	name: string;
	avatarURL: string;
}

// Định nghĩa câu trả lời cho câu hỏi
export type Answer = {
	authedUser: string; // Người dùng đã trả lời
	qid: string; // ID câu hỏi
	answer: "optionOne" | "optionTwo"; // Lựa chọn (optionOne hoặc optionTwo)
}

// Định nghĩa kiểu dữ liệu cho từng lựa chọn của câu hỏi
export type Option = {
	votes: string[]; // Danh sách ID người dùng đã chọn lựa chọn này
	text: string; // Nội dung lựa chọn
}

// Định nghĩa dữ liệu đầu vào để tạo câu hỏi mới
export type QuestionData = {
	optionOneText: string; // Nội dung lựa chọn 1
	optionTwoText: string; // Nội dung lựa chọn 2
	author: string; // Tác giả của câu hỏi
}

// Định nghĩa kiểu dữ liệu câu hỏi
export type Question = {
    user: any;
	id: string; // ID câu hỏi
	timestamp: number; // Thời gian tạo câu hỏi (dạng timestamp)
	author: string; // Tác giả câu hỏi
	optionOne: Option; // Thông tin lựa chọn 1
	optionTwo: Option; // Thông tin lựa chọn 2
}

// Trạng thái phiên làm việc
export type SessionStatus = "ACTIVE" | "INACTIVE";

// Định nghĩa dữ liệu phiên làm việc
export type Session = {
	status: SessionStatus; // Trạng thái phiên
	userDetails: UserDetails | null; // Thông tin chi tiết người dùng hoặc null nếu không đăng nhập
}

// Định nghĩa thông tin đăng nhập
export type Credentials = {
	id: string; // ID người dùng
	password: string; // Mật khẩu người dùng
}

// Định nghĩa trạng thái bất đồng bộ (dùng chung)
export type AsyncState<T> = {
	items: T[]; // Danh sách các item
	status: "empty" | "loading" | "loaded"; // Trạng thái tải dữ liệu
}

// Định nghĩa trạng thái của câu hỏi (lọc)
export type QuestionStatus = "ALL" | "NEW" | "DONE"; // Tất cả, mới, hoặc đã hoàn thành
// Định nghĩa thông tin danh mục 
export interface QuestionCategoryProps {
  title: string;
    questions: Question[];
}