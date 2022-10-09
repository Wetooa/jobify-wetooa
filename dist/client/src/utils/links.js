"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io5_1 = require("react-icons/io5");
const md_1 = require("react-icons/md");
const fa_1 = require("react-icons/fa");
const im_1 = require("react-icons/im");
const links = [
    {
        id: 1,
        text: "stats",
        path: "/",
        icon: <io5_1.IoBarChartSharp />,
    },
    {
        id: 2,
        text: "all jobs",
        path: "all-jobs",
        icon: <md_1.MdQueryStats />,
    },
    {
        id: 3,
        text: "add job",
        path: "add-job",
        icon: <fa_1.FaWpforms />,
    },
    {
        id: 4,
        text: "profile",
        path: "profile",
        icon: <im_1.ImProfile />,
    },
];
exports.default = links;
