import Link from "next/link"
import styles from './styles.scss'

const Header = () => {
  return (
    <nav className="header__menu header-menu">
        <Link href={"/"} className="header-menu__logo logo"> Logo </Link>
        <ul className="header-menu__list">
            <li className="header-menu__item"><Link href={"/"}> Home </Link></li>
            <li className="header-menu__item"><Link href={"/about"}> About </Link></li>
            <li className="header-menu__item"><Link href={"/contacts"}> Contacts </Link></li>
        </ul>
    </nav>
  )
}

export default Header