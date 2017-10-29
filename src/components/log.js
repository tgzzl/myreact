import '../style/log.less';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {PullToRefresh, ListView, Grid} from 'antd-mobile';

const data = [
  {
    icon: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    text: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    icon: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    text: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  }
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}

class App extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    const dataSourceGrid = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      dataSourceGrid,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      showMenu: false,
      menu: [
        [{text: '新品', value: 0}],
        [{text: '从低到高', value: 1}, {text: '从高到低', value: 2}],
      ],
      menuIndex: 0,
      gridMode: true
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  componentDidUpdate() {
    document.body.style.overflow = 'hidden';
  }

  componentDidMount() {
    if (this.state.gridMode) {
      const hei = this.state.height - ReactDOM.findDOMNode(this.lvGrid).offsetTop;
      setTimeout(() => {
        this.rGridData = genData();
        this.setState({
          dataSourceGrid: this.state.dataSourceGrid.cloneWithRows(genData()),
          height: hei,
          refreshing: false,
          isLoading: false
        });
      }, 1500);
    } else {
      const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
      setTimeout(() => {
        this.rData = genData();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(genData()),
          height: hei,
          refreshing: false,
          isLoading: false
        });
      }, 1500);
    }
  }

  onRefresh = () => {
    this.setState({refreshing: true, isLoading: true});
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  onRefreshGrid = () => {
    this.setState({refreshing: true, isLoading: true});
    // simulate initial Ajax
    setTimeout(() => {
      this.rGridData = genData();
      this.setState({
        dataSourceGrid: this.state.dataSourceGrid.cloneWithRows(this.rGridData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({isLoading: true});
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  onEndReachedGrid = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end grid', event);
    this.setState({isLoading: true});
    setTimeout(() => {
      this.rGridData = [...this.rGridData, ...genData(++pageIndex)];
      this.setState({
        dataSourceGrid: this.state.dataSourceGrid.cloneWithRows(this.rGridData),
        isLoading: false,
      });
    }, 1000);
  };

  toggle = (val, e) => {
    let name = e.target.className
    if (name.includes(' active')) {
      e.target.className = name.replace(' active', '')
    } else {
      e.target.className += ' active'
    }
    this.setState({showMenu: !this.state.showMenu, menuIndex: val})
  }

  closeMenu = (val) => {
    if (val !== null) {
      console.log(val)
    }
    this.setState({showMenu: false})
    document.querySelectorAll('.arrow__up-down').forEach(dom => dom.className = dom.className.replace(' active', ''))
  }

  toggleMode = () => {
    this.setState({gridMode: !this.state.gridMode})
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID}
             style={{
               padding: '0 15px',
               backgroundColor: 'white',
             }}
        >
          <div style={{
            height: '50px',
            lineHeight: '50px',
            color: '#888',
            fontSize: '18px',
            borderBottom: '1px solid #ddd'
          }}>
            {obj.text}
          </div>
          <div style={{display: '-webkit-box', display: 'flex', padding: '15px'}}>
            <img style={{height: '63px', width: '63px', marginRight: '15px'}} src={obj.icon} alt=""/>
            <div style={{display: 'inline-block'}}>
              <div style={{
                marginBottom: '8px',
                color: '#000',
                fontSize: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '250px'
              }}>{obj.des}-{rowData}</div>
              <div style={{fontSize: '16px'}}><span style={{fontSize: '30px', color: '#FF6E27'}}>{rowID}</span> 元/任务
              </div>
            </div>
          </div>
        </div>
      );
    };
    const grid = (rowData, sectionID, rowID) => {
      return (
        <Grid
          key={'grid-' + rowID}
          data={data}
          columnNum={2}
          square={false}
          renderItem={item => (
            <div>
              <img src={item.icon} alt={item.icon} style={{width: '180px', height: '180px'}}/>
              <p>{item.des + item.text}</p>
              <span>￥10</span>
            </div>
          )}
        />
      )
    }

    return (
      <div className="page-log">
        <header className="header">
          <span className="arrow__up-down" onClick={this.toggle.bind(this, 0)}>新品</span>
          <span className="arrow__up-down" onClick={this.toggle.bind(this, 1)}>价格</span>
          <span onClick={this.toggleMode}>模式</span>
        </header>
        <nav className="menu" style={{display: this.state.showMenu ? 'block' : 'none'}}>
          <ul>
            {this.state.menu[this.state.menuIndex].map((item) => (
              <li key={item.value} onClick={this.closeMenu.bind(this, item.value)}>{item.text}</li>
            ))}
          </ul>
          <div className="mask" onClick={this.closeMenu.bind(this, null)}></div>
        </nav>
        <ListView
          key="1"
          ref={el => this.lvGrid = el}
          style={{
            height: this.state.height,
            border: '1px solid #ddd',
            margin: '5px 0',
            display: this.state.gridMode ? 'block' : 'none'
          }}
          dataSource={this.state.dataSourceGrid}
          renderFooter={() => (
            <div style={{padding: 30, textAlign: 'center'}}>
              {this.state.isLoading ? 'Loading...' : 'Loaded'}
            </div>)}
          renderRow={grid}
          renderSeparator={separator}
          pullToRefresh={
            <PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefreshGrid}
            />}
          onEndReached={this.onEndReachedGrid}
          pageSize={3}
        />
        <ListView
          key="2"
          ref={el => this.lv = el}
          style={{
            height: this.state.height,
            border: '1px solid #ddd',
            margin: '5px 0',
            display: this.state.gridMode ? 'none' : 'block'
          }}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{padding: 30, textAlign: 'center'}}>
              {this.state.isLoading ? 'Loading...' : 'Loaded'}
            </div>)}
          renderRow={row}
          renderSeparator={separator}
          pullToRefresh={
            <PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />}
          onEndReached={this.onEndReached}
          pageSize={5}
        />
      </div>
    );
  }
}

export default App;
