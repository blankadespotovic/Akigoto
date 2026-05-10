import {useEffect, useState} from "react";

import Highcharts from "highcharts";
import HCR from "highcharts-react-official";
import KategorijeService from "../services/kategorije/KategorijeService.js";
import PostignucaService from "../services/postignuca/PostignucaService.js";
import useLoading from "../hooks/useLoading.js";

import {Container} from "react-bootstrap";

const PieChart = HCR.default;

export default function NadzornaPloca() {
    const [podaci, setPodaci] = useState([]);
    const {showLoading, hideLoading} = useLoading();


    useEffect(() => {

        const getPodaci = async () => {
            showLoading();
            const {data: kategorijeData} = await KategorijeService.get();
            const {data: postignucaData} = await PostignucaService.get();
            const parsedData = kategorijeData.map((kat) => {
                const postignucaKategorije = postignucaData.filter((pos) =>
                    Number.parseInt(pos.kategorija) === Number.parseInt(kat.sifra)
                );
                return {
                    y: postignucaKategorije.length,
                    name: kat.naziv,
                };
            });
            setPodaci(parsedData);
            hideLoading();
        }
        
        void getPodaci();
    }, [hideLoading, showLoading]);

    const fixedOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
        },
        title: {
            text: "Postignuća po kategorijama",
            align: "left",
        },
        tooltip: {
            pointFormat: "<b>{point.y}&nbsp;{series.name}</b> ({point.percentage:.1f}%)",
        },
        accessibility: {
            enabled: false,
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>",
                },
            },
        },
    };


    return (
        <Container className="mt-4">
            {podaci.length > 0 && (
                <PieChart
                    highcharts={Highcharts}
                    options={{
                        ...fixedOptions,
                        series: [
                            {
                                name: "postignuća",
                                colorByPoint: true,
                                data: podaci,
                            },
                        ],
                    }}
                />
            )}
        </Container>
    );
}