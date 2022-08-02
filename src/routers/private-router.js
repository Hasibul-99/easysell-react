import EditProfile from "../pages/private/profile/edit-profile";
import ChangeDetails from "../pages/private/Change-Details/index";
import Channels from "../pages/private/Channels/index";
import Page404 from "../pages/private/404";
import AddLink from "../pages/private/Channels/add-link";
import CodeCreate from "../pages/private/codes/code-create";
import Cards from "../pages/private/codes/index";
import ReadyProducts from "../pages/private/Ready-Products";
import CustomSell from "../pages/private/Custom-Sell";
import POS from "../pages/private/POS";
import SuplierStuff from "../pages/private/Suplier_Stuff";
import Expense from "../pages/private/expense";
import Payments from "../pages/private/payments";
import StuffSection from "../pages/private/Stuff_section";
import ReportStatement from "../pages/private/ReportAndStatement";

const PrivateRoutes = [
    {
        path: "/",
        name: "Dashboard",
        component: Channels,
        layout: "/",
        exact: true
    },
    {
        path: "ready-product",
        name: "Ready Products",
        component: ReadyProducts,
        layout: "/",
        exact: true
    },
    {
        path: "custom-sell",
        name: "Custom Sell",
        component: CustomSell,
        layout: "/",
        exact: true
    },
    {
        path: "edit-profile",
        name: "Edit Profile",
        component: EditProfile,
        layout: "/",
        exact: true
    },
    {
        path: "change-details",
        name: "Change Details",
        component: ChangeDetails,
        layout: "/",
        exact: true
    },
    {
        path: "channels",
        name: "Channels",
        component: Channels,
        layout: "/",
        exact: true
    },
    {
        path: "code-create",
        name: "Code Create",
        component: CodeCreate,
        layout: "/",
        exact: true
    },
    {
        path: "code-list",
        name: "Code List",
        component: Cards,
        layout: "/",
        exact: true
    },
    {
        path: "pos",
        name: "POS",
        component: POS,
        layout: "/",
        exact: true
    },
    {
        path: "suplier_stuff",
        name: "Supplier Stuff",
        component: SuplierStuff,
        layout: "/",
        exact: true
    },
    {
        path: "expense",
        name: "expemse",
        component: Expense,
        layout: "/",
        exact: true
    },
    {
        path: "payments",
        name: "Payments",
        component: Payments,
        layout: "/",
        exact: true
    },
    {
        path: "stuff_section",
        name: "Stuff Section",
        component: StuffSection,
        layout: "/",
        exact: true
    },
    {
        path: "report_and_statement",
        name: "Report And Statement",
        component: ReportStatement,
        layout: "/",
        exact: true
    },
    {
        path: "page-404",
        name: "page 404",
        component: Page404,
        layout: "/",
        exact: true
    },
];

export default PrivateRoutes;