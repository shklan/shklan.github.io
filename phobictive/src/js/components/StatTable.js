import React from "react";
import Stat from "./StatTable/Stat";

export default class StatTable extends React.Component {
    render() {
        return (
            <div className="statTable">
                <table><tbody>
                    <tr>
                        <th colSpan="2">能力値</th>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button onClick={() => this.setStatRandomly()}>
                                ダイスを振る（全体）
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Stat
                                name={"体力"}
                                value={this.props.stats["体力"]}
                                onChange={(e) => this.setStat("体力", e)}
                            />
                        </td>
                        <td>
                            <Stat
                                name={"運命力"}
                                value={this.props.stats["運命力"]}
                                onChange={(e) => this.setStat("運命力", e)}
                            />
                        </td> 
                    </tr>
                    <tr>
                        <td>
                            <Stat
                                name={"速力"}
                                value={this.props.stats["速力"]}
                                onChange={(e) => this.setStat("速力", e)}
                            />
                        </td>
                        <td>
                            <Stat
                                name={"人脈力"}
                                value={this.props.stats["人脈力"]}
                                onChange={(e) => this.setStat("人脈力", e)}
                            />
                        </td> 
                    </tr>
                    <tr>
                        <td>
                            <Stat
                                name={"知力"}
                                value={this.props.stats["知力"]}
                                onChange={(e) => this.setStat("知力", e)}
                            />
                        </td>
                        <td>
                            <Stat
                                name={"教養力"}
                                value={this.props.stats["教養力"]}
                                onChange={(e) => this.setStat("教養力", e)}
                            />
                        </td>
                    </tr>
                </tbody></table>
            </div>
        );
    }

    setStatRandomly() {
        console.debug("ダイスを振ります");
        const dice = new Dice(2, 6);
        const newStats = Object.assign({}, this.props.stats);
        const keys = Object.keys(newStats);
        keys.forEach((key) => {
            newStats[key] = dice.dRoll();
        });
        this.props.setStat(newStats);
    }

    setStat(key, event) {
        console.debug("set " + key);
        console.debug(event.target.value);

        const value = Number(event.target.value);
        const newStats = Object.assign({}, this.props.stats);
        newStats[key] = value;
        this.props.setStat(newStats);
    }
}

class Dice {
    constructor(diceNum, diceSize) {
        this.diceNum = diceNum;
        this.diceSize = diceSize;
    }

    dRoll() {
        const result = this.bRoll();
        return result.reduce((tmp, v) => tmp + v, 0);
    }

    bRoll() {
        const result = new Array();
        for(let i=0; i<this.diceNum; i++) {
            result.push(Math.floor(Math.random()*this.diceSize) + 1);
        }
        return result;
    }
}