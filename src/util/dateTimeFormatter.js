export const formatirajVrijeme = (ukupnoMinuta) => {
    if (!ukupnoMinuta && ukupnoMinuta !== 0) return ""

    const sati = Math.floor(ukupnoMinuta / 60);
    const minute = ukupnoMinuta % 60;

    if (sati === 0) return `${minute} min`;
    if (minute === 0) return `${sati} h`;

    return `${sati} h ${minute} min`;
}