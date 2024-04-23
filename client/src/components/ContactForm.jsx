import React, { useRef } from 'react';


function ContactForm() {


/*     const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_f81i363', 'template_gs1aq7w', form.current, 'B-o9OVf7l6H-RVfvu')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    } */


    return (
        <section className="text-gray-600 body-font relative">
            <div className="absolute inset-0 bg-gray-300">
                {/* <iframe width="100%" height="100%" frameBorder="0" marginHeight="0" marginWidth="0" title="map" scrolling="no" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"></iframe> */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6912.980791267054!2d-77.03238489368542!3d38.6681076043325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7a8ba0dcf4ed7%3A0x9cd827144a90866d!2s16200%20Livingston%20Rd%2C%20Accokeek%2C%20MD%2020607%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2str!4v1684743958663!5m2!1str!2str" width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="container px-5 py-20 mx-auto flex">
                <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Contact Us</h2>


                    <form >
                        <div className="relative mb-4">
                            <label htmlFor="user_name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" name="user_name" id='user_name' className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="user_email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" name="user_email" id='user_email' className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                            <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        <button type="submit" className="text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded text-lg">Send</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactForm