import React from "react";
import Category from "./SkillTable/Category";

export default class SkillTable extends React.Component {
    render() {
        return (
            <div className="skillTable">
                <table><tbody>
                    <tr>
                        <th colSpan="2">スキル</th>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <Category 
                                onChange={(e) => this.setCategory(e)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                共通スキルポイント
                            </div>
                            <div>
                                {this.props.skill.currentCommon} / {this.props.skill.maxCommon}
                            </div>
                        </td>
                        <td>
                            <div>
                                専門スキルポイント
                            </div>
                            <div>
                                {this.props.skill.currentSpecial} / {this.props.skill.maxSpecial}
                            </div>
                        </td>
                    </tr>
                </tbody></table>
            </div>
        );
    }

    setCategory(event) {
        const category = event.target.value;
        this.props.setCategory(category);
    }

    setList(event) {
        
    }
}