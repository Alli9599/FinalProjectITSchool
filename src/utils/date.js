// Exportam o functie utilitara care sa ne formateze data
export function getFormattedDate (dateString) {
    const currentDate = new Date(dateString);
    let  day = currentDate.getDate();
    let mounth = currentDate.getMonth();
    const year = currentDate.getFullYear();
    if (day < 10) { day = "0" + day }
    if (mounth <10 ) {mounth = `0${mounth}`};
    return `${day}/${mounth}/${year}`;   
}