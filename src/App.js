import { Route, Routes } from "react-router-dom";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import SectionOne from "./components/SectionOne/SectionOne";
import Login from "./components/Login/Login";
import MainPage from "./components/MainPage/MainPage";
import Forbbiden from "./components/Forbbiden/Forbbiden";
import Master from "./components/Master/Master";
import ProveedoresList from "./components/Proveedores/ProveedoresList";
import ProveedoresMant from "./components/Proveedores/ProveedoresMant";

const App = () => {
    return (
        <>
            <Container>
                <Header>Header</Header>
                <Main>
                    <SectionOne>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/main-page" element={<MainPage />} />
                            <Route path="/forbbiden" element={<Forbbiden />} />
                            <Route path="/main-page/master" element={<MainPage children={<Master />} />} />
                            <Route path="/main-page/master/proveedores/" element={<MainPage children={<ProveedoresList />} />} />
                            <Route path="/main-page/master/proveedores/:id" element={<MainPage children={<ProveedoresMant />} />} />
                        </Routes>
                    </SectionOne>
                </Main>
                <Footer>Footer</Footer>
            </Container>
        </>
    );
};

export default App;
