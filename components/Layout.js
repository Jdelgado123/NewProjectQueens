import Navbar from "./navbar/Navbar";

export function Layout({children}) {
  return (
    <>
    <Navbar></Navbar>
    <div className="bg-gray">
        <div className="container mx-auto h-full">
            {children}
        </div>
    </div>
    
    </>
  )
}