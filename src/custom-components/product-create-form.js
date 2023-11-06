import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {FileDropzone} from "src/components/file-dropzone";
import {paths} from "src/paths";
import {useRouter} from "src/hooks/use-router";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import {endpoints} from "src/endpoints";
import Cookies from "js-cookie";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import {ToastError} from "@/icons/ToastError";
import CommonDialog from "@/custom-components/CommonDialog";
import {multiFileUpload, search} from "@/utils/util";
import {CardMedia} from "@mui/material";

export const ProductCreateForm = (props) => {
    const router = useRouter();
    const [vendors, setVendors] = useState([]);
    const [hsnSacCodes, setHsnSacCodes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [eventCategories, setEventCategories] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [availableEventCategories, setAvailableEventCategories] = useState([]);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [file, setFile] = useState();
    const [files, setFiles] = useState([]);
    const [newFiles, setNewFiles] = useState([])
    const [selectedThumbnail, setSelectedThumbnail] = useState(null)
    console.log("files----<",files)
    // console.log("fileee----<",file)
    const handleCreateDialogOpen = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateDialogClose = (formik) => {
        setCreateDialogOpen(false);
    };

    const handleCancelDialogOpen = () => {
        setCancelDialogOpen(true);
    };

    const handleCancelDialogClose = (formik) => {

        setCancelDialogOpen(false);
    };

    const handleTagAdd = useCallback((tag) => {
        setTags((prevState) => {
            return [...prevState, tag];
        });
    }, []);

    const handleTagDelete = useCallback((tag) => {
        setTags((prevState) => {
            return prevState.filter((t) => t !== tag);
        });
    }, []);

    const handleEventAdd = (event) => {
        setSelectedEvent([...selectedEvent, event]);
        // Remove the selected event from availableEventCategories
        setAvailableEventCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== event.id)
        );
    };

    const handleEventDelete = (event) => {
        // Remove the event from selectedEvent
        setSelectedEvent((prevSelectedEvent) =>
            prevSelectedEvent.filter((selectedItem) => selectedItem.id !== event.id)
        );

        // Add it back to availableEventCategories
        setAvailableEventCategories([...availableEventCategories, event]);
    };

    const Productsave = () => {
        if (Object.keys(formik.errors).length > 0) {
            toast.error("Please fill in all the required fields", {
                position: "top-right",
                style: {
                    backgroundColor: "#D65745",
                },
                icon: <ToastError/>,
            });
        } else if (formik.values.name === "" || formik.values.vendor === "") {
            toast.error("Please fill in all the required fields", {
                position: "top-right",
                style: {
                    backgroundColor: "#D65745",
                },
                icon: <ToastError/>,
            });
        }

        formik.handleSubmit();

    }
    const submitProduct = async () => {
        if (Object.keys(formik.errors).length > 0) {
            return toast.error("Please fill in all the required fields", {
                position: "top-right",
                style: {
                    backgroundColor: "#D65745",
                },
                icon: <ToastError/>,
                autoClose: 5000, // 5000 milliseconds (5 seconds)
            });
        }
        const newArray = selectedEvent.map((obj) => ({id: obj.id}));

        let fileArray = file ? file.map((obj) => ({id: obj.id,filePurpose: obj.filePurpose==="thumbnail"?obj.filePurpose:"file-purpose"})) : "";
        console.log("fileArray",fileArray)
        // fileArray[0].filePurpose = "thumbnail"
        // console.log("fileArray2",fileArray)
        try {
            let token = Cookies.get("accessToken")
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + endpoints.product.index,
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: formik.values.name
                            .toLowerCase()
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' '),
                        vendor: formik.values.vendor,
                        isGoods: formik.values.isGoods,
                        offeringSubCategories: {id: formik.values.subCategoryName.id},
                        longDescription: formik.values.longDescription,
                        shortDescription: "active",
                        vendorPrice: formik.values.vendorShare,
                        unitPrice: (parseFloat(formik.values.organizationShare || 0)) + (parseFloat(formik.values.vendorShare || 0)),
                        discountPrice: formik.values.costPrice,
                        hsnSacCode: {id: formik.values.hsnSacCode.id},
                        unitOfMeasurement: {
                            id: "1"
                        },
                        tags: formik.values.tags,
                        inStock: formik.values.inStock,
                        eventCategories: newArray,
                        files: fileArray,
                    }),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error(response);
            }
            const data = response.json();
            toast.success("Product created Successfully", {autoClose: 10000});
            router.push(paths.productManagement.products.index);
        } catch (err) {
            // console.error(err);
            toast.error("Please fill in all the required fields", {
                position: "top-right",
                style: {
                    backgroundColor: "#D65745",
                },
                icon: <ToastError/>,
                autoClose: 10000, // 5000 milliseconds (5 seconds)
            });
        }
    }


    const formik = useFormik({
        initialValues: {
            vendor: "",
            isGoods: true,
            hsnSacCode: "",
            categoryName: "",
            subCategoryName: "",
            name: "",
            discountPrice: "",
            vendorPrice: "",
            description: "",
            tags: [],
            inStock: true,
            eventCategories: [],
            vendorShare: "",
            organizationShare: "",
            unitPrice: "",
            costPrice: "",
            cgst: "",
            sgst: "",
            igst: "",
            files: [],
            submit: null,
            unitOfMeasurement: "1",
            sku: "",
        },
        validationSchema: Yup.object({
            vendor: Yup.string().required("Vendor Name is required"),
            categoryName: Yup.object().required("Category  is required"),
            hsnSacCode: Yup.object().required("Code  is required"),
            subCategoryName: Yup.object().required("Sub Category  is required"),
            description: Yup.string().max(5000),
            name: Yup.string().max(45).required("product title is required").matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"),
            costPrice: Yup.number().required("Cost price is required"),
            organizationShare: Yup.number().required("Organization Share is required"),
            vendorShare: Yup.number().required("Vendor Share is required"),
            tags: Yup.array().of(Yup.string().matches(/^[^\s].*$/, "Spaces at the beginning are not allowed"))
        }),
        onSubmit: submitProduct
    });


    const handleFilesDrop = useCallback((newFiles) => {
        setFiles((prevFiles) => {
            return [...prevFiles, ...newFiles];
        });
    }, []);

    const handleFileRemove = useCallback((file) => {
        setFiles((prevFiles) => {
            return prevFiles.filter((_file) => _file.path !== file.path);
        });
    }, []);

    const handleFilesRemoveAll = useCallback(() => {
        setFiles([]);
    }, []);

    const onUpload = async () => {
        let data = await multiFileUpload(files)
        setFile(data)
        setNewFiles(data)
        setFiles("")
    }
    console.log("file--->",file)
    console.log("newFIle",newFiles)
    const getVendors = async () => {
        try {
            let token = Cookies.get("accessToken");

            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.vendors.index +
                `?pageNo=0&pageSize=50&isActive=true&sortOn=user.firstName&sortOrder=asc`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setVendors(data.data);
            const eventCategories = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + endpoints.eventCategories.index +
                `?pageNo=0&pageSize=50&isActive=true&sortOn=createdBy&sortOrder=desc`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const {data: eventCategoriesData} = await eventCategories.json();
            setAvailableEventCategories(eventCategoriesData);

        } catch (err) {
            console.error(err);
        }
    };

    const [selectedHsnCode, setSelectedHsnCode] = useState(null);
    const [selectedSacCode, setSelectedSacCode] = useState(null);

    React.useEffect(() => {
        if (selectedHsnCode) {
            formik.setValues({
                ...formik.values,
                hsnSacCode: selectedHsnCode,
                cgst: selectedHsnCode.cgstPercentage,
                sgst: selectedHsnCode.sgstPercentage,
                igst: selectedHsnCode.igstPercentage,
            });
        } else {
            getVendors();
        }
        if (selectedSacCode) {
            formik.setValues({
                ...formik.values,
                hsnSacCode: selectedSacCode,
                cgst: selectedSacCode.cgstPercentage,
                sgst: selectedSacCode.sgstPercentage,
                igst: selectedSacCode.igstPercentage,
            });
        }
    }, [selectedHsnCode, selectedSacCode]);

    const getSubCat = async (input) => {
        let path = `${endpoints.subCategory.index}`;
        let result = await search(input, path);
        setSubCategories(result.data.filter(subCategory => subCategory.isActive === true));
    }

    const handleGetCat = async (input) => {
        let path = `${endpoints.category.index}`;
        let result = await search(input, path);
        setCategories(result.data.filter(category => category.isActive === true));
    }

    const [isGoods, setIsGoods] = useState(null);

    const getHsnSacCodes = async (isHsn) => {
        let token = Cookies.get("accessToken");
        const hsnSacCodes = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL +
            endpoints.hsnSac.index +
            `?pageNo=0&pageSize=100&isHsn=${isHsn}&isActive=true&sortOn=createdBy&sortOrder=desc`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const {data: hsnSacCodesData} = await hsnSacCodes.json();
        setHsnSacCodes(hsnSacCodesData);
    }
    useEffect(() => {
        handleGetCat("")
    }, []);

    const handleRadioChange = (event) => {
        let value = event.target.value === "true"
        setIsGoods(value)
        formik.setFieldValue('hsnSacCode', ''); // Update Formik value
        getHsnSacCodes(value)
    }
    const handleRadioChangeThumbnail =(event, filePath) =>{
        setSelectedThumbnail(filePath);
        const updatedSelectedFiles = file.map((file) => ({
            ...file,
            filePurpose: file.filePath === filePath ? "thumbnail" : "file-purpose",
        }));
        setFile(updatedSelectedFiles);
    }
    return (
        <form>
            <Stack spacing={4}>
                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={4}>
                                <Typography variant="h6" sx={{display: "flex"}}>Vendor Name <Typography
                                    sx={{color: "red"}}>*</Typography></Typography>
                            </Grid>
                            <Grid xs={12} md={8}>
                                <Stack spacing={3}>
                                    <Autocomplete
                                        options={vendors}
                                        getOptionLabel={(option) => option.user.firstName + " " + option.user.lastName}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select vendor"
                                                error={formik.touched.vendor && Boolean(formik.errors.vendor)} // Repeat the error prop here
                                                helperText={formik.touched.vendor && formik.errors.vendor} // Repeat the helperText prop here
                                            />
                                        )}
                                        onChange={(event, value) => {
                                            formik.setFieldValue('vendor', value ? value.id : '');
                                        }}
                                        value={vendors.find(vendor => vendor.id === formik.values.vendor) || null}
                                    />

                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid xs={6} md={4}>
                                <Typography variant="h6" sx={{display: "flex"}}>Product Type <Typography
                                    sx={{color: "red"}}>*</Typography></Typography>
                            </Grid>
                            <Grid xs={6} md={8}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        onChange={handleRadioChange}
                                        value={String(isGoods)} // Convert the boolean to a string for RadioGroup value
                                        row
                                    >
                                        <FormControlLabel
                                            value={true}
                                            control={<Radio/>}
                                            label="Goods"
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio/>}
                                            label="Service"
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <Autocomplete
                                    options={hsnSacCodes}
                                    getOptionLabel={(option) => option.code}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={isGoods ? "Select HSN Code" : "Select SAC Code"}
                                            error={formik.touched.hsnSacCode && Boolean(formik.errors.hsnSacCode)}
                                            helperText={formik.touched.hsnSacCode && formik.errors.hsnSacCode}
                                        />
                                    )}
                                    onChange={(event, value) => {
                                        formik.setFieldValue('hsnSacCode', value ? value.id : ''); // Update Formik value
                                        setSelectedHsnCode(value);
                                    }}
                                    value={formik.values.hsnSacCode || null}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={4}>
                                <Typography variant="h6" sx={{display: "flex"}}>Product Category <Typography
                                    sx={{color: "red"}}>*</Typography></Typography>
                            </Grid>
                            <Grid xs={12} md={8}>
                                <Stack spacing={3}>
                                    <Autocomplete
                                        options={categories}
                                        name="categoryName"
                                        onInputChange={(event, newInputValue) => handleGetCat(newInputValue)}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select Product Category"
                                                error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                                                helperText={formik.touched.categoryName && formik.errors.categoryName}
                                            />
                                        )}
                                        onChange={(category, value) => {
                                            getSubCat(value?.id)
                                            formik.values.categoryName = value;
                                        }}
                                    />
                                    <Autocomplete
                                        options={subCategories}
                                        getOptionLabel={(option) => option.name}
                                        onInputChange={(event, newInputValue) => getSubCat(newInputValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select Product Sub-Category"
                                                error={formik.touched.subCategoryName && Boolean(formik.errors.subCategoryName)}
                                                helperText={formik.touched.subCategoryName && formik.errors.subCategoryName}
                                            />
                                        )}
                                        onChange={(event, value) => {
                                            formik.setFieldValue('subCategoryName', value ? value : ''); // Updated to use setFieldValue
                                        }}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid xs={12} md={4}>
                                <Typography variant="h6" sx={{display: "flex"}}>Product Details <Typography
                                    sx={{color: "red"}}>*</Typography></Typography>
                            </Grid>
                            <Grid xs={12} md={8}>
                                <Stack spacing={3}>
                                    <TextField
                                        error={!!(formik.touched.name && formik.errors.name)}
                                        fullWidth
                                        helperText={formik.touched.name && formik.errors.name}
                                        label="Product Title"
                                        name="name"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />

                                    <TextField
                                        name="description"
                                        label="Description"
                                        multiline
                                        rows={10}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        fullWidth
                                        error={!!(
                                            formik.touched.description && formik.errors.description
                                        )}
                                        helperText={
                                            formik.touched.description && formik.errors.description
                                        }
                                    />
                                </Stack>
                            </Grid>

                            <Grid xs={12} md={4}>
                                <Typography variant="h6">Product Tags</Typography>
                            </Grid>
                            <Grid xs={12} md={8}>
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Button
                                                        color="inherit"
                                                        sx={{ml: 2}}
                                                        onClick={() => {
                                                            if (!tag) {
                                                                return;
                                                            }
                                                            handleTagAdd(tag);
                                                            formik.setFieldValue("tags", [...formik.values.tags, tag]);
                                                            setTag(''); // Clear the input field
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                </InputAdornment>
                                            )
                                        }}
                                        label="Tags"
                                        name="tags"
                                        onChange={(event) => setTag(event.target.value)}
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                                event.preventDefault(); // Prevent form submission
                                                if (tag) {
                                                    handleTagAdd(tag);
                                                    formik.setFieldValue("tags", [...formik.values.tags, tag]);
                                                    setTag(''); // Clear the input field
                                                }
                                            }
                                        }}
                                        value={tag}
                                    />
                                    <Stack
                                        alignItems="center"
                                        direction="row"
                                        flexWrap="wrap"
                                        spacing={1}
                                    >
                                        {tags.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                onDelete={() => handleTagDelete(tag)}
                                                variant="outlined"
                                            />
                                        ))}
                                    </Stack>
                                    <div>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    defaultChecked={formik.values.inStock} // Set the default value
                                                    onChange={(event) => {
                                                        formik.setFieldValue("inStock", event.target.checked); // Update the formik field value
                                                    }}
                                                />
                                            }
                                            label="In Stock"
                                        />
                                    </div>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={4}>
                                <Typography variant="h6" sx={{display: "flex"}}>Event Category </Typography>
                            </Grid>
                            <Grid xs={12} md={8}>
                                <Stack spacing={3}>
                                    <Autocomplete
                                    options={availableEventCategories}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Event Categories"/>
                                    )}
                                    onChange={(event, value) => {
                                        if (value) {
                                            handleEventAdd(value);
                                        }
                                    }}
                                    // inputValue={''} // This sets the input value to an empty string
                                />
                                    <Stack
                                        alignItems="center"
                                        direction="row"
                                        flexWrap="wrap"
                                        spacing={1}
                                    >
                                        {selectedEvent.map((event) => (
                                            <Chip
                                                key={event.id}
                                                label={event.name}
                                                onDelete={() => {
                                                    handleEventDelete(event);
                                                }}
                                            />
                                        ))}
                                    </Stack></Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={4}>
                                <Typography variant="h6" sx={{display: "flex"}}>Product Pricing <Typography
                                    sx={{color: "red"}}>*</Typography></Typography>
                            </Grid>
                            <Grid container spacing={6} xs={12} md={7}>
                                <Grid item md={5}>
                                    <Stack spacing={3}>
                                        <TextField
                                            error={!!(formik.touched.vendorShare && formik.errors.vendorShare)}
                                            fullWidth
                                            helperText={formik.touched.vendorShare && formik.errors.vendorShare}
                                            label="Vendor Share"
                                            name="vendorShare"
                                            onBlur={formik.handleBlur}
                                            value={formik.values.vendorShare}
                                            onChange={formik.handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        ₹
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onKeyDown={(e) => {
                                                const allowedKeys = /^[0-9]*\.?[0-9]*$/;
                                                if (!(allowedKeys.test(e.key) || e.key === 'Backspace')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item md={5}>
                                    <Stack spacing={3}>
                                        <TextField
                                            error={!!(formik.touched.organizationShare && formik.errors.organizationShare)}
                                            fullWidth
                                            helperText={formik.touched.organizationShare && formik.errors.organizationShare}
                                            label="Organization Share"
                                            name="organizationShare"
                                            onBlur={formik.handleBlur}
                                            value={formik.values.organizationShare}
                                            onChange={formik.handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        ₹
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onKeyDown={(e) => {
                                                const allowedKeys = /^[0-9]*\.?[0-9]*$/;
                                                if (!(allowedKeys.test(e.key) || e.key === 'Backspace')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item md={5}>
                                    <Stack spacing={3}>
                                        <TextField
                                            error={!!(formik.touched.unitPrice && formik.errors.unitPrice)}
                                            fullWidth
                                            helperText={formik.touched.unitPrice && formik.errors.unitPrice}
                                            label="Unit Price"
                                            name="unitPrice"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={(parseFloat(formik.values.organizationShare || 0)) + (parseFloat(formik.values.vendorShare || 0))}
                                            disabled
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        ₹
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                    </Stack>
                                </Grid>
                                <Grid item md={5}>
                                    <Stack spacing={3}>
                                        <TextField
                                            error={!!(formik.touched.costPrice && formik.errors.costPrice)}
                                            fullWidth
                                            helperText={formik.touched.costPrice && formik.errors.costPrice}
                                            label="Cost Price"
                                            name="costPrice"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.costPrice}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        ₹
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onKeyDown={(e) => {
                                                const allowedKeys = /^[0-9]*\.?[0-9]*$/;
                                                if (!(allowedKeys.test(e.key) || e.key === 'Backspace')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />

                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={4}>
                                <Typography variant="h6" sx={{display: "flex"}}>GST <Typography
                                    sx={{color: "red"}}>*</Typography></Typography>
                            </Grid>
                            <Grid xs={12} md={2.5}>
                                <Stack spacing={3}>
                                    <TextField
                                        disabled={true}
                                        error={
                                            !!(formik.touched.sgst && formik.errors.sgst)
                                        }
                                        fullWidth
                                        helperText={
                                            formik.touched.sgst && formik.errors.sgst
                                        }
                                        label="SGST%"
                                        name="sgst"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.sgst}
                                    />
                                </Stack>
                            </Grid>
                            <Grid xs={12} md={2.5}>
                                <Stack spacing={3}>
                                    <TextField
                                        disabled={true}
                                        error={
                                            !!(
                                                formik.touched.cgst &&
                                                formik.errors.cgst
                                            )
                                        }
                                        fullWidth
                                        helperText={
                                            formik.touched.cgst &&
                                            formik.errors.cgst
                                        }
                                        label="CGST%"
                                        name="cgst"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.cgst}
                                    />
                                </Stack>
                            </Grid>
                            <Grid xs={12} md={2.5}>
                                <Stack spacing={3}>
                                    <TextField
                                        disabled={true}
                                        error={
                                            !!(
                                                formik.touched.igst &&
                                                formik.errors.igst
                                            )
                                        }
                                        fullWidth
                                        helperText={
                                            formik.touched.igst &&
                                            formik.errors.igst
                                        }
                                        label="IGST%"
                                        name="igst"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.igst}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={4}>
                                <Stack spacing={1}>
                                    <Typography variant="h6" sx={{display: "flex"}}>Product Images <Typography
                                        sx={{color: "red"}}>*</Typography></Typography>
                                </Stack>
                            </Grid>
                            <Grid xs={12} md={8}>
                                <FileDropzone
                                    maxFiles={4}
                                    accept={{"image/*": []}}
                                    caption="(SVG, JPG, PNG, or gif maximum 900x400)"
                                    files={files}
                                    file={file}
                                    onUpload={onUpload}
                                    onDrop={handleFilesDrop}
                                    onRemove={handleFileRemove}
                                    onRemoveAll={handleFilesRemoveAll}
                                />
                                {newFiles.map((file, index) => (
                                    <Grid mt={5} xs={12} md={8} sx={{ display: "flex", direction: "row", alignItems: "center", width: "100%", gap: "8px" }} key={file.filePath}>
                                        <RadioGroup
                                            name={`thumbnailRadio_${index}`} // Use the index as a unique identifier
                                            value={selectedThumbnail}
                                            onChange={(event) => handleRadioChangeThumbnail(event, file.filePath)} // Pass file.filePath
                                        >
                                            <FormControlLabel
                                                value={file.filePath}
                                                control={<Radio />}
                                            />
                                        </RadioGroup>
                                        <Card sx={{ width: "70px", height: "fitContent" }}>
                                            <CardMedia
                                                component="img"
                                                image={file.filePath}
                                                // alt={product?.name}
                                            />
                                        </Card>
                                        <Card></Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    spacing={1}
                >
                    <Button onClick={handleCancelDialogOpen}
                            color="error" size="small" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateDialogOpen} variant="contained">
                        Create
                    </Button>
                </Stack>
                <CommonDialog
                    title={"Create"}
                    onConfirm={() => {
                        Productsave();
                        handleCreateDialogClose();
                    }}
                    onClose={handleCreateDialogClose}
                    open={createDialogOpen}
                    description={"Are you sure you want to create ?"}
                />
                <CommonDialog
                    title={"Yes"}
                    onConfirm={() => {
                        router.push(paths.productManagement.products.index);
                        handleCancelDialogClose();
                    }}
                    onClose={handleCancelDialogClose}
                    open={cancelDialogOpen}
                    description={"Are you sure you want to Cancel ?"}
                />
            </Stack>
        </form>
    );
};
