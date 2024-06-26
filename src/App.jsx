import ReactDOM from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SearchParams from "./SearchParams";
import Details from "./Details";
import { useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    }
})

const App = () => {
    const adoptedPet = useState(null)
    return (
        <div className="p-0 m-0" style={{ background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)" }}>
            <BrowserRouter>
                <AdoptedPetContext.Provider value={adoptedPet}>
                    <QueryClientProvider client={queryClient} >
                        <header className="
                            mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
                            <Link className="text-6xl text-white hover:text-gray-200" to="/">Adopt Me!</Link>
                        </header>
                        <Routes>
                            <Route path="/details/:id" element={<Details />} />
                            <Route path='/' element={<SearchParams />} />
                        </Routes>
                    </QueryClientProvider>
                </AdoptedPetContext.Provider>
            </BrowserRouter>
        </div>
    );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(<App />);
