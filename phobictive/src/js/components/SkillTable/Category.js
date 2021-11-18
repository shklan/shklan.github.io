import React from "react";

export default class Category extends React.Component {
    render() {
        return (
            <div className="category">
                <div>
                    <select
                        name="category"
                        onChange={(e) => this.props.onChange(e)}
                    >
                        <option hidden>クラスを選択してください</option>
                        <option value="holmes">ホームズ・クラス</option>
                        <option value="watson">ワトソン・クラス</option>
                        <option value="maigret">メグレ・クラス</option>
                    </select>
                </div>
            </div>
        );
    }
}