import { useEffect, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"

function Layout() {

  const location = useLocation()

  const [isDark, setIsDark] = useState(()=> {
    const theme = localStorage.getItem("theme")
    return theme === "dark"
  })

  function toggleTheme(){
    setIsDark((prevTheme) => !prevTheme)
  }

  useEffect(()=>{
    if(isDark){
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }else{
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  },
[isDark])

useEffect(()=>{
  const titles : Record<string, string> = {
    "/": "All Issues - React Router",
    "/open": "Open Issues - React Router",
    "/closed": "Closed Issues - React Router",
  }

  document.title = titles[location.pathname] || 'React Router'

},[location.pathname])

  return (
    <>
      <header className="p-6 sm:p-10 border-b border-gray-300 dark:border-gray-700 ">
      <nav className="flex justify-between items-center">
        <ul className="flex flex-col sm:items-center gap-6 sm:flex-row">
          <li>
            <NavLink to="/"
              className={({isActive})=> `px-4 py-2 rounded ${isActive ? "text-blue-600  dark:text-blue-300 font-bold text-xl dark:bg-slate-800 bg-slate-300 " : "text-gray-600 dark:text-gray-300 px-4 py-2 border border-slate-400 "}` }
              >All Issues</NavLink>
          </li>

          <li>
            <NavLink to="/open"
              className={({isActive})=> ` px-4 py-2 rounded ${isActive ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200 font-bold text-xl  " : 
            "text-gray-600 dark:text-gray-300  border border-slate-400 "}` }
              >Open Issues</NavLink>
          </li>

          <li>
            <NavLink to="/closed"
              className={({isActive})=>` px-4 py-2 rounded ${isActive ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 font-bold text-xl" : "text-gray-600 dark:text-gray-300  border border-slate-400"}`}
              >Closed Issues</NavLink>
          </li>
        </ul>

        <div onClick={toggleTheme}  className="cursor-pointer">
          {isDark ? (<i className="fa-solid fa-sun text-2xl text-orange-300"></i>) : 
          ( <i className="fa-solid fa-moon text-2xl text-gray-500"></i>) }
        </div>
      </nav>
      </header>

      <main className="flex flex-col gap-4 p-8 sm:p-12">
        <Outlet />
      </main>
    </>
  )
}

export default Layout