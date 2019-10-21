import React, { useState, useEffect } from 'react';

function HomeHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch(
            `https://api.worldtradingdata.com/api/v1/history?symbol=NDAQ&api_token=${process.env.worldtrade_key}`
        )
        .then(res => res.json())
        .then(json => setHistory(json.history));
    }, []);

    console.log('history:', history)

    return(
        <div className="HomeHistory">
            <div>NASQ HISTORY</div>
        </div>
    )
}

export default HomeHistory;