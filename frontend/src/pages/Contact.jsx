import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen  py-10 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-green-950">
          Contact Us
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Have questions about appointments or need help? We’re here to assist
          you. Reach out to us anytime.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-xl font-semibold text-green-950 mb-6">
            Clinic Information
          </h2>

          <div className="space-y-5 text-gray-700">
            <div>
              <h3 className="font-medium text-gray-900">📍 Address</h3>
              <p className="text-sm">
                HealthCare Plus Clinic<br />
                123 Medical Street,<br />
                Noida, Uttar Pradesh – 201301
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">📞 Phone</h3>
              <p className="text-sm">+91 98765 43210</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">✉️ Email</h3>
              <p className="text-sm">support@doctorbook.com</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">⏰ Working Hours</h3>
              <p className="text-sm">
                Monday – Saturday<br />
                9:00 AM – 7:00 PM
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-6 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
            Google Map Integration
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-xl font-semibold text-green-950 mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-900 text-white py-2.5 rounded-lg font-medium hover:bg-green-950 transition"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
