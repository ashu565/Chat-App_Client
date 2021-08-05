import styles from './header.module.scss'
export default function Header() {
    return (
        <>
        <div className = {styles.container} >
            <img className = {styles.logo} alt = "logo" src = "/logo.png" />
        </div>
        </>
    )
}