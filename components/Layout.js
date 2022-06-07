import Navbar from "./navbar/Navbar";

export default function Layout({children}) {
  return (
    <>
    <Navbar></Navbar>
    <div className="bg-gray p-5">
        <div className="container mx-auto h-full">
            {children}
        </div>
    </div>
    
    </>
  )
}