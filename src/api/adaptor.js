// Ne definim o functie care pe baza raspunsului de la API-ul the guardian - o sa ne returnee doar propietatile de care noi avem noi nevoie pentru lista cu stiri
export function getNewsList (apiResponse) {
    // Daca raspunsul de la api nu contine date, atunci returnam un array gol
    if (!apiResponse || !apiResponse.response) {
        return [];
    }
    // Extragem datele din raspunsul api-ului
    const apiData = apiResponse.response.results;
    // Mapam datele de la API si le transformam in formatul de care avem nevoie:
    const adaptatedData = apiData.map((news) => {
        return {
            id: news.id,
            thumbnail: news.fields.thumbnail,
            title: news.fields.headline,
            description: news.fields.trailText
        }
    });

    // Returnam datele parsate:
    return adaptatedData;
}

// Ne mai definim o functie care parseaza dateel despre o stire singulara
export function getNewsDetails (apiResponse) {
    if (!apiResponse || !apiResponse.response) {
        return [];
    }

    // Extragem datele de la api
    const apiData = apiResponse.response.content;
    // Pasam datele despre stirea soingulara
    return {
        date: apiData.webPublicationDate,
        title: apiData.fields.headline,
        description: apiData.fields.trailText,
        image: apiData.fields.main,
        content: apiData.fields.body,
        author: apiData.fields.byline,
        thumbnail: apiData.fields.thumbnail
    }
}