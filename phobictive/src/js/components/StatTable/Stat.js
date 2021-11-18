import React from "react";

export default class Stat extends React.Component {
    render() {
        return (
            <div className="stat">
                <div>
                    {this.props.name}
                </div>
                <div>
                    <input
                        type="number"
                        value={this.props.value}
                        onChange={(e) => this.props.onChange(e)}
                    />
                </div>
            </div>
        );
    }
}
