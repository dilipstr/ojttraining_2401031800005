import { useRef } from 'react';
import {NavBar,SearchBus,Schedules,Features,Footer} from './componets'
import { schedules } from './data';
function App() {
  const searchBusRef = useRef(null)
  const schedulesRef = useRef(null)
  const scrollPage=(e,ref)=>{
    e.preventDefault()
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <title>BusKhojo</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />            
      <NavBar scrollPage={scrollPage} refs={{searchBus: searchBusRef, schedules: schedulesRef}}/> 
      <SearchBus ref={searchBusRef}/>
      <Schedules data={schedules} ref={schedulesRef}/>
      <Features />
      <Footer/>
    </>
  );  
}

export default App;
