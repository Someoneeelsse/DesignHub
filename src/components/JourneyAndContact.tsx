import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import InfoPathCard from "./InfoPathCard";

const JourneyAndContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      data-section="journey"
      className="py-10 bg-gradient-to-b from-yellow-50 to-orange-50 px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 text-amber-800">
            Your Design Journey Awaits
          </h2>
          <p className="text-center text-amber-700 text-xl mb-16 max-w-2xl mx-auto">
            Every Month we release new collection, why not to showcase your
            designs?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <InfoPathCard
              stepNumber="01"
              title="Contact Us"
              description="We'll reserve a spot for you to showcase your designs"
              emoji="💬"
              borderColor="border-yellow-400"
            />
            <InfoPathCard
              stepNumber="02"
              title="Upload Your Work"
              description="We will review your work, make 3D design (if needed) and add it to the collection"
              emoji="🎨"
              borderColor="border-orange-400"
            />
            <InfoPathCard
              stepNumber="03"
              title="Branding"
              description="Simply start building up your name in the cloth market"
              emoji="💼"
              borderColor="border-red-400"
            />
            <InfoPathCard
              stepNumber="04"
              title="Make your work, work for you"
              description="Connect with buyers worldwide and turn your passion into profit"
              emoji="💰"
              borderColor="border-yellow-500"
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl p-10 shadow-xl border border-orange-200 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-100 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-60"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-amber-800 mb-2">
                Ready to Launch Your Brand?
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none text-amber-800 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-orange-300"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none text-amber-800 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-orange-300"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your vision..."
                    rows={3}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none text-amber-800 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-orange-300 resize-none"
                  ></textarea>
                </div>

                {/* Submit Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
                    ✅ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                    ❌ Failed to send message. Please try again or contact us
                    directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-400 to-yellow-400 text-white hover:scale-105"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message →"}
                </button>
              </form>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-semibold text-amber-800 text-sm">
                        Email
                      </p>
                      <p className="text-amber-700 text-sm">
                        mrjakub15@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-semibold text-amber-800 text-sm">
                        Phone
                      </p>
                      <p className="text-amber-700 text-sm">+47 405 75 491</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-orange-200">
                  <p className="text-amber-700 text-sm text-center">
                    We'll get back as soon as possible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyAndContact;
