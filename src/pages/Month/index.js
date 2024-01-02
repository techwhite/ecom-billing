import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const Month = () => {  
    const { billList } = useSelector(state => state.billList ? state.billList : [])
    const monthDetailGroup = useMemo(()=> {
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
    }, [billList])
    
    const [currentMonthBillList, setCurrentMonthBillList] = useState([])
    const currentMonthStastic = useMemo(() => {
        const pay = currentMonthBillList && currentMonthBillList.filter(item => item.type === 'pay').reduce((a,b)=>a+b.money, 0)
        const income = currentMonthBillList && currentMonthBillList.filter(item => item.type === 'income').reduce((a,b)=>a+b.money, 0)

        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentMonthBillList])
    
    // const monthReduceGroup = useMemo(() => {
    //     monthDetailGroup && monthDetailGroup.map((month, bills) => {
    //         const pay = bills.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    //         const income = bills.filter(item => item.type === 'income').reduce((a, b) => a+b.money, 0)

    //         return (month, {pay, income})
    //     })
    // }, [monthDetailGroup])

    const [dateVisible, setDateVisible] = useState(false)
    const [currentDate, setCurrentDate] = useState(() => { 
        return dayjs(new Date()).format('YYYY-MM')
    })

    const onConfirm = (date) => {
        setDateVisible(false)
         
        const formatDate = dayjs(date).format('YYYY-MM')
        setCurrentDate(formatDate)
        if (monthDetailGroup && monthDetailGroup[formatDate]) {
            setCurrentMonthBillList(monthDetailGroup[formatDate])
        }
    }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentDate + ''}月账单
            </span>
            {/* 思路：根据当前弹框打开的状态控制expand类名是否存在 */}
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{currentMonthStastic.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{currentMonthStastic.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{currentMonthStastic.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="BillDate"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()} 
          />
        </div>
        {/* 单日列表统计 */}

      </div>
    </div >
  )
}

export default Month