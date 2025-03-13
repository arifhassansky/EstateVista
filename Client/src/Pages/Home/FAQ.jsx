import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "You can create an account by clicking the 'Sign Up' button on the homepage and filling in your details."
  },
  {
    question: "How do I list a property for sale?",
    answer:
      "If you are an agent, you can list a property by navigating to your dashboard and clicking on 'Add Property.'"
  },
  {
    question: "How do I make an offer on a property?",
    answer:
      "Go to the property details page and click the 'Make an Offer' button. Ensure your offer is within the specified price range."
  },
  {
    question: "How can I track my offers?",
    answer:
      "You can view all your offers under the 'Property Bought' section of your dashboard."
  },
  {
    question: "What happens if my offer is accepted?",
    answer:
      "Once your offer is accepted, you will see a 'Pay' button to complete the payment. Your status will then update to 'Bought.'"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 my-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              className="w-full p-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-gray-800 font-medium">{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700 bg-white border-t border-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
