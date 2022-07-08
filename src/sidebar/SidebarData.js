import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { BsChatRightDotsFill, BsCloudUpload } from "react-icons/bs";
import { GiNurseMale, GiMonkey, GiClockwork } from "react-icons/gi";
import { RiHospitalFill, RiUserHeartLine } from "react-icons/ri";
import { FcHome, FcStatistics, FcQuestions } from "react-icons/fc";
import { FiPhoneOutgoing } from "react-icons/fi";
import { RiVirusFill } from "react-icons/ri";
import { RiArticleLine } from "react-icons/ri";
import { MdForum } from "react-icons/md";
import { VscFilePdf } from "react-icons/vsc";
import { FiActivity } from "react-icons/fi";
import { AiOutlineFilePdf, AiOutlineSchedule } from "react-icons/ai";

export const SidebarData = [
  {
    id: 1,
    title: "Smart Health",
    path: "#",
    icon: <AiIcons.AiFillHome className="sidebar-icon" />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Home",
        path: "/",
        icon: <FcHome className="sidebar-icon" />,
      },
      {
        title: "About Us",
        path: "/home/about",
        icon: <GiMonkey className="sidebar-icon" />,
      },
      {
        title: "Contact Us",
        path: "/home/contact",
        icon: <FiPhoneOutgoing className="sidebar-icon" />,
      },
    ],
  },
  {
    id: 10,
    title: "Smart Health",
    role: true,
    path: "#",
    icon: <AiIcons.AiFillHome className="sidebar-icon" />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Home",
        path: "/",
        icon: <FcHome className="sidebar-icon" />,
      },
      {
        title: "About Us",
        path: "/home/about",
        icon: <GiMonkey className="sidebar-icon" />,
      },
      {
        title: "Contact Us",
        path: "/home/contact",
        icon: <FiPhoneOutgoing className="sidebar-icon" />,
      },
    ],
  },
  {
    id: 9,
    title: "View Doctor Panel",
    role: true,
    path: "/find-doctor",
    icon: <GiNurseMale className="sidebar-icon"></GiNurseMale>,
  },
  {
    id: 14,
    title: "For Doctor",
    role: true,
    path: "#",
    icon: <RiUserHeartLine className="sidebar-icon" />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Upload Medical Record",
        path: "/upload/medical-record",
        icon: <BsCloudUpload className="sidebar-icon" />,
      },
      {
        title: "Patient Record",
        path: "/patient-record",
        icon: <VscFilePdf className="sidebar-icon" />,
      },
    ],
  },

  {
    id: 17,
    title: "Activity Log",
    role: true,
    path: "/activity-log",
    icon: <FiActivity className="sidebar-icon"></FiActivity>,
  },

  {
    id: 3,
    role: true,
    title: "Appointment",
    path: "/join",
    icon: <BsChatRightDotsFill className="sidebar-icon" />,
  },
  {
    id: 16,
    title: "Consultation",
    path: "#",
    icon: <RiUserHeartLine className="sidebar-icon" />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Join Consultation",
        path: "/join",
        icon: <BsChatRightDotsFill className="sidebar-icon" />,
      },
      {
        title: "Pharmacy",
        path: "/pharmacy",
        icon: <FaIcons.FaCartPlus className="sidebar-icon" />,
      },
      {
        title: "Reminder",
        path: "/reminder",
        icon: <GiClockwork className="sidebar-icon" />,
      },
    ],
  },

  {
    id: 2,
    title: "Find A Doctor",
    path: "/find-doctor",
    icon: <GiNurseMale className="sidebar-icon"></GiNurseMale>,
  },

  {
    id: 3,
    title: "Medical Record",
    path: "/medical-record",
    icon: <AiOutlineFilePdf className="sidebar-icon" />,
  },
  {
    id: 15,
    title: "Medical Services",
    role: true,
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText className="sidebar-icon" />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Pharmacy",
        path: "/pharmacy",
        icon: <FaIcons.FaCartPlus className="sidebar-icon" />,
      },
      {
        title: "Health Forum",
        path: "/health-forum",
        icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
      },
      {
        title: "Find Pharmacy",
        path: "/pharmacy/location",
        icon: <RiHospitalFill className="sidebar-icon" />,
      },
    ],
  },
  {
    id: 7,
    title: "Medical Services",
    path: "#",
    icon: <FaIcons.FaEnvelopeOpenText className="sidebar-icon" />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Health Forum",
        path: "/health-forum",
        icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
      },
      {
        title: "Find Pharmacy",
        path: "/pharmacy/location",
        icon: <RiHospitalFill className="sidebar-icon" />,
      },
    ],
  },
  {
    id: 4,
    title: "Covid-19",
    path: "#",
    icon: <RiVirusFill className="sidebar-icon" />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Live Covid Statistics",
        path: "/covid-19/statistics",
        icon: <FcStatistics className="sidebar-icon" />,
        cName: "sub-nav",
      },
      {
        title: "Covid-19 Articles",
        path: "/covid-19/articles",
        icon: <RiArticleLine className="sidebar-icon" />,
        cName: "sub-nav",
      },
    ],
  },
  {
    id: 12,
    title: "Covid-19",
    role: true,
    path: "#",
    icon: <RiVirusFill className="sidebar-icon" />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Live Covid Statistics",
        path: "/covid-19/statistics",
        icon: <FcStatistics className="sidebar-icon" />,
        cName: "sub-nav",
      },
      {
        title: "Covid-19 Articles",
        path: "/covid-19/articles",
        icon: <RiArticleLine className="sidebar-icon" />,
        cName: "sub-nav",
      },
    ],
  },

  {
    id: 8,
    title: "Support",
    path: "#",
    icon: <IoIcons.IoMdHelpCircle className="sidebar-icon" />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Q&A",
        path: "/support/qna",
        icon: <FcQuestions className="sidebar-icon" />,
      },
      {
        title: "Terms & Conditions",
        path: "/tnc-smarthealth",
        icon: <IoIcons.IoIosPaper className="sidebar-icon" />,
      },
    ],
  },
];
