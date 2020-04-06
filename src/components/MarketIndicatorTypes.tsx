import * as React from 'react'
import {Enums} from "../interfaces";
import { Radio } from 'antd';

interface IProps {
  indicator?: string,
  saveIndicator: (indicator: string) => any
}

interface IState {}

class MarketIndicatorTypes extends React.PureComponent<IProps, IState> {

  handleIndicatorChange = (e: any) => {
    this.props.saveIndicator(e.target.value)
  };

  render() {
    return (
      <Radio.Group style={{marginLeft: 15}} value={this.props.indicator} onChange={this.handleIndicatorChange}>
        <Radio.Button value={Enums.Indicator.CHANGE}>{Enums.Indicator.CHANGE}</Radio.Button>
        <Radio.Button value={Enums.Indicator.VOLUME}>{Enums.Indicator.VOLUME}</Radio.Button>
      </Radio.Group>
    )
  }
}

export default MarketIndicatorTypes
