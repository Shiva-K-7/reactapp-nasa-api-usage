import {useEffect, useState} from 'react'
import Sidebar from "./components/Sidebar.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY

    function handleToggleModal() {
        setShowModal(!showModal )
    }

    useEffect(() => {
        async function fetchNASA() {
            const url = 'https://api.nasa.gov/planetary/apod'+`?api_key=${NASA_KEY}`
            try {
                const response = await fetch(url)
                const apiData = await response.json()
                setData(apiData)
                console.log('data', apiData)
            }catch (error) {
                console.log(error.message)
            }
        }
        fetchNASA()
    }, [])

    return (
        <>
            {data? (<Main data={data}/>): (
                <div className="loadingState">
                    <i className="fa-solid fa-gear"></i>
                </div>
            )}
            {showModal && (<Sidebar data={data} handleToggleModal={handleToggleModal}/>)}
                {( data && (<Footer data={data} handleToggleModal={handleToggleModal}/>))}
        </>
    )
}

export default App
