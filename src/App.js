import { Route, Routes } from "react-router-dom";
import "./App.css";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import SectionOne from "./components/SectionOne/SectionOne";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <>
      <Container>
        <Header>Header</Header>
        <Main>
          <SectionOne>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </SectionOne>
        </Main>
        <Footer>Footer</Footer>
      </Container>
    </>
  );
};

export default App;
