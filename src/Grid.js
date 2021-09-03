import { useState } from "react";
const _ = require('underscore')
let selectedColors = []

function randColorGenerator (n) {
    const [addToColors, colors] = [() => colors.push(`rgb(${_.random(255)},${_.random(255)},${_.random(255)})`), []];
    _.times(n, addToColors)
    return colors
}

function getAverage () {
    if (selectedColors.length > 0) {
        let [selColorNums, colorSum] =  [selectedColors.map(color => 
                    color
                        .slice(4)
                        .slice(0,-1)
                        .split(",")
                        .map(coordinate => Number(coordinate))
        ), [0,0,0]]

        selColorNums.forEach(coordinate => {
            colorSum[0] += coordinate[0]
            colorSum[1] += coordinate[1]
            colorSum[2] += coordinate[2]
        })
        return colorSum.map(sumCoord => sumCoord/selectedColors.length)
    }
    return [0,0,0]
}

export default function Grid() {
    let [colors, setColors] = useState(randColorGenerator(10000))
    let [colorAvg, setColorAvg] = useState(0)

    return (
        <div>
            <h1>Colour Exploration Tool</h1>
            <div style={{display: `flex`, flexDirection: `row`}}>
                <div style={{backgroundColor: `rgb(${colorAvg[0]},${colorAvg[1]},${colorAvg[2]})`}}>
                    <h1>Color Info</h1>
                    <div>Color Average</div>
                    <div>
                        <h3>Selected Colors</h3>
                        <div style={{display: `flex`, flexDirection: `row`, flexWrap: `wrap`}}>
                        {selectedColors.map(color => 
                        <button 
                        style={{backgroundColor: color, width:`50px`, height: `50px`, margin: `0`}}
                        onClick={() => {
                            selectedColors.push(color)
                            setColorAvg(getAverage())
                        }}>selected</button>
                    )}
                        </div>
                    </div>
                </div>
                <div style={{display: `flex`, flexDirection: `row`, flexWrap: `wrap`}}>
                    {colors.map(color => 
                        <button 
                        style={{backgroundColor: color, width:`50px`, height: `50px`, margin: `0`}}
                        onClick={() => {
                            selectedColors.push(color)
                            setColorAvg(getAverage())
                        }}>{color.slice(3)}</button>
                    )}
                </div>
            </div>
        </div>
    )
}