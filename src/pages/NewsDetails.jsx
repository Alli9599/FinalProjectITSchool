import { useParams } from "react-router-dom";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetails } from "../api/adaptor";
import Layout from "../components/Layout";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../pages/NewsDetails.css";
import { getFormattedDate } from "../utils/date";
import { addToFavorites } from "../store/favorites/actions";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../store/favorites/context";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";
import Alert from "react-bootstrap/Alert";

export default function NewsDetails() {
	const [showAlert, setShowAlert] = useState(false);
	// Extragem functia care modifica state-ul global pentru stiri favorite
	const { favoritesDispatch, favoritesState } = useContext(FavoritesContext);
	// Extragem parametrul newId din url
	let { newsId } = useParams();
	// Acum vrem ca id-ul stirii sa continue / iar pentru asta trebuia sa il decodam
	newsId = decodeURIComponent(newsId);
	// Generam endpoint-ul pentru a primi detaliile unei stiri singulare
	const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);
	// Cerem datele de la server
	const newsDetailsData = useFetch(newsDetailsEndpoint);
	// Adaptam datele venite de la server, doarece nu avem nevoie de toate propietatile pe care ni le trimite api-ul
	const adaptedNewsDetails = getNewsDetails(newsDetailsData);
	// Extragem capurile de interes din datele adaptate
	const { title, author, content, date, description, image, thumbnail } =
		adaptedNewsDetails;

	// Formatam data
	const formattedDate = getFormattedDate(date);

	// Extragem functia de modificare a localStorage-ului. Nu avem nevoie de state-ul din localStorage, conventia este ca pentru variabile neutilizate sa punem denumirea _.
	const [_, setLocalStorageState] = useLocalStorage(
		"favorites",
		favoritesState
	);
	// Adaugarea in localStorage este un efect, atunci cand se modifica produsele favorite.
	// Cum stim ca s-au modificat stirile favorite? Primim o noua valoare a lui favoritesState.
	useEffect(() => {
		setLocalStorageState(favoritesState);
	}, [favoritesState, setLocalStorageState]);

	function handleAddToFavorites(news) {
		// Apelam actiunea de adaugare la favorite
		const actionResult = addToFavorites(news);
		// Trimitem rezultatul actiunii catre reducer:
		favoritesDispatch(actionResult);
		setShowAlert(true);
	}

	return (
		<Layout>
			<Container className="newsDetails my-5">
				<Row className="d-flex justify-content-center">
					{showAlert && (
						<Alert
							key="success"
							variant="success"
							onClose={() => setShowAlert(false)}
							dismissible
						>
							Stirea a fost adaugata la favorite!
						</Alert>
					)}
					<Col xs={12} lg={8}>
						<h1 className="mb-5 pt-3">{title}</h1>
						<p className="fw-bold">{description}</p>
						{/* De la API imaginea ne vine sub forma de tag-uri de HTML - si pentru a le afisa pe ecran vom avea nevoie de prop-ul dangerouslySetInnerHTML */}
						<div
							dangerouslySetInnerHTML={{ __html: image }}
							className="mb-4"
						></div>
						<div className="d-flex align-items-center justify-content-between mb-4">
							<div className="fw-bold">
								<p>{author}</p>
								<p className="mb-0">{formattedDate}</p>
							</div>
							<Button
								onClick={() => {
									handleAddToFavorites({
										id: newsId,
										thumbnail,
										title,
										description,
										hasCloseButton: true,
									});
								}}
							>
								Adauga La favorite
							</Button>
						</div>
						{/* Pentru continutul stiirii de la API primim tag-uri de HTML deci trebuie din nou sa ne folosim de prop-ul dangerouslySetInnerHTML */}
						<div dangerouslySetInnerHTML={{ __html: content }}></div>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
