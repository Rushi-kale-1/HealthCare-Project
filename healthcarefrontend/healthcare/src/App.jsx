import { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

import './components/signcss.css'
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Signin from "./components/Signin.jsx";
import DocterSearch from "./components/DocterSearch.jsx";
import DocterBlog from "./components/DocterBlog.jsx";
import DocterSign from "./components/DocterSign.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/signuser' element= {<Signin></Signin>}/>
                    <Route path='/searchdocter' element= {<DocterSearch></DocterSearch>}/>
                    <Route path='/blogs' element= {<DocterBlog></DocterBlog>}/>
                    <Route path='/signdocter' element= {<DocterSign></DocterSign>}/>
                </Routes>
            </BrowserRouter>
        </>

    )
}
    export default App
