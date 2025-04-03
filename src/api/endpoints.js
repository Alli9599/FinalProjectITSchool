// Mentinem intr-o constanta API KEY-ul - nu este safe sa tinem cheia aici, ea ar trebui sa fie posa pe un server.
const API_KEY = "25753974-d9c1-41dd-a0aa-3a9b6c0d73b5";

// Functie ce ne returneaza mai multe stiri dupa o categorie
// PageNumber si pageSize vor avea valori default - adica daca un parametru nu este trimis cand functia se apeleaza inseamna ca acea v ariabila va lua valoare default care e specificata cand se defineste parametrul
export function getNewCategoriesEndpoint(category, pageNumber = 1, pageSize = 20) {
    // Cqtre api-ul de la guardian trebuie sa trimitem un payload care consta in mai multe query params: apiKey, section(categoria), show-fields (adica sa ne dea toate detaliile despre stire), page-size (numarul de stiri pe care sa le returneze) si page (numarul paginii curente)
    const queryParams = `?api-key=${API_KEY}&section=${category}&show-fields=all&page-size=${pageSize}&page=${pageNumber}`;

    // Returnam link-ul aferent API-ului de la the Guardian cu query params de mai sus
    return `https://content.guardianapis.com/search${queryParams}`;
}

// Functie ce returneaza ednpoint-ul pentru o singura stire
export function getNewsDetailsEndpoint (newsId) {
    const queryParams = `?api-key=${API_KEY}&show-fields=all`;
    return `https://content.guardianapis.com/${newsId}${queryParams}`
}