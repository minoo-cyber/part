import { FC, SyntheticEvent, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormLabel,
  Grid,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomAutocomplete from "../../../../components/autocomplete";
import CustomButton from "../../../../components/button";

import {
  FileUploadProps,
  FileUploader,
} from "../../../../components/fileUploader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useMutation } from "@tanstack/react-query";
import {
  addInvoiceService,
  clientService,
  companyNameService,
} from "../../../../services/invoice.api";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

interface IProps {
  readOnly: boolean;
}

const InvoiceAdd: FC<IProps> = (readOnly) => {
  const companyQuery = useMutation(companyNameService);
  const addInvoiceQuery = useMutation(addInvoiceService);
  const [companyName, setCompanyName] = useState<string | undefined>("");
  const [companyData, setCompanyData] = useState<string[]>();
  const [addData, setAddData] = useState([]);
  const [fileName, setFileName] = useState<string>();
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [clientName, setClientName] = useState<string>("");
  const [clientData, setClientData] = useState<string[]>();
  const clientQuery = useMutation(clientService);
  let rawRows1: any = [];
  let rawRows2: any = [];
  let arr1: any = [];
  let arr2: any = [];
  let arr3: any = [];
  const onPaste = (event: any) => {
    const pasted1 = event.clipboardData.getData("text");
    rawRows1 = pasted1.split("\n");
  };
  const onPaste2 = (event: any) => {
    const pasted2 = event.clipboardData.getData("text");
    rawRows2 = pasted2.split("\n");
    for (let i = 0; i < rawRows1.length; i++) {
      if (rawRows1[i] !== "ADDITIONAL ITEMS" && rawRows2[i] !== ".") {
        arr3.push({ itemDesc: rawRows1[i], qty: rawRows2[i] });
      }
    }
  };

  useEffect(() => {}, [rawRows1, rawRows2]);

  useEffect(() => {
    if (companyName) {
      clientQuery.mutate(companyName, {
        onSuccess(data) {
          if (data.data) {
            setClientData(data.data);
          }
        },
      });
    }
  }, [companyName]);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const fileUploadProp: FileUploadProps = {
    accept: "image/*",
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files !== null && event.target?.files?.length > 0) {
        setFileName(`${event.target.value}`);
      }
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      setFileName(`${event.dataTransfer.files[0].name}`);
    },
  };
  const handlePrintDocument = () => {
    let input: any = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0, 200, 200);
      pdf.save("download.pdf");
    });
  };

  useEffect(() => {
    if (companyName && companyName.length >= 3) {
      companyQuery.mutate(companyName, {
        onSuccess(data) {
          if (data.data) {
            setCompanyData(data.data);
          }
        },
      });
    }
  }, [companyName]);

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [open, setOpen] = useState(false);
  let test: any = [];
  let test2: any = [];
  let test3: any = [];
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    addInvoiceQuery.mutate(
      {
        companyName: companyName,
        clientName: clientName,
        invoiceModels: arr3,
      },
      {
        onSuccess(data) {
          setAddData(data.data?.map);
          // Object.values(data.data?.map).map((item: any) => {
          //   if (item.length > 1) {
          //     setOpen(true);
          //     item.map((item2: any, index: any) => test2.push(item2));
          //   } else {
          //     setOpen(false);
          //     item.map((item2: any) => test.push(item2));
          //   }
          // });
          // test2.map((item3: any, index: any) => {
          //   return (item3.Id = index), test3.push(item3);
          // });

          // setData2(test3);
          // setData(test);
        },
      }
    );
  };
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 50,
      editable: false,
    },
    {
      field: "impaCode",
      headerName: "Impa Code",
      width: 100,
      editable: true,
    },
    {
      field: "itemDesc",
      headerName: "Item Description",
      width: 300,
      editable: true,
    },
    {
      field: "extraText",
      headerName: "Extra Text",
      width: 200,
      editable: true,
    },
    {
      field: "pkg",
      headerName: "pkg",
      width: 90,
      editable: true,
    },
    {
      field: "qty",
      headerName: "Qty",
      width: 90,
      editable: true,
    },
    {
      field: "itemSell",
      headerName: "Item Sell",
      width: 90,
      editable: true,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 110,
      editable: true,
    },
  ];
  console.log(data, "data");
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [deletedRows, setDeletedRows] = useState<any>([]);
  return (
    <>
      <Grid container component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} sm={6} md={6} mb={1} px={2}>
          <FormLabel>Company</FormLabel>
          <CustomAutocomplete
            value={companyName}
            onInputChange={(event: object, value: string, reason: string) => {
              setCompanyName(value);
            }}
            options={
              companyData
                ? companyData.map((item, index) => ({
                    label: item,
                    id: index,
                  }))
                : []
            }
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} mb={1} px={2}>
          <FormLabel>Client</FormLabel>
          <CustomAutocomplete
            value={clientName}
            onInputChange={(event: object, value: string, reason: string) => {
              setClientName(value);
            }}
            options={
              clientData
                ? clientData.map((item, index) => ({
                    label: item,
                    id: index,
                  }))
                : []
            }
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} mb={4} px={2} mt={2}>
          <FormLabel>Item Description</FormLabel>
          <br />
          <textarea
            placeholder="Paste Item Description here..."
            onPaste={onPaste}
            style={{
              minHeight: "150px",
              maxHeight: "250px",
              minWidth: "100%",
              maxWidth: "100%",
              padding: "10px",
              marginTop: "10px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} mb={2} px={2} mt={2}>
          <FormLabel>Qty</FormLabel>
          <textarea
            placeholder="Paste Item Qty here..."
            onPaste={onPaste2}
            style={{
              minHeight: "150px",
              maxHeight: "250px",
              minWidth: "100%",
              maxWidth: "100%",
              padding: "10px",
              marginTop: "10px",
            }}
          />
        </Grid>

        {/* <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel htmlFor="uploadExel">Upload Exel</FormLabel>
          <FileUploader {...fileUploadProp} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2} mt={4.7}>
          <Typography>{fileName}</Typography>
        </Grid> */}
        <Grid container sx={{ justifyContent: "center" }}>
          <CustomButton
            type="submit"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.primary.main + "!important",
            }}
          >
            Add Invoice
          </CustomButton>
        </Grid>
      </Grid>
      <div className="gameStatistics">
        {Object.keys(addData).map((key: any) => {
          return (
            <div key={key}>
              <Typography
                variant="h6"
                mb={1}
                mt={3}
                sx={{
                  color: (theme) => theme.palette.primary.main + "!important",
                }}
              >
                {key}
              </Typography>
              {[addData[key]].map((item: any) => {
                return (
                  <DataGrid
                    rows={item ? item : []}
                    getRowId={(row) => row.batchId}
                    columns={columns}
                    disableRowSelectionOnClick
                    checkboxSelection
                    hideFooter={true}
                    //@ts-ignore
                    onSelectionModelChange={(ids) => {
                      setSelectionModel(ids);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {/* {data2.length > 0 && (
        <Grid container>
          <DataGrid
            rows={data2 ? data2 : []}
            getRowId={(row) => row.Id}
            columns={columns}
            disableRowSelectionOnClick
            checkboxSelection
          />
        </Grid>
      )} */}

      {/* {data.length > 0 && !open && (
        <div style={{ minHeight: "600px", marginTop: "20px" }}>
          <Grid container>
            <DataGrid
              rows={data ? data : []}
              getRowId={(row) => row.batchId}
              columns={columns}
              disableRowSelectionOnClick
            />
          </Grid>
        </div>
      )} */}
      {/* <Grid id="divToPrint">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography variant="h6">Invoice Details</Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography variant="h6">Invoice Rows</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PastTable />
          </AccordionDetails>
        </Accordion>
      </Grid> */}
      {/* <Grid
        container
        sx={{
          justifyContent: "center",
          "&>div": {
            margin: "10px",
          },
        }}
      >
        <CustomButton
          sx={{
            backgroundColor: (theme) =>
              theme.palette.primary.main + "!important",
          }}
          onClick={handlePrintDocument}
        >
          Preview
        </CustomButton>
        <CustomButton
          sx={{
            backgroundColor: (theme) =>
              theme.palette.primary.main + "!important",
          }}
        >
          Submit
        </CustomButton>
      </Grid> */}
    </>
  );
};
export default InvoiceAdd;
