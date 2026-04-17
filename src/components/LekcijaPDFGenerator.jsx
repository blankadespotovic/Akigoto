import {jsPDF} from "jspdf";
import {formatirajVrijeme} from "../util/dateTimeFormatter.js";
import KategorijeService from "../services/kategorije/KategorijeService.js";
import autoTable from "jspdf-autotable";

export default function LekcijPDFGenerator({lekcija, postignuca, ucenici}) {

    const fetchFontAsBase64 = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Font nije pronađen: ${url}`);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(",")[1]);
            reader.readAsDataURL(blob);
        });
    };

    const generirajPDF = async () => {
        const [regBase64, boldBase64] = await Promise.all([
            fetchFontAsBase64("/fonts/Roboto-Regular.ttf"),
            fetchFontAsBase64("/fonts/Roboto-Bold.ttf")
        ]);

        const doc = new jsPDF();

        // 2. Registracija REGULAR verzije
        doc.addFileToVFS("Roboto-Regular.ttf", regBase64);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");

        // 3. Registracija BOLD verzije
        // Ključno: isto ime 'Roboto', ali stil 'bold'
        doc.addFileToVFS("Roboto-Bold.ttf", boldBase64);
        doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");

        // 4. Postavi defaultni font
        doc.setFont("Roboto", "normal");
        // Dodaj logo - konvertiraj SVG u tekst (jednostavna verzija)
        doc.setFontSize(20);
        doc.setTextColor(46, 125, 50); // Zelena boja iz loga
        doc.text("AKIGOTO", 20, 20);

        doc.setFontSize(10);
        doc.setTextColor(102, 102, 102);
        doc.text("EVIDENCIJA LEKCIJA, POSTIGNUĆA I UČENIKA", 20, 27);

        // Naslov dokumenta
        doc.setFont("Roboto", "bold");
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("POPIS LEKCIJA", 20, 45);

        // Linija ispod naslova
        doc.setDrawColor(46, 125, 50);
        doc.setLineWidth(0.5);
        doc.line(20, 48, 190, 48);

        let yPosition = 60;

        // Podaci o grupi
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.text("Podaci o lekciji:", 20, yPosition);
        yPosition += 10;

        doc.setFontSize(11);
        doc.setFont(undefined, "normal");
        doc.text(`Naziv: ${lekcija.naziv}`, 25, yPosition);
        yPosition += 7;

        const pageWidth = doc.internal.pageSize.getWidth();
        const marginLeft = 15;
        const marginRight = 15;
        const usableWidth = pageWidth - marginLeft - marginRight;

        const lines = doc.splitTextToSize(lekcija.opis, usableWidth);
        lines[0] = `Opis: ${lines[0]}`;

        doc.text(lines, 25, yPosition);

        const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
        yPosition += (lines.length * lineHeight) + 3;


        doc.text(`Predviđeno trajanje: ${formatirajVrijeme(lekcija.trajanje)}`, 25, yPosition);
        yPosition += 7;
        doc.text(`Broj postignuća: ${lekcija.postignuca ? lekcija.postignuca.length : 0}`, 25, yPosition);
        yPosition += 7;
        doc.text(`Broj učenika: ${lekcija.ucenici ? lekcija.ucenici.length : 0}`, 25, yPosition);
        yPosition += 15;

        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.text("Popis postignuća:", 20, yPosition);
        yPosition += 10;

        if (postignuca && postignuca.length > 0) {
            const kategorijePostignucaLekcije = [];
            for (const postignuce of postignuca) {
                const kategorijeOdgovor = await KategorijeService.getBySifra(postignuce.kategorija)
                kategorijePostignucaLekcije.push(kategorijeOdgovor.data)
            }
            const kategorijeUnikati = [...new Map(kategorijePostignucaLekcije.map(obj => [obj.sifra, obj])).values()]

            const postignucaData = postignuca.map(postignuce => {
                return [
                    postignuce.naziv,
                    postignuce.opis,
                    kategorijeUnikati.find(k => k.sifra === postignuce.kategorija).naziv,
                    formatirajVrijeme(postignuce.procjena),
                    postignuce.zavrseno ? "+" : "-",
                ]
            });

            autoTable(doc, {
                startY: yPosition,
                head: [["Naziv", "Opis", "Kategorija", "Vremenska procjena", "Završeno"]],
                body: postignucaData,
                tableWidth: "auto",
                margin: {left: 15, right: 15},
                styles: {
                    font: "Roboto",
                    fontStyle: "normal",
                    fontSize: 10, 
                    overflow: "linebreak" 
                },
                headStyles: {
                    font: "Roboto",
                    fontStyle: "bold",
                    fillColor: [46, 125, 50],
                },
                columnStyles: {
                    0: {cellWidth: 45},
                    1: {cellWidth: 55},
                    2: {cellWidth: 20},
                    3: {cellWidth: 40, halign: "right"},
                    4: {cellWidth: 20, halign: "center"},
                }
            });
        } else {
            doc.setFontSize(11);
            doc.setFont(undefined, "italic");
            doc.text("Nema postignuća u ovoj grupi.", 25, yPosition);
        }

        yPosition = doc.lastAutoTable.finalY + 15;
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.text("Popis učenika:", 20, yPosition);
        yPosition += 10;

        if (ucenici && ucenici.length > 0) {
            const uceniciData = ucenici.map(ucenik => [
                ucenik.ime,
                ucenik.prezime,
                ucenik.email,
            ]);
            autoTable(doc, {
                startY: yPosition,
                head: [["Ime", "Prezime", "E-Mail"]],
                body: uceniciData,
                tableWidth: "auto",
                margin: {left: 15, right: 15},
                styles: {
                    font: "Roboto",
                    fontStyle: "normal",
                    fontSize: 10, 
                    overflow: "linebreak" 
                },
                headStyles: {
                    font: "Roboto",
                    fontStyle: "bold",
                    fillColor: [46, 125, 50]
                },
                columnStyles: {
                    0: {cellWidth: 50}, // Ime
                    1: {cellWidth: 50}, // Prezime
                    2: {cellWidth: 80}, // Email (njemu treba najviše mjesta)
                }
            });
        } else {
            doc.setFontSize(11);
            doc.setFont(undefined, "italic");
            doc.text("Nema učenika u ovoj grupi.", 25, yPosition);
        }

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(
                `Stranica ${i} od ${pageCount}`,
                doc.internal.pageSize.getWidth() / 2,
                doc.internal.pageSize.getHeight() - 10,
                {align: "center"}
            );
            doc.text(
                `Generirano: ${new Date().toLocaleString("hr-HR")}`,
                20,
                doc.internal.pageSize.getHeight() - 10
            );
        }

        // Otvori PDF u novom prozoru
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
    };

    return generirajPDF;
}