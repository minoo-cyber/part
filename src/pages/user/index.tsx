import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import Layout from "../../components/layout";
import Card from "../../components/card";
import { TabContext, TabPanel } from "@mui/lab";
import AddUser from "./addUser";

const User = () => {
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
            <Tab value="1" label="Add User" />
            <Tab value="2" label="Users List" />
          </Tabs>
          <TabPanel value="1">
            <AddUser />
          </TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </Card>
    </Layout>
  );
};

export default User;
