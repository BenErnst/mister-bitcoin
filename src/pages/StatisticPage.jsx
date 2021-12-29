import { Component } from 'react';
import { BitcoinService } from '../services/BitcoinService';
import { utilService } from '../services/utilService.js';
import { LineChart } from '../cmps/LineChart';
import { BarChart } from '../cmps/BarChart';

export class StatisticPage extends Component {
    state = {
        charts: [],
    };

    componentDidMount() {
        this.loadCharts();
    }

    loadCharts = async () => {
        const { charts } = this.state;
        const lineProperties = await BitcoinService.getMarketPrice();
        const barProperties = await BitcoinService.getTradeVolume();
        const { lineDescription } = lineProperties;
        const { barDescription } = barProperties;
        const lineChart = {
            id: utilService.makeId(),
            title: lineProperties.name,
            data: lineProperties.values,
            description: lineDescription,
        };
        const barChart = {
            id: utilService.makeId(),
            title: barProperties.name,
            data: barProperties.values,
            description: barDescription,
        };
        this.setState({ charts: [...charts, lineChart, barChart] });
    };

    render() {
        const [lineChart, barChart] = this.state.charts;

        if (!this.state.charts.length)
            return <img src={require(`../img/loading.gif`)} className="loading-gif" />;
        return (
            <div className="charts-container">
                <LineChart chart={lineChart} />
                <BarChart chart={barChart} />
            </div>
        );
    }
}
