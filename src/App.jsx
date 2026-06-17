import React, { useState } from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';

export default function KritsWebsite() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            KRITS
          </div>
          <div className="hidden md:flex gap-8">
            {['About', 'Box 1', 'Mission', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className="hover:text-cyan-400 transition-colors text-sm font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            KRITS
          </h1>
          <p className="text-xl text-slate-300 mb-4">Empowering STEM Through DIY Engineering Kits</p>
          <p className="text-slate-400 max-w-2xl mx-auto">Bringing the wonder of science, technology, engineering, and mathematics to every child through hands-on learning experiences.</p>
        </div>
      </section>

      {/* Section 1: About the Founder */}
      <section id="about" className="py-20 px-4 border-t border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">About the Founder</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 overflow-hidden">
              {/* Image commented out - add later */}
              {/* <img 
                src="./krishnav-award.jpg" 
                alt="Krishnav Sarawgi receiving award at The Doon School" 
                className="w-full h-auto rounded-lg shadow-xl object-cover"
              /> */}
              <div className="w-full h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">Award Photo</p>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6 text-cyan-400">Krishnav Sarawgi</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                I'm a Grade 10 student at The Doon School in Dehradun with a passion for STEM fields. My fascination with science and technology has driven me to create KRITS—a platform to inspire the next generation of engineers and scientists. I aspire to pursue physics and aerospace engineering, and I'm deeply committed to making quality STEM education accessible to every child, regardless of background. Through hands-on learning and practical projects, I believe we can ignite curiosity and innovation in young minds across India.
              </p>
              <div className="mt-8 flex gap-4">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 px-6 py-3 rounded-lg border border-cyan-500/30">
                  <p className="text-sm text-cyan-300 font-semibold">Grade 10 Student</p>
                  <p className="text-slate-300">The Doon School, Dehradun</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 px-6 py-3 rounded-lg border border-purple-500/30">
                  <p className="text-sm text-purple-300 font-semibold">Aspiration</p>
                  <p className="text-slate-300">Physics & Aerospace Eng.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: About Box 1 */}
      <section id="box1" className="py-20 px-4 bg-slate-800/30 border-t border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Box 1: Mechanical Engineering Starter Kit</h2>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-10 border border-slate-700 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">What's Inside</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Box 1 is our flagship DIY Meccano-style construction kit, meticulously hand-assembled with precision-engineered metal components. It introduces students to fundamental mechanical principles through engaging, practical projects.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span className="text-slate-300">Premium metal strips and connectors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span className="text-slate-300">High-precision nuts, bolts, and fasteners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span className="text-slate-300">Comprehensive instruction manual</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span className="text-slate-300">Multiple project templates included</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Educational Value</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Through building with Box 1, students develop spatial reasoning, problem-solving skills, and hands-on engineering experience. Projects range from simple structures to complex mechanical systems, making it suitable for various age groups and learning levels.
                </p>
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-6 rounded-lg border border-purple-500/30">
                  <p className="text-purple-200 font-semibold mb-2">Perfect For:</p>
                  <p className="text-slate-300 text-sm">Schools, NGOs, hobby enthusiasts, and anyone passionate about learning mechanical engineering fundamentals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Mission & Goals */}
      <section id="mission" className="py-20 px-4 border-t border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Mission & Goals</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 p-8 rounded-lg border border-cyan-500/30">
              <div className="text-4xl font-bold text-cyan-400 mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-3 text-cyan-300">Democratize STEM</h3>
              <p className="text-slate-300">We believe quality STEM education should be accessible to every child, regardless of socioeconomic background or geographic location.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8 rounded-lg border border-purple-500/30">
              <div className="text-4xl font-bold text-purple-400 mb-4">🛠️</div>
              <h3 className="text-xl font-bold mb-3 text-purple-300">Hands-On Learning</h3>
              <p className="text-slate-300">Through practical, engaging projects, we foster genuine understanding of engineering principles and ignite curiosity in young minds.</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 p-8 rounded-lg border border-pink-500/30">
              <div className="text-4xl font-bold text-pink-400 mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-3 text-pink-300">Build Innovators</h3>
              <p className="text-slate-300">We aspire to nurture the next generation of engineers, scientists, and innovators who will shape our technological future.</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-10 border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-center">Partnership with NGOs</h3>
            <p className="text-slate-300 text-center mb-6 text-lg leading-relaxed">
              We actively supply our KRITS kits to NGOs and educational institutions across India. Beyond just providing products, we offer comprehensive training and guidance on how to effectively use our kits in classrooms and learning centers, ensuring maximum impact on student learning outcomes.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
                <p className="font-semibold text-cyan-400 mb-2">What We Provide</p>
                <ul className="text-slate-300 text-sm space-y-2">
                  <li>✓ Premium KRITS construction kits</li>
                  <li>✓ Teacher training programs</li>
                  <li>✓ Curriculum integration support</li>
                  <li>✓ Ongoing technical assistance</li>
                </ul>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
                <p className="font-semibold text-purple-400 mb-2">Expected Outcomes</p>
                <ul className="text-slate-300 text-sm space-y-2">
                  <li>✓ Enhanced STEM literacy</li>
                  <li>✓ Improved problem-solving skills</li>
                  <li>✓ Increased student engagement</li>
                  <li>✓ Greater confidence in engineering</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Contact */}
      <section id="contact" className="py-20 px-4 bg-slate-800/30 border-t border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <p className="text-center text-slate-300 mb-12 text-lg">
            Interested in partnering with KRITS for your NGO or educational institution? We'd love to hear from you!
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 p-8 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="w-8 h-8 text-cyan-400" />
                <h3 className="text-xl font-bold">Email</h3>
              </div>
              <a 
                href="mailto:krishnavsarawgi@gmail.com"
                className="text-cyan-300 hover:text-cyan-200 text-lg font-semibold transition-colors"
              >
                krishnavsarawgi@gmail.com
              </a>
              <p className="text-slate-400 mt-2 text-sm">Response within 24 hours</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8 rounded-lg border border-purple-500/30">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold">Phone</h3>
              </div>
              <a 
                href="tel:+919874038350"
                className="text-purple-300 hover:text-purple-200 text-lg font-semibold transition-colors"
              >
                +91 9874038350
              </a>
              <p className="text-slate-400 mt-2 text-sm">Available for calls & WhatsApp</p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 p-8 rounded-lg border border-slate-600 text-center">
            <h3 className="text-xl font-bold mb-3">Why Partner With KRITS?</h3>
            <p className="text-slate-300 mb-4">
              We provide not just products, but complete solutions for STEM education. Our team is committed to supporting your organization in delivering exceptional learning experiences to students.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="bg-slate-700 px-4 py-2 rounded-full text-sm text-slate-200">Affordable</span>
              <span className="bg-slate-700 px-4 py-2 rounded-full text-sm text-slate-200">Scalable</span>
              <span className="bg-slate-700 px-4 py-2 rounded-full text-sm text-slate-200">Proven</span>
              <span className="bg-slate-700 px-4 py-2 rounded-full text-sm text-slate-200">Supportive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 text-center text-slate-400">
        <div className="max-w-6xl mx-auto">
          <p className="mb-2">© 2026 KRITS - Empowering STEM Education</p>
          <p className="text-sm">Building the future, one kit at a time</p>
        </div>
      </footer>
    </div>
  );
}
