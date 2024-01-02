import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'

const Month = () => {

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">
              0月账单
            </span>
            {/* 思路：根据当前弹框打开的状态控制expand类名是否存在 */}
            {/* <span className={classNames('arrow', 'expand')}></span> */}
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">0</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">1</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">2</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={false}
            max={new Date()} 
          />
        </div>
        {/* 单日列表统计 */}

      </div>
    </div >
  )
}

export default Month