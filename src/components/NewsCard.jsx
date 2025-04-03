import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../store/favorites/actions";
import { useContext } from "react";
import { FavoritesContext } from "../store/favorites/context";
import './NewsCard.css';

export default function NewsCard(props){
    const {favoritesDispatch} = useContext(FavoritesContext);
    const {newsId, imgSrc, title, description, hasCloseButton} = props;

    function handleRemoveFromFavorites(id) {
        const actionResult = removeFromFavorites(id);
        favoritesDispatch(actionResult);
    }
    
    return (
        <Card className="newsCard d-flex flex-column justify-content-between align-items-center h-100">
            {/* La click pe card vom fi redirectionati catre pagina cu detalii */}
            {/* Caracterul / din id-ul unei stiri il derureaza pe =React Router - deci trebuie sa il codifcam */}
            <Link to={`/news/${encodeURIComponent(newsId)}`}>
                <Card.Img src={imgSrc} variant="top" />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Link>
            {/* Daca avem buton de eliminare de la favorite atunci il afisam */}
            {hasCloseButton && (
                <Button variant="light" onClick={()=>{
                    handleRemoveFromFavorites(newsId)
                }}>
                    <span className="material-icons text-dark">close</span>
                </Button>
            )}
        </Card>
    )
}