import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
function AboutCard() {
    return (
        <>

            {/* <div className='h-fit w-full py-14 shadow-lg  lg:px-32'>

            <div className='grid md-grid-cols-6 lg:grid-cols-12 p-5  bg-white w-full'>
                <div className='col-span-6 flex justify-center items-center'>
                    <div >
                        <img src="https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?cs=srgb&dl=pexels-rafael-cosquiere-2041540.jpg&fm=jpghttps://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                </div>
                <div className='col-span-6 w-full h-full flex flex-col  justify-between  p-8 space-y-3 md:px-12 lg:px-16'>

                        <div className='flex justify-center text-4xl '>

                            <p>BINOTE</p>
                        </div>
                        <div className='flex flex-col justify-start text-xl'>

                            <p>Öğrenci Dostu Kitap Projesi, öğrencilerin kitaplara erişimini kolaylaştırmak ve maliyetlerini düşürmek amacıyla bir inovasyon sunmaktadır. Bu proje, öğrencilerin istedikleri kitapları satın alma ve fotokopici ile entegre bir şekilde sipariş vererek fotokopici aracılığıyla çıkartma imkanı sunmaktadır.</p>
                            <p>Bu proje aynı zamanda sürdürülebilirlik açısından da önemli bir adımdır. Kitapların fotokopi yoluyla çoğaltılması, kağıt israfını önleyerek çevresel etkiyi azaltabilir. Öğrenciler, sadece ihtiyaç duydukları bölümleri çıkartarak kağıt tasarrufu yapabilirler.</p>
                        </div>
                        <div>

                            <p className='text-gray-400'>BINOTE</p>
                        </div>
                   
                </div>
            </div>

        </div> */}
            < div class="h-fit w-full py-14 shadow-lg   " >
                <div class="flex flex-wrap items-center">
                    <div class="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-500">
                            <img alt="..." src="https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?cs=srgb&dl=pexels-rafael-cosquiere-2041540.jpg&fm=jpghttps://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="w-full align-middle rounded-t-lg" />
                            <blockquote class="relative  p-8 mb-4">
                                
                                <h4 class="text-xl font-bold text-white">
                                    BINOTE Öğrenci Dostu Kitap Projesi,
                                </h4>
                                <p class="text-md font-light mt-2 text-white">
                                    Öğrenci Dostu Kitap Projesi, öğrencilerin kitaplara erişimini kolaylaştırmak ve maliyetlerini düşürmek amacıyla bir inovasyon sunmaktadır. Bu proje, öğrencilerin istedikleri kitapları satın alma ve fotokopici ile entegre bir şekilde sipariş vererek fotokopici aracılığıyla çıkartma imkanı sunmaktadır.
                                </p>
                            </blockquote>
                        </div>
                    </div>

                    <div class="w-full md:w-6/12 px-4">
                        <div class="flex flex-wrap">
                            <div class="w-full md:w-6/12 px-4">
                                <div class="relative flex flex-col mt-4">
                                    <div class="px-4 py-5 flex-auto">
                                        <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <SearchIcon/>
                                        </div>
                                        <h6 class="text-xl mb-1 font-semibold">Hızlı ve Kolay Erişim</h6>
                                        <p class="mb-4 text-blueGray-500">
                                            İstediğiniz Kitaplara Anında Ulaşın
                                        </p>
                                    </div>
                                </div>
                                <div class="relative flex flex-col min-w-0">
                                    <div class="px-4 py-5 flex-auto">
                                        <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <AttachMoneyIcon/>
                                        </div>
                                        <h6 class="text-xl mb-1 font-semibold">
                                            Ekonomik Çözüm
                                        </h6>
                                        <p class="mb-4 text-blueGray-500">
                                        Kitap Maliyetlerini Düşürün
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full md:w-6/12 px-4">
                                <div class="relative flex flex-col min-w-0 mt-4">
                                    <div class="px-4 py-5 flex-auto">
                                        <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <ContentCopyIcon />
                                        </div>
                                        <h6 class="text-xl mb-1 font-semibold">İhtiyaç Kadar çıkartın</h6>
                                        <p class="mb-4 text-blueGray-500">
                                        Fotokopiciyle Entegre Çalışma ve Kağıt Tasarrufu
                                        </p>
                                    </div>
                                </div>
                                <div class="relative flex flex-col min-w-0">
                                    <div class="px-4 py-5 flex-auto">
                                        <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <DeleteSweepOutlinedIcon />
                                        </div>
                                        <h6 class="text-xl mb-1 font-semibold">Sürdürülebilirlik İlkesine Katkı:</h6>
                                        <p class="mb-4 text-blueGray-500">
                                        Çevresel Etkiyi Azaltan Öğrenci Dostu Yaklaşım
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="relative bg-blueGray-50 pt-8 pb-6 mt-2">
                    <div class="container mx-auto px-4">
                        <div class="flex flex-wrap items-center md:justify-between justify-center">
                            <div class="w-full md:w-6/12 px-4 mx-auto text-center">
                                <div class="text-sm text-blueGray-500 font-semibold py-1">
                                    BINOTE
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div >
        </>
    )
}

export default AboutCard