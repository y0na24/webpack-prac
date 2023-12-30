import { type FC } from 'react'
import styles from './App.module.scss'

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <div>
      <span>App</span>
      <button className={styles.btn}>Button</button>
    </div>
  )
}
