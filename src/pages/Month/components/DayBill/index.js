import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import { billTypeToName } from '../../../../constants'
import Icon from '../../../../components/Icon'

const DailyBill = ({date, dayBillList}) => {

    // statistic of daily details
    const payIncome = useMemo(() => {
        const pay = dayBillList && dayBillList.filter(item => item.type === 'pay').reduce((a,b)=>a+b.money, 0)
        const income = dayBillList && dayBillList.filter(item => item.type === 'income').reduce((a,b)=>a+b.money, 0)
        
        return {
            pay,
            income,
            balance: pay + income
        }
    }, [dayBillList])

    // define detail bill in one day
    const [visible, setVisible] = useState(false)

    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    {/* expand 有这个类名 展开的箭头朝上的样子 */}
                    <span className={classNames('arrow',  visible && 'expand')} onClick={() => setVisible(!visible)}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">Expenses</span>
                        <span className="money">{payIncome.pay}</span>
                    </div>
                    <div className="income">
                        <span className="type">Income</span>
                        <span className="money">{payIncome.income}</span>
                    </div>
                    <div className="balance">
                        <span className="type">Balance</span>
                        <span className="money">{payIncome.balance}</span>
                    </div>
                </div>
                <div className="billList" style={{ display: visible ? 'block' : 'none' }}>
                {dayBillList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            {/* 图标 */}
                            <Icon type={item.useFor} />
                        <div className="detail">
                            <div className="billType">{billTypeToName[item.useFor]}</div>
                        </div>
                        <div className={classNames('money', item.type)}>
                            {item.money.toFixed(2)}
                        </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}
export default DailyBill