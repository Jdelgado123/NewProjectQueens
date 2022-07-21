import Navbar from "./navbar/Navbar";

export default function Layout({children}) {
  return (
    <div className="grid">
    <Navbar></Navbar>
    
        <div className="md:container md:mx-auto m-2 h-full pt-2">
            {children}
        </div>
    
    
    </div>
  )
}