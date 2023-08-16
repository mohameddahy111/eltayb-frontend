import { Dashboard, Diversity3, Group, Inventory2, ReceiptLong } from "@mui/icons-material";

export const adminsLink = [
  {
    title: " Dashbord",
    link: "/admin",
    icone: <Dashboard />,
  },
  {
    title: " Users",
    link: "/admin/users",
    icone: <Group />,
  },
  {
    title: " Employees",
    link: "/admin/employees",
    icone: <Diversity3 />,
  },
  {
    title: " Orders",
    link: "/admin/orders",
    icone: <ReceiptLong />,
  },
  {
    title: " Productes",
    link: "/admin/productes",
    icone: <Inventory2 />,
  },
];
