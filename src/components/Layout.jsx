import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

export default function Layout (props) {
    return (
        <div className="layout">
            <Header />
            {/* Intre header si footer o sa afisam copii primiti de componenta */}
            <main>{props.children}</main>
            <Footer />
        </div>
    )
}