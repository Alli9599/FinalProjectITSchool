import Layout from "../components/Layout";
import { getNewCategoriesEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsList } from "../api/adaptor";
import NewsCardList from "../components/NewsCardList";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
	// Generam endpointurile pentru categoriile de stiri
	const techNewsEndpoint = getNewCategoriesEndpoint("technology", 1, 6);
	const footballNewsEndpoints = getNewCategoriesEndpoint("football", 1, 6);
	const cultureNewsEndpoints = getNewCategoriesEndpoint("culture", 1, 6);
	const booksNewsEndpoints = getNewCategoriesEndpoint("books", 1, 6);
	const travelNewsEndpoints = getNewCategoriesEndpoint ("travel", 1, 6);

	// Fetch-uim datele de la server
	const techData = useFetch(techNewsEndpoint);
	const footballData = useFetch(footballNewsEndpoints);
	const cultureData = useFetch(cultureNewsEndpoints);
	const cultureBooks = useFetch(booksNewsEndpoints);
	const cultureTravel = useFetch(travelNewsEndpoints);

	// Adaugam/parsam datele venite de la server:
	const adaptedTechData = getNewsList(techData);
	const adaptedFootballData = getNewsList(footballData);
	const adaptedCultureData = getNewsList(cultureData);
	const adaptedBooksData = getNewsList(cultureBooks);
	const adaptedTravelData = getNewsList(cultureTravel);

	return (
		<Layout>
			<section className="tech my-5">
				<Container>
					<h1 className="mb-5 pt-3">Tech</h1>
					<NewsCardList newsList={adaptedTechData} />
					<p>
						Vezi toate stirile legate de tehnologie in sectiunea:{" "}
						<Link to="/category/technology" className="text-secondary">
							Tech
						</Link>
					</p>
				</Container>
			</section>
			<section className="tech my-5">
				<Container>
					<h1 className="mb-5 pt-3">Football</h1>
					<NewsCardList newsList={adaptedFootballData} />
					<p>
						Vezi toate stirile legate de fotbal in sectiunea:{" "}
						<Link to="/category/football" className="text-secondary">
							Football
						</Link>
					</p>
				</Container>
			</section>
			<section className="tech my-5">
				<Container>
					<h1 className="mb-5 pt-3">Cultura</h1>
					<NewsCardList newsList={adaptedCultureData} />
					<p>
						Vezi toate stirile legate despre medicina in sectiunea:{" "}
						<Link to="/category/culture" className="text-secondary">
							Cultura
						</Link>
					</p>
				</Container>
				<Container>
					<h1 className="mb-5 pt-3">Books</h1>
					<NewsCardList newsList={adaptedBooksData} />
					<p>
						Vezi toate stirile legate despre carti in sectiunea:{" "}
						<Link to="/category/books" className="text-secondary">
							Books
						</Link>
					</p>
				</Container>
				<Container>
					<h1 className="mb-5 pt-3">Travel</h1>
					<NewsCardList newsList={adaptedTravelData} />
					<p>
						Vezi toate stirile legate despre calatorii in sectiunea:{" "}
						<Link to="/category/travel" className="text-secondary">
							Travel
						</Link>
					</p>
				</Container>
			</section>
			<section className="my-5">
				<Container>
					<h1 className="mb-5 pt-3">Favorite</h1>
					<p>
						Vrei sa iti salvezi stirile favorite pentru a le reciti mai tarziu?
					</p>
					<p>
						In cadrul fiecarei stiri gasesti un buton prin care poti adauga
						stirea la favorite
					</p>
					<p>
						Vezi sectiunea:{" "}
						<Link to="/favorites" className="text-secondary">
							Favorite
						</Link>
					</p>
				</Container>
			</section>
		</Layout>
	);
}
