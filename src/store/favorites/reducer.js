// Prima data exportam un state initial
export const initialState = {
	news: [],
};

// Pasul urmator -> exportam reducerul care ne modifica state-ul pentru favortites
export function favoritesReducer(state, action) {
	switch (action.type) {
		case "ADD_TO_FAVORITES": {
			// Cautam daca stirea pe care s-a dat click este deja in state-ul de favorite:
			const isInList = state.news.find((newsItem) => {
				return newsItem.id === action.payload.id;
			});
			// Daca este in lista, atunci returnam state-ul curent
			if (isInList) {
				return state;
			} else {
				// Daca nu este in lista, il adagam in state la inceputul listei de stiri favorite
				const newState = {
					news: [action.payload, ...state.news],
				};
				return newState;
			}
		}
		case "REMOVE_FROM_FAVORITES": {
			// Pentru a scoate o stire de la favorite trebuie sa filtram din state elementul care are id-ul primit pe payload
			const filteredNews = state.news.filter((newsItem) => {
				return newsItem.id !== action.payload;
			});
			const newState = {
				news: filteredNews,
			};
			return newState;
		}
		// Nu uitam sa definim si un default in care sa returnam state-ul
		default: {
			return state;
		}
	}
}
