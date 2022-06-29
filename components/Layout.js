import Navbar from "./navbar/Navbar";

export default function Layout({children}) {
  return (
    <div className="grid">
    <Navbar></Navbar>
    
        <div className="container m-auto h-full p-5">
            {children}
        </div>
    
    
    </div>
  )
}