import React, { useEffect } from "react";
import "./home/home.css";
import aboutImg from "../images/about.jpg";
import aboutImg1 from "../images/about1.jpg";
import lab from "../images/features.jpg";

import {
  MdOutlineVerifiedUser,
  MdOutlineScience,
  MdOutlineCoronavirus,
} from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa";
import { ReactComponent as Sh } from "../images/sh.svg";
import { motion } from "framer-motion";
const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <section className="about-us-section">
          <h1>About Us</h1>
          <div className="underline"></div>
          <p>
            We Are Your Truly Needed Healthcare Providers On the Cloud.
            Providing Accessible Healthcare Services Anywhere Within Malaysia.
          </p>
          <div className="about-us-container">
            <div className="about-us-content">
              <img
                src={aboutImg}
                alt="image"
                style={{ maxWidth: "700px", width: "100%" }}
              />
              <div className="about-description">
                <h1>A Better Way To Get The Care You Need</h1>
                <p>
                  Quality and affordable healthcare has always been the dream
                  that we as Malaysians strive to achieve. Year by year,
                  healthcare services have improved significantly since the days
                  of our fore-fathers, but there is always a problem that seems
                  to prevail, long waiting lines. As a group of people who have
                  mutual deep passion in improving the health care service in
                  Malaysia, we gathered and worked together to establish a
                  platform that can improve the waiting time and availability of
                  healthcare anytime, anywhere to everyone without compromising
                  quality and affordability. Hence, Smart Health was founded to
                  achieve the goal. Smart Health is one of the online Medical
                  Video-consultation platforms in Malaysia that connects user
                  with doctors. The concept has been proven successful with
                  millions of patients in US, Australia & Europe who are now
                  being treated through Medical Video-consultation. Smart Health
                  provides fast, easy and cost-effective access to Malaysia’s
                  top doctors and other healthcare providers in the country. Our
                  patients can have Medical Video visits on their smartphone or
                  computers at any time of day and anywhere.
                </p>
                <p>
                  Smart Health is one of the digital healthcare platform in
                  Malaysia, bringing easier and more affordable access to
                  medicines through our online pharmacy. We provide digital
                  health services including our Online Pharmacy and Video
                  Consultations. With the best prices, quick service and ease of
                  use, taking care of your health just became a lot easier with
                  Smart Health.
                </p>
              </div>
            </div>
            <div
              className="about-us-content"
              style={{ background: "#f7fcfc", padding: "2em" }}
            >
              <div className="about-description">
                <h1>To Make Sure You Receive The Best Healthcare Service :</h1>
                <p>
                  Our board-certified doctors have to go through a very strict
                  on-boarding process. Rigorous trainings and interviews will be
                  conducted before any real life cases are assigned to our
                  healthcare providers. Several quality control steps we take
                  for you to receive the best service include:
                </p>
                <ol>
                  <li>
                    All doctors providing services on Smart Health are required
                    to have a valid Malaysian Medical Council (MMC) Registration
                    and Annual Practicing Certificate (APC)
                  </li>
                  <li>
                    The doctors go through tele-consult training through 10-15
                    training calls with our assigned patients and Medical
                    Director
                  </li>
                  <li>
                    Once our doctors obtain our standard requirement rating in
                    training calls, doctors will then be authorised to consult
                    patients
                  </li>
                  <li>
                    Smart Health does not compromise on privacy and applies
                    industry standard safety procedures and protocols for
                    TeleHealth services (using reliable external communication
                    platform)
                  </li>
                </ol>
                <div className="promise">
                  <MdOutlineVerifiedUser style={{ color: "#3fbbc0" }} />
                  <p>Ensuring A Better Healthcare Service For You</p>
                </div>
                <div className="promise">
                  <MdOutlineVerifiedUser style={{ color: "#3fbbc0" }} />
                  <p>
                    Providing The Best Medical Service To You Is Our Top
                    Priority
                  </p>
                </div>
                <div className="promise">
                  <MdOutlineVerifiedUser style={{ color: "#3fbbc0" }} />
                  <p>
                    Smart Health Contains A Vast Collection Of Medical Advice
                    With Q&A
                  </p>
                </div>
              </div>
              <img
                src={aboutImg1}
                alt="image"
                style={{ maxWidth: "700px", width: "100%" }}
              />
            </div>
          </div>
        </section>
        <hr></hr>
        <section className="founder-section">
          <h1 style={{ textAlign: "center" }}>Founder of smart health</h1>
          <div className="underline"></div>
          <div className="frame-container">
            <div className="frame">
              <img
                className="founder"
                src="https://lh3.googleusercontent.com/tPPji_B53S5Jby7XvxhcrR-4a3V0ntaiERAXSgo7Q3qXCmvh-9WW9sjLlA6P1WdcLTK8SOFQOOzszY3wCE87PSSkOLKX4MDkzBtH6g=w700"
                alt="Mona Lisa"
              />
            </div>
          </div>
          <div className="description" style={{ width: "70%", margin: "auto" }}>
            <h5
              style={{
                textAlign: "center",
                letterSpacing: "0.3em",
                lineHeight: "2em",
              }}
            >
              Bryan Tang, the founder of smart health established this platform
              in 2022 aimed to provide a platform for virtual consultation
              during the covid-19 pandemic.
            </h5>

            <hr />
          </div>
        </section>
        <h2
          style={{
            textAlign: "center",
            letterSpacing: "0.3em",
            lineHeight: "2em",
            width: "70%",
            margin: " auto",
          }}
        >
          The Establishment of smart health
        </h2>
        <div className="underline"></div>
        <div className="div">
          <Sh style={{ maxWidth: "800px", width: "100%" }}></Sh>
        </div>

        <h4
          style={{
            textAlign: "center",
            letterSpacing: "0.3em",
            lineHeight: "2em",
            width: "70%",
            margin: " auto",
            marginBottom: "7em",
          }}
        >
          In the current era, we live in a high-speed world where work and
          personal life are often rushed and mixed together in a blur of
          activity, especially in urban areas. In fact, to find balance in this
          fast-paced society is often unattainable as many people are busy
          working to achieve a sustainable life. This may cause some health
          effects on individuals who disregard their health due to their busy
          schedule. According to the WHO, more than 745,000 people died from
          overwork that resulted in stroke and several chronic diseases.
          Hospitals/clinics play a vital role in the health care system to
          accommodate and treat these patients with diseases. In 2019,
          statistics showed that the number of patient visits to government
          hospitals and clinics in Malaysia rose to about 77 million (involving
          minor illness). However, in this covid-19 pandemic, people are anxious
          about visiting hospitals and clinics due to the virus. Resultantly,
          the number of visits to hospitals or clinics decreased significantly.
          If the number of visits during this pandemic persists, it also means
          that there will be 77 million potential risks in a year of contracting
          the coronavirus. Introducing Smart Health, an electronic health system
          aimed to provide a platform that facilitates virtual consultation to
          mitigate the current problems faced by Malaysians. Smart Health is a
          free-to-use webpage that connects patients/users to professionals for
          virtual consultation. It is established to encourage overworked
          employees to consult professionals for spontaneous medical check-up,
          provide free medical advice during the pandemic and to provide an
          environment where all Malaysians are able to consult specialists
          virtually. With the convenience offered by Smart Health, they will be
          able to consult doctors/specialists virtually at any time, any
          location. Smart Health strives to provide the same effectiveness as
          consulting professionals physically with supplemental features.
        </h4>
        <section>
          <h1 style={{ textAlign: "center" }}>Our Best Doctors</h1>
          <div className="underline"></div>
          <div style={{ marginTop: "20px" }} className="about-container">
            <figure className="wave">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="rajni"
              ></img>
              <figcaption>Elizabeth</figcaption>
            </figure>

            <figure className="wave">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="chuck"
              ></img>
              <figcaption>Usman Yousaf</figcaption>
            </figure>

            <figure className="wave">
              <img
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="chan"
              ></img>
              <figcaption>Austin Distel</figcaption>
            </figure>

            <figure className="wave">
              <img
                src="https://yt3.ggpht.com/ytc/AKedOLQuMNsU2PT_oeZfCauBEYSVNJySNONw0UWloK0EoQ=s900-c-k-c0x00ffffff-no-rj"
                alt="bean"
              ></img>
              <figcaption>David</figcaption>
            </figure>
          </div>
        </section>
        <section className="lab">
          <h1>Smart health Laboratory</h1>
          <div className="underline"></div>
          <div className="lab-container">
            <div className="lab-content">
              <div className="promise">
                <MdOutlineScience
                  style={{ fontSize: "3.5em", color: "#3fbbc0" }}
                />
                <div className="promise-content">
                  <h1>Laboratory Tests</h1>
                  <p>
                    Tests are carried out on clinical specimens to obtain
                    information about the health of a patient to aid in
                    diagnosis, treatment, and prevention of disease.
                  </p>
                </div>
              </div>

              <div className="promise">
                <MdOutlineCoronavirus
                  style={{ fontSize: "2.5em", color: "#3fbbc0" }}
                />
                <div className="promise-content">
                  <h1>Accomodation Of Various Diseases</h1>
                  <p>
                    Smart Health expects to serve and cure different types of
                    diseases by performing lab tests
                  </p>
                </div>
              </div>

              <div className="promise">
                <FaNotesMedical style={{ fontSize: "2em", color: "#3fbbc0" }} />
                <div className="promise-content">
                  <h1>Diagnosis</h1>
                  <p>
                    Smart Health Labs help doctors diagnose medical conditions,
                    plan or evaluate treatments, and monitor diseases.
                  </p>
                </div>
              </div>
            </div>
            <img
              src={lab}
              alt="lab"
              style={{ maxWidth: "700px", width: "100%" }}
            />
          </div>
        </section>
        <div className="location">
          <h1>Find us At</h1>
          <div className="underline"></div>
          <div className="location-iframe">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127494.12638583353!2d101.44065680468456!3d3.0433058105608155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4c8f5912644b%3A0x77612fa0225cad69!2sSunway%20University!5e0!3m2!1sen!2smy!4v1647761748694!5m2!1sen!2smy"
              width="800"
              height="650"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </div>
          <div className="company-info">
            <h3>Company Information</h3>
            <ul>
              <li>
                <span>Company Name: </span>Smart health group sdn. bhd
              </li>
              <li>
                <span>company registration number:</span> 1234567-B
              </li>
              <li>
                <span>company address:</span> Sunway University 5, Jalan
                Universiti, Bandar Sunway, 47700 Petaling Jaya, Selangor
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default About;
