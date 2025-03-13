import React from 'react';

const Newsletter = () => {
    return (
        <section className="bg-gray-100 w-11/12 mx-auto my-10 py-12 px-6 md:px-12 rounded-2xl text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mt-2">
          Stay updated with the latest news and exclusive offers.
        </p>
        <form className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23cc8b]"
          />
          <button
            type="submit"
            className="bg-[#23cc8b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1faa73] transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
    );
};

export default Newsletter;