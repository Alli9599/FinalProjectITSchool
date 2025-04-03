import { useNavigate } from "react-router-dom";
import BootstrapPagination from "react-bootstrap/Pagination";
import './Pagination.css';

export default function Pagination (props) {
    // Componenta va primi ca si props nr paginii care este activa dar si URL-ul catre care redirectioneaza la click pe o noua pagina
    let {active, baseUrl} = props;
    // Folofim hook-ul useNavigate
    let navigate = useNavigate();

    // Daca nu primim nici o valoare pentru active, atunci pagina 1 este cea activa
    if (!active) {
        active = 1;
    }

    // Tinem intr-un array stirile grupate pe pagina
    let items = [];
    for (let number = 1; number <=5; number++) {
        items.push (
            <BootstrapPagination.Item
            key={number}
            active={number === Number(active)}
            id={active ? "pagination-active" : null}
            onClick={() => {
                // La click pe buton navigam pe noua pagina
                navigate (`${baseUrl}?page=${number}`)
                // Si scrolam in top-ul paginii
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }}>{number}</BootstrapPagination.Item>
        )
    }

    return (
        <div className="d-flex justify-content-center">
            <BootstrapPagination className="pagination">{items}</BootstrapPagination>
        </div>
    )
}