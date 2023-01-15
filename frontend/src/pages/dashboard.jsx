import { LabelsCountChart } from '../cmps/labels-count-chart'
import { LabelsPriceChart } from '../cmps/labels-price-chart'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadToys } from '../store/toy.action';

export function Dashboard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const { labelsPriceMap, labelsCountMap } = getChartsData()

    useEffect(() => {
        loadToys()
    }, [])

    function getChartsData() {
        const chartsData = toys.reduce(
            (acc, toy) => {
                toy.labels.forEach((label) => {
                    acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1
                    acc.labelsPriceMap[label] = acc.labelsPriceMap[label] ? (acc.labelsPriceMap[label] += toy.price) : toy.price
                })
                return acc
            }, { labelsCountMap: {}, labelsPriceMap: {} }
        )
        Object.keys(chartsData.labelsPriceMap).forEach((label) => (chartsData.labelsPriceMap[label] /= chartsData.labelsCountMap[label]))
        return chartsData
    }

    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <div className="charts flex">
                <LabelsCountChart dataMap={labelsCountMap} />
                <LabelsPriceChart dataMap={labelsPriceMap} />
            </div>
        </section>
    )

}