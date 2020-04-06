import * as React from 'react'
import { Radio, Form, Select } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { Enums } from '../interfaces'

const { Option } = Select;

const selectStyles = { width: 'calc(100% + 30px)', marginLeft: '-15px' }

interface IProps {
  filters: any,
  saveFilters: (filters: any) => any
}

interface IState {}

class MarketTabs extends React.PureComponent<IProps, IState> {

  handleTabsChange = (e: any) => {
    const { filters } = this.props

    this.props.saveFilters({
      ...filters,
      tab: e.target.value
    })
  };

  handleAltsChange = (value: string) => {
    const { filters } = this.props

    this.props.saveFilters({
      ...filters,
      tab: Enums.Common.ALTS,
      alts: value
    })
  }

  handleFiatChange = (value: string) => {
    const { filters } = this.props

    this.props.saveFilters({
      ...filters,
      tab: Enums.Common.FIAT,
      fiat: value
    })
  }

  render() {
    const { filters } = this.props;

    return (
      <div className={'filter-container'}>
        <Form.Item>
          <Radio.Group value={filters ? filters.tab : Enums.Currencies.BTC} onChange={this.handleTabsChange}>
            <Radio.Button value={Enums.Common.FAVORITE}><StarFilled /></Radio.Button>
            <Radio.Button value={Enums.Common.MARGIN}>{Enums.Common.MARGIN}</Radio.Button>
            <Radio.Button value={Enums.Currencies.BNB}>{Enums.Currencies.BNB}</Radio.Button>
            <Radio.Button value={Enums.Currencies.BTC}>{Enums.Currencies.BTC}</Radio.Button>
            <Radio.Button value={Enums.Common.ALTS}>
              <Select defaultValue={Enums.Common.ALTS} style={selectStyles} onChange={this.handleAltsChange}>
                <Option value={Enums.Common.ALTS}>{Enums.Common.ALTS}</Option>
                <Option value={Enums.Currencies.ETH}>{Enums.Currencies.ETH}</Option>
                <Option value={Enums.Currencies.TRX}>{Enums.Currencies.TRX}</Option>
                <Option value={Enums.Currencies.XRP}>{Enums.Currencies.XRP}</Option>
              </Select>
            </Radio.Button>
            <Radio.Button value={Enums.Common.FIAT}>
              <Select defaultValue={Enums.Common.FIAT} style={selectStyles} onChange={this.handleFiatChange}>
                <Option value={Enums.Common.FIAT}>{Enums.Common.FIAT}</Option>
                <Option value={Enums.Currencies.USDC}>{Enums.Currencies.USDC}</Option>
                <Option value={Enums.Currencies.USDT}>{Enums.Currencies.USDT}</Option>
              </Select>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </div>
    )
  }
}

export default MarketTabs
