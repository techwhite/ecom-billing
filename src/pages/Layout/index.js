import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchBillList } from "../../store/modules/billStore"
import { TabBar } from "antd-mobile"
import "./index.scss"
import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
} from "antd-mobile-icons"

const tabs = [
    {
        key: '/month',
        title: 'MonthBill',
        icon: <BillOutline/>
    },
    {
        key: '/new',
        title: 'Bill',
        icon: <AddCircleOutline/>
    },
    {
        key: '/year',
        title: 'YearBill',
        icon: <CalculatorOutline/>
    }
]

const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchBillList())
    }, [dispatch])

    const navigate = useNavigate()
    const switchTab = (path) => {
        console.log(path)
        navigate(path)
    }

    return <div className="layout"> 
        <div className="container">
            <Outlet/>
        </div>
        <div className="footer">
            <TabBar onChange={switchTab}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    </div>
}

export default Layout