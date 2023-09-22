import { SyntheticEvent, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import Card from "../../components/card";
import Layout from "../../components/layout";
import { TabContext } from "@mui/lab";
import InvoicesSearch from "./components/invoicesSearch";
import InvoiceAdd from "./components/invoiceAdd";

const Invoices = () => {
  const [value, setValue] = useState("1");
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (value === "1") {
      setReadOnly(false);
    }
    if (value === "2") {
      setReadOnly(true);
    }
  };

  return (
    <Layout>
      <Card>
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab value="1" label="Invoices Search" />
            <Tab value="2" label="New Invoice" />
          </Tabs>
          <TabPanel value="1">
            <InvoicesSearch readOnly={readOnly} />
          </TabPanel>
          <TabPanel value="2">
            <InvoiceAdd readOnly={readOnly} />
          </TabPanel>
        </TabContext>
      </Card>
    </Layout>
  );
};

export default Invoices;
