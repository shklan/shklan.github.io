import React from "react";
import ReactDOM from "react-dom";
import StatTable from "./components/StatTable";
import SkillTable from "./components/SkillTable";
import PhobiaTable from "./components/PhobiaTable";

class Sheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: {
                "体力": 0,
                "運命力": 0,
                "速力": 0,
                "人脈力": 0,
                "知力": 0,
                "教養力": 0,
            },
            base: {
                currentHp: 0,
                maxHp: 0,
                currentSp: 0,
                maxSp: 0,
                currentPp: 0,
            },
            skill: {
                currentCommon: 0,
                maxCommon: 0,
                currentSpecial: 0,
                maxSpecial: 0,
                category: "",
                list: new Array(),
            },
            phobia: "",
        };
    }

    render() {
        console.debug(this.state);
        return (
            <div className="sheet">
                <StatTable
                    stats={this.state.stats}
                    setStat={(stat) => this.setStat(stat)}
                />
                <SkillTable
                    skill={this.state.skill}
                    setCategory={(c) => this.setCategory(c)}
                    setList={(l) => this.setList(l)}
                />
                <PhobiaTable
                    phobia={this.state.phobia}
                    setPhobia={(p) => this.setPhobia(p)}
                />
            </div>
        );
    }

    setCategory(category) {
        const newSkill = Object.assign({}, this.state.skill);
        newSkill.category = category;
        this.setSkill(newSkill);
    }

    setList(list) {
        const newSkill = Object.assign({}, this.state.skill);
        newSkill.list = list;
        this.setSkill(newSkill);
    }

    setStat(newStats) {
        this.updateBase(newStats);
        this.updateSkill(newStats);
        this.setState({stats: newStats});
    }

    setBase(newBase) {
        this.setState({base: newBase});
    }

    updateBase(stats) {
        const newBase = Object.assign({}, this.state.base);
        newBase.maxHp = stats["体力"] * 2;
        newBase.maxSp = stats["運命力"] * 2;
        this.setBase(newBase);
    }

    setSkill(newSkill) {
        this.setState({skill: newSkill});
    }

    updateSkill(stats) {
        const newSkill = Object.assign({}, this.state.skill);
        newSkill.maxCommon = stats["知力"] + stats["運命力"];
        newSkill.maxSpecial = stats["知力"] + stats["教養力"];
        this.setSkill(newSkill);
    }

    setPhobia(newPhobia) {
        this.setState({phobia: newPhobia})
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Sheet/>, app);
