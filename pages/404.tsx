import '../app/globals.css'
import {Lato} from 'next/font/google'
import Image from "next/legacy/image";
import bgImage from "../app/icons/404Background.jpg";
import style from "./404.module.css"
import Header from "@/components/global/header/header"
import Footer from "../components/global/footer/Footer";
import { Metadata } from 'next'

const lato = Lato({ subsets: ['latin'], weight: ["100", "300", "400", "700", "900"] })

export const metadata = {
  title: 'AlphaMolly - 404',
}

export default function alphamolly404() {
  return (
      <main  className={lato.className}>
        <Image
            src={bgImage}
            objectFit='cover'
            layout='fill'
            objectPosition='center'
            alt={"404"}
        />
        <Header/>
        <div className={style.err}>
          <div className={style.errNum}>404</div>
          <div className={style.errMess}>Nothing much of interest here so here’s a great picture by Guillaume Jaille
          </div>
        </div>

      </main>
  )
}