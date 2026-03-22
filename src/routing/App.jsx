import Home from "../components/Home/Home";
import { Routes, Route } from "react-router-dom";
import MasterTable from "../components/master-table/MasterTable";
import AddQuestion from "../components/question/AddQuestion";
import Subject from "../components/master-table/Subject";
import Topic from "../components/master-table/Topic";
import InActiveQuestion from "../components/question/InActiveQuestion";
import EditQuestion from "../components/question/EditQuestion";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import QuestionManager from "../components/question/QuestionManager";
import { ToastContainer } from "react-toastify";
import ConceptForm from "../components/concept/ConceptForm";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route path="/master-table" element={<MasterTable />} />
            <Route path="/master-table/subject" element={<Subject />} />
            <Route path="/master-table/topic" element={<Topic />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/question-manager" element={<QuestionManager />} />
            <Route path="/questions/in-active" element={<InActiveQuestion />} />
            <Route path="/question/edit/:id" element={<EditQuestion />} />
            <Route path="concept" element={<ConceptForm />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
