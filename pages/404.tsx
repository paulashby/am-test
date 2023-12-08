import '../app/globals.css'
import {Lato} from 'next/font/google'
import style from "./404.module.css"

const lato = Lato({ subsets: ['latin'], weight: ["100", "300", "400", "700", "900"] })

export const metadata = {
  title: 'AlphaMolly - 404',
}

export default function alphamolly404() {
  return (
      <main  className={lato.className}>
        <div className={style.err}>
          <div className={style.errNum}>404</div>
          <div className={style.errMess}>Nothing much of interest here so here’s a great picture by Guillaume Jaille
          </div>
        </div>

      </main>
  )
}