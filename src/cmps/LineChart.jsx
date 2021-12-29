import { Sparklines, SparklinesLine } from 'react-sparklines';

export function LineChart({ chart }) {
    const yVals = chart.data.map((point) => point.y);

    return (
        <div>
            <h4>{chart.title}</h4>
            <h4>{chart.description}</h4>
            <Sparklines data={yVals}>
                <SparklinesLine color={chart.color} />
            </Sparklines>
        </div>
    );
}
