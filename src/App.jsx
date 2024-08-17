import {useEffect, useState} from 'react'
import Sidebar from "./components/Sidebar.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState(null)

    function handleToggleModal() {
        setShowModal(!showModal)
    }

    useEffect(() => {
        async function fetchNASA() {
            const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
            const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`
            const today = (new Date()).toDateString();
            const localKey = `NASA-${today}`

            if (localStorage.getItem(localKey)) {
                const apiData = JSON.parse(localStorage.getItem(localKey))
                setData(apiData)
                console.log('fetched from cache')
                return
            }
            localStorage.clear()
            try {
                const response = await fetch(url)
                const apiData = await response.json()
                localStorage.setItem(localKey, JSON.stringify(apiData))
                setData(apiData)
                console.log('data fetched from api', apiData)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchNASA().then()
    }, [])

    return (
        <>
            {data ? (<Main data={data}/>) : (
                <div className="loadingState">
                    <i className="fa-solid fa-gear"></i>
                </div>
            )}
                {showModal && (<Sidebar data={data} handleToggleModal={handleToggleModal}/>)}
                {(data && (<Footer data={data} handleToggleModal={handleToggleModal}/>))}
        </>
    )
}

export default App
