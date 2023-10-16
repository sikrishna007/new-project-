import {useRouter} from "next/navigation";
import * as React from "react";
import {useCallback, useState} from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {useFormik} from "formik";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import {ToastError} from "@/icons/ToastError";
import {endpoints} from "@/endpoints";
import {paths} from "@/paths";
import CommonDialog from "@/custom-components/CommonDialog";

export const ProductEditForm = (props) => {
    const {product, vendor} = props;
    const router = useRouter();
    const [files, setFiles] = useState([]);
    const [hsnSacCodes, setHsnSacCodes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [eventCategories, setEventCategories] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState([...product?.eventCategories]);
    const [availableEventCategories, setAvailableEventCategories] = useState([]);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([...product?.tags]);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
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

    // const handleEventAdd = useCallback((tag) => {
    //     setSelectedEvent((prevState) => {
    //         return [...prevState, tag];
    //     });
    // }, []);

    const handleTagDelete = useCallback((tag) => {
        setTags((prevState) => {
            return prevState.filter((t) => t !== tag);
        });
    }, []);
    const handleEvenDelete = useCallback((event) => {
        // console.log(selectedEvent);
        setSelectedEvent((prevState) => {
            return prevState.filter((t) => t !== event);
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

    const vaidation = (formik) => {
        const newArray = selectedEvent.map((obj) => ({id: obj.id}));
        formik.values.eventCategories = newArray
        formik.values.tags = tags
        if (Object.keys(formik.errors).length > 0) {
            toast.error("Please fill in all the required fields", {
                position: "top-right",
                style: {
                    backgroundColor: "#D65745",
                },
                icon: <ToastError/>,
            });
        } else {
            submitProduct(formik)
        }
    }
    const submitProduct = async (formik, helpers) => {

        try {
            let token = Cookies.get("accessToken")
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + endpoints.product.index + "/" + product?.id,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        name: formik.values.name
                            .toLowerCase()
                            .split(' ')
                            .map(word=>word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' '),
                        isGoods: formik.values.isGoods,
                        offeringSubCategories: formik.values.subCategoryName,
                        longDescription: formik.values.description,
                        vendorPrice: formik.values.vendorShare,
                        unitPrice: (parseFloat(formik.values.organizationShare || 0)) + (parseFloat(formik.values.vendorShare || 0)),
                        discountPrice: formik.values.costPrice,
                        hsnSacCode: {id:formik.values.hsnSacCode.id},
                        tags: formik.values.tags,
                        inStock: formik.values.inStock,
                        eventCategories: formik.values.eventCategories,
                        unitOfMeasurement: formik.unitOfMeasurement
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
            });
        }
    }


    const formik = useFormik({
        initialValues: {
            barcode: "",
            vendorPrice: "",
            categoryName: product.offeringSubCategories?.offeringCategories || "",
            subCategoryName: product.offeringSubCategories || "",
            description: product?.longDescription || "",
            eventCategories: [],
            images: [],
            name: product?.name || "",
            vendor: product?.vendor || "",
            tags: product?.tags || "",
            cgst: product?.hsnSacCode.cgstPercentage || "",
            sgst: product?.hsnSacCode.sgstPercentage || "",
            igst: product?.hsnSacCode.igstPercentage || "",
            hsnSacCode: product?.hsnSacCode || "",
            vendorShare: product?.vendorPrice || "",
            organizationShare: (product?.unitPrice - product?.vendorPrice) || "",
            newPrice: "",
            costPrice: product?.discountPrice || "",
            sku: "",
            submit: null,
            isGoods: product.isGoods,
            unitOfMeasurement: product.unitOfMeasurement || "",
            unitPrice: "",
            discountPrice: "",
            inStock: product?.inStock,
        },
        validationSchema: Yup.object({
            categoryName: Yup.object().required(),
            subCategoryName: Yup.object().required(),
            description: Yup.string().max(5000),
            images: Yup.array(),
            name: Yup.string().max(45).required().matches(/^[A-Za-z ]+$/, 'Product name should only contain alphabets'),
            vendorShare: Yup.number().required(),
            organizationShare: Yup.number().required(),
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

    const getVendors = async () => {
        try {
            let token = Cookies.get("accessToken");


            const hsnSacCodes = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.hsnSac.index +
                `?pageNo=0&pageSize=50&isActive=true&sortOn=createdBy&sortOrder=desc`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const {data: hsnSacCodesData} = await hsnSacCodes.json();
            setHsnSacCodes(hsnSacCodesData);


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
            setEventCategories(eventCategoriesData);


            const categories = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + endpoints.category.index +
                `?pageNo=0&pageSize=50&isActive=true&sortOn=createdBy&sortOrder=desc`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const {data: categoryData} = await categories.json();
            setCategories(categoryData);
        } catch (err) {
            console.error(err);
        }
    };

    const [selectedHsnCode, setSelectedHsnCode] = useState(null);
    const [selectedSacCode, setSelectedSacCode] = useState(null);
    const [changeInCategory, setChangeInCategory] = useState(null);

    const [code, setCode] = useState({
        id: 1,
        code: formik.values.hsnSacCode,
    })
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
    }, [selectedHsnCode, selectedSacCode, changeInCategory]);

    React.useEffect(() => {
        // Fetch and set availableEventCategories initially
        const fetchAvailableEventCategories = async () => {
            try {
                let token = Cookies.get("accessToken");
                const eventCategoriesResponse = await fetch(
                    process.env.NEXT_PUBLIC_BASE_URL + endpoints.eventCategories.index +
                    `?pageNo=0&pageSize=50&isActive=true&sortOn=createdBy&sortOrder=desc`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const {data: eventCategoriesData} = await eventCategoriesResponse.json();
                setAvailableEventCategories(eventCategoriesData);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAvailableEventCategories();
    }, []);

    const getSubCat = async (id) => {

        let token = Cookies.get("accessToken");
        // console.log(id);

        const subCategories = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + endpoints.category.index + "/" + id + "/" + endpoints.subCategory.index,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const {data: subCategoryData} = await subCategories.json();
        setSubCategories(subCategoryData);
    }

    const [isGoods, setIsGoods] = useState(formik.values.isGoods); // State to track the selected radio option
    const [showHSNDropdown, setShowHSNDropdown] = useState(isGoods);
    const [showSACDropdown, setShowSACDropdown] = useState(!isGoods);


    const handleRadioChange = (event) => {
        const selectedValue = event.target.value ;
        setIsGoods(selectedValue);
        setShowHSNDropdown(selectedValue); // Show HSN dropdown for "Goods"
        setShowSACDropdown(!selectedValue); // Show SAC dropdown for "Service"
    };

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
                                <Stack sx={{ border: '1px solid #ccc',padding: '15px',borderRadius:"5px" }} spacing={3}>
                                    <Typography variant="h6">{vendor.user?.firstName} </Typography>
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

                                {showHSNDropdown && (
                                    <Autocomplete
                                        options={hsnSacCodes}
                                        getOptionLabel={(option) => option.code}
                                        value={formik.values.hsnSacCode}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Select Hsn Codes"/>
                                        )}
                                        onChange={(event, value) => {
                                            setSelectedHsnCode(value);
                                        }}
                                    />
                                )}

                                {showSACDropdown && (
                                    <Autocomplete
                                        options={hsnSacCodes}
                                        getOptionLabel={(option) => option.code}
                                        value={formik.values.hsnSacCode}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Select SAC Codes"/>
                                        )}
                                        onChange={(event, value) => {
                                            setSelectedSacCode(value);
                                        }}
                                    />
                                )}
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
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Select Product Category"/>
                                        )}
                                        value={formik.values.categoryName !="undefined" ? formik.values.categoryName : ""}  // Set the default value here
                                        onChange={(category, value) => {
                                            getSubCat(value?.id)
                                            formik.values.categoryName = value;
                                            formik.setFieldValue("subCategoryName", []);
                                            console.log(formik.values)

                                        }}
                                    />

                                    <Autocomplete
                                        options={subCategories}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Select Product Sub-Category"/>
                                        )}
                                        value={formik.values.subCategoryName  !="undefined" ? formik.values.subCategoryName : ""}
                                        onChange={(subCategory, value) => {
                                            formik.setFieldValue("subCategoryName", value);


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
                                            formik.touched.description &&formik.errors.description
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
                                                            setTag('');
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
                                <Typography variant="h6" sx={{display: "flex"}}>Event Category <Typography
                                    sx={{color: "red"}}>*</Typography></Typography>
                            </Grid>
                            <Grid xs={12} md={8}>
                                <Autocomplete
                                    // options={eventCategories}
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
                                />
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    flexWrap="wrap"
                                    spacing={2}
                                    sx={{marginTop: "3%"}}
                                >
                                    <div>
                                        {selectedEvent.map((event) => (
                                            <Chip
                                                key={event.id}
                                                label={event.name}
                                                onDelete={() => {
                                                    handleEventDelete(event);
                                                }}
                                            />
                                        ))}
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
                                            onChange={formik.handleChange}InputProps={{
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
                                {/*<FileDropzone*/}
                                {/*    accept={{"image/*": []}}*/}
                                {/*    caption="(SVG, JPG, PNG, or gif maximum 900x400)"*/}
                                {/*    files={files}*/}
                                {/*    onDrop={handleFilesDrop}*/}
                                {/*    onRemove={handleFileRemove}*/}
                                {/*    onRemoveAll={handleFilesRemoveAll}*/}
                                {/*/>*/}
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
                        Discard
                    </Button>
                    <Button onClick={handleCreateDialogOpen} variant="contained">
                        Save Changes
                    </Button>
                </Stack>
                <CommonDialog
                    title={"Save"}
                    onConfirm={() => {
                        vaidation(formik);
                        handleCreateDialogClose();
                    }}
                    onClose={handleCreateDialogClose}
                    open={createDialogOpen}
                    description={"Are you sure you want to Change Details ?"}
                />
                <CommonDialog
                    title={"Yes"}
                    onConfirm={() => {
                        router.push(paths.productManagement.products.index);
                        handleCancelDialogClose();
                    }}
                    onClose={handleCancelDialogClose}
                    open={cancelDialogOpen}
                    description={"Are you sure you want to Discard ?"}
                />
            </Stack>
        </form>
    );
};