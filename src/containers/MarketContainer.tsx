import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { getProducts } from '../services';
import { saveProducts, saveFilters, saveIndicator, saveSearch, updateFavorites } from '../ducks/data'
import { wsConnect, wsForceDisconnect } from '../ducks/socket'
import { Models, Enums } from '../interfaces'

import FilterLayout from "../components/FilterLayout";
import MarketTabs from "../components/MarketTabs";
import MarketSearch from "../components/MarketSearch";
import MarketIndicatorTypes from "../components/MarketIndicatorTypes";
import MarketTable from "../components/MarketTable";
import WSCloseConnectionButton from "../components/WSCloseConnectionButton";
import { getPrepairedData } from "../utils";

interface IProps {
  saveProducts: (products: Models.IProduct[]) => any
  updateFavorites: (favorites: React.ReactText[]) => any
  saveFilters: (filters: any) => any
  saveIndicator: (indicator: any) => any
  saveSearch: (search: any) => any
  wsConnect: () => any
  wsForceDisconnect: () => any
  products?: any,
  filters?: any,
  indicator?: string,
  search?: string,
  wsIsConnected?: boolean,
  wsIsConnecting?: boolean,
  favoriteKeys: React.ReactText[]
}

class MarketContainer extends Component<IProps, {}> {

  fetchProducts = async () => {
    try {
      const { data: { data } } = await getProducts()

      this.props.saveProducts(data)

      this.setState({ isLoading: false, errors: null })
    } catch (err) {
      this.setState({ isLoading: false, errors: err.message })
    }
  }

  componentDidMount() {
    const { wsIsConnected, wsIsConnecting } = this.props;

    this.fetchProducts();
    if (!wsIsConnected && !wsIsConnecting) {
      this.props.wsConnect();
    }
  }

  getColumns = (indicator?: string) => {
    let columns: any[] = [
      {
        title: 'Pair',
        dataIndex: 'pair',
        key: 'pair',
        render: (pair: string) => <span>{pair}</span>,
        sorter: (curr: any, next: any) => curr.pair.localeCompare(next.pair)
      },
      {
        title: 'Last Price',
        dataIndex: 'lastPrice',
        key: 'lastPrice',
        render: (price: string) => <span>{price}</span>,
        sorter: (curr: any, next: any) => curr.lastPrice - next.lastPrice
      }
    ];
    if (indicator === Enums.Indicator.VOLUME) {
      columns.push(
        {
          title: 'Volume',
          dataIndex: 'volume',
          key: 'volume',
          render: (volume: string) => <span>{volume}</span>,
          sorter: (curr: any, next: any) => curr.volume - next.volume
        }
      )
    } else {
      columns.push(
        {
          title: 'Change',
          dataIndex: 'change',
          key: 'change',
          render: (change: string) => <span>{change}</span>,
          sorter: (curr: any, next: any) => parseFloat(curr.change) - parseFloat(next.change)
        }
      )
    }

    return columns
  }

  render() {
    const { wsForceDisconnect, products, filters, indicator, search, saveFilters, saveSearch, saveIndicator, updateFavorites, favoriteKeys} = this.props

    const dataSource = getPrepairedData(products, filters, search, favoriteKeys)

    return (
      <div className="container">
        <WSCloseConnectionButton
          wsForceDisconnect={wsForceDisconnect}
        />
        <FilterLayout>
          <MarketTabs
            filters={filters}
            saveFilters={saveFilters}
          />
          <FilterLayout>
            <MarketSearch
              search={search}
              saveSearch={saveSearch}
            />
            <MarketIndicatorTypes
              indicator={indicator}
              saveIndicator={saveIndicator}
            />
          </FilterLayout>
        </FilterLayout>
        <MarketTable
          updateFavorites={updateFavorites}
          favoriteKeys={favoriteKeys}
          dataSource={dataSource}
          columns={this.getColumns(indicator)}
        />
      </div>
    )
  }
}

const mapStateToProps = (
  {
    data: { products, filters, indicator, search, favoriteKeys },
    socket: { wsIsConnected, wsIsConnecting }
  }: {
    data: { products: any, filters: any, indicator: string, search: string, favoriteKeys: React.ReactText[] },
    socket: { wsIsConnected: boolean, wsIsConnecting: boolean }
  }) => ({
  products,
  filters,
  indicator,
  search,
  wsIsConnected,
  wsIsConnecting,
  favoriteKeys
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveProducts: (products: Models.IProduct[]) => saveProducts(products, dispatch),
  updateFavorites: (favorites: React.ReactText[]) => updateFavorites(favorites, dispatch),
  saveFilters: (filters: any) => saveFilters(filters.tab, filters.alts, filters.fiat, dispatch),
  saveIndicator: (indicator: string) => saveIndicator(indicator, dispatch),
  saveSearch: (search: string) => saveSearch(search, dispatch),
  wsConnect: () => wsConnect(dispatch),
  wsForceDisconnect: () => wsForceDisconnect(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketContainer);
