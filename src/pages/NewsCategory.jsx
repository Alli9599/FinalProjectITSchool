import { useParams, useSearchParams } from "react-router-dom";
import { getNewCategoriesEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsList } from "../api/adaptor";
import Layout from "../components/Layout";
import { Container } from "react-bootstrap";
import NewsCardList from "../components/NewsCardList";
import Pagination from "../components/Pagination";

export default function NewsCategory() {
	// Extragem parametrul venit in URL
	const { categoryId } = useParams();

	// Extrage, query-ul din search pentru currentPage
	const [queryParams] = useSearchParams();
	let currentPage = queryParams.get("page");
	// Daca nu ave, query param un url inseamna ca suntem pe prim pagina
	if (!currentPage) {
		currentPage = 1;
	}
	// Generam enpoint-ul catre care sa facem call-ul la server

	const newsCategoryEndpoint = getNewCategoriesEndpoint(
		categoryId,
		currentPage
	);
	// fetch-uim datele de la The Guardian
	const newsData = useFetch(newsCategoryEndpoint);
	// Adaptam datele venite de la server
	const adaptedNewsData = getNewsList(newsData);

	// In functie de paramentrul primit in URL, decidem ce titlu sa aratam
	let title = "";
	switch (categoryId) {
		case "technology":
			title = "Tech";
			break;
		case "football":
			title = "Football";
			break;
		case "culture":
			title = "Cultura";
			break;
		default:
			break;
	}

	return (
		<Layout>
			<Container className="my-5">
				<h1 className="mb-5 pt-3">{title}</h1>
				{/* Afisam lista cu stiri */}
				<NewsCardList newsList={adaptedNewsData} />
				{/* Affisam paginatia */}
				<Pagination active={currentPage} baseUrl={`/category/${categoryId}`} />
			</Container>
		</Layout>
	);
}
