import {useEffect, useState} from "react";

import Highcharts from "highcharts";
import HCR from "highcharts-react-official";
import KategorijeService from "../services/kategorije/KategorijeService.js";
import PostignucaService from "../services/postignuca/PostignucaService.js";
import useLoading from "../hooks/useLoading.js";

import {CustomCard} from "../components/CustomCard.jsx";
import useBreakpoint from "../hooks/useBreakpoint.js";

const PieChart = HCR.default;

export default function NadzornaPloca() {
    const {showLoading, hideLoading} = useLoading();
    const sirina = useBreakpoint();
    
    const [podaci, setPodaci] = useState([]);

    useEffect(() => {
        const getPodaci = async () => {
            try {
                showLoading();
                const {data: kategorijeData} = await KategorijeService.get();
                const {data: postignucaData} = await PostignucaService.get();
                const parsedData = kategorijeData.map((kat) => {
                    const postignucaKategorije = postignucaData.filter((pos) =>
                        pos.kategorija === kat.sifra
                    );
                    return {
                        y: postignucaKategorije.length,
                        name: kat.naziv,
                    };
                });
                setPodaci(parsedData);
            } catch (err) {
                console.error(err)
            } finally {
                hideLoading();
            }
        }

        void getPodaci();
    }, []);

    const fixedOptions = {
        chart: {
            type: "pie",
        },
        title: {
            text: "",
        },
        legend: {
            enabled: true,
            layout: "vertical",
            align: ["xs", "sm", "md"].includes(sirina) ? "top" : "right",
            verticalAlign: ["xs", "sm", "md"].includes(sirina) ? "top" : "middle",
            symbolRadius: 0,
            symbolHeight: 12,
            symbolWidth: 12,
            symbolPadding: 8,
        },
        plotOptions: {
            pie: {
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                },
            },
        },
    };

    return (
        podaci.length > 0 && (
            <CustomCard title={"Postignuća po kategorijama"}>
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
            </CustomCard>
        )
    );
}