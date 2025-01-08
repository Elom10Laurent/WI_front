import Map from "../components/Map"

const MapPage = () => {
    return (
        <div>
            <div>
                <section className='text-size'>
                    <div className=" justify-center md:w-5/6 md:mx-auto mx-4  pb-6 gap-4">
                        <div className=" item-center mt-6 p-4 gap-4">
                            <p className='text-lg font-semibold  text-slate-600' > Carte </p>
                            <p className=' font-semibold  text-slate-600' >
                            </p>
                        </div>
                          <Map/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MapPage