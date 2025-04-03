import { useContext, useEffect } from "react";
import { FavoritesContext } from "../store/favorites/context";
import Layout from "../components/Layout";
import { Container } from "react-bootstrap";
import NewsCardList from "../components/NewsCardList";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

export default function Favorites() {
	// extragem din state-ul global stirile favorite
	const { favoritesState } = useContext(FavoritesContext);
	const { news } = favoritesState;
	// Extragem functia de modificare a localStorage-ului.
	const [_, setLocalStorageState] = useLocalStorage(
		"favorites",
		favoritesState
	);
	// Adaugarea in localStorage este un efect, atunci cand se modifica produsele favorite.
	// Cum stim ca s-au modificat stirile favorite? Primim o noua valoare a lui favoritesState.
	useEffect(() => {
		setLocalStorageState(favoritesState);
	}, [favoritesState, setLocalStorageState]);

	return (
		<Layout>
			<Container className="my-5">
				<h1 className="mb-5 pt-3">Stirile tale favorite</h1>
				{/* Afisam pe ecran un mesaj daca nu avem stiri favorite, altfel aratam stirile */}
				{news.length === 0 ? (
					<p>Nu ai nici o stire adaugata la favorite</p>
				) : (
					<NewsCardList newsList={news} />
				)}
			</Container>
		</Layout>
	);
}
