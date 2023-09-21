import { SyntheticEvent, useState } from "react";
import { Tab, Tabs, TextField } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import Card from "../../components/card";
import Layout from "../../components/layout";
import { TabContext } from "@mui/lab";
import CustomAutocomplete from "../../components/customAutocomplete";

const Invoices = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
            <CustomAutocomplete
              value=""
              options={[]}
              renderInput={(params) => <TextField {...params} label="TEST" />}
            />
          </TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </Card>
    </Layout>
  );
};

export default Invoices;
