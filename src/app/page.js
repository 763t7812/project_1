import HomeOne from "@/components/HomeOne";
import HomeTwo from "@/components/HomeTwo";
import HomeFour from "@/components/HomeFour"
import Footer from "@/components/Footer"
import { ContextProvider } from '../context/SocketContext'
export default function Home() {
  return (
    <ContextProvider>
      <HomeOne></HomeOne>
      <HomeTwo></HomeTwo>
      <HomeFour></HomeFour>
      <Footer></Footer>
      hello world
      </ContextProvider>
        );
}
