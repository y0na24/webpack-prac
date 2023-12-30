import { type FC } from 'react'
import styles from './App.module.scss'
import { Link, Outlet } from 'react-router-dom'

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <>
      <div>
        <Link style={{marginRight: '10px'}} to={'/about'}>About</Link>
        <Link to={'/shop'}>Shop</Link>
      </div>
      <div>
        <span>App</span>
        <button className={styles.btn}>Button</button>
        <Outlet />
      </div>
    </>
  )
}
