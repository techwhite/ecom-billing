import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'

const DailyBill = ({date, dayBillList}) => {

    const payIncome = useMemo(() => {
        const pay = dayBillList && dayBillList.filter(item => item.type === 'pay').reduce((a,b)=>a+b.money, 0)
        const income = dayBillList && dayBillList.filter(item => item.type === 'income').reduce((a,b)=>a+b.money, 0)
        
        return {
            pay,
            income,
            balance: pay + income
        }
    })

    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    {/* expand 有这个类名 展开的箭头朝上的样子 */}
                    <span className={classNames('arrow',   'expand')}></span>
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
            </div>
        </div>
    )
}
export default DailyBill