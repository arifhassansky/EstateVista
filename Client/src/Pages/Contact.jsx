import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_n2jsky2",
        "template_au6su7w",
        formRef.current,
        "696y_P1JCqbyXfCHA"
      )
      .then(
        () => {
          toast("Message sent successfully!");
        },
        () => {
          toast.error("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <motion.div
      className="py-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-primary">
            Get in Touch
          </h2>
          <p className="text-lg">
            We’d love to hear from you! Whether you have a question, feedback,
            or need assistance, our team is here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Call Us", "Email Us", "Visit Us"].map((title, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center border border-primary/80 rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              {index === 0 && (
                <FaPhoneAlt className="text-3xl text-primary mb-4" />
              )}
              {index === 1 && (
                <FaEnvelope className="text-3xl text-primary mb-4" />
              )}
              {index === 2 && (
                <FaMapMarkerAlt className="text-3xl text-primary mb-4" />
              )}
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-lg font-bold">
                {index === 0
                  ? "+123 456 7890"
                  : index === 1
                  ? "shelfmatesupport@example.com"
                  : "12/D Banasree, Dhaka, Bangladesh"}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 rounded-lg shadow-lg p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-6">
            Send Us a Message
          </h3>
          <form ref={formRef} onSubmit={sendEmail}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-4 rounded border border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/80"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-4 rounded border border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/80"
              />
            </div>
            <textarea
              rows="5"
              name="message"
              placeholder="Your Message"
              className="w-full p-4 rounded border border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/80 mb-4"
            ></textarea>
            <motion.button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded font-bold text-lg hover:bg-opacity-80 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
