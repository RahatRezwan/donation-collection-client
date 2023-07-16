/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../config';

type IResponseData = {
   statusCode: number;
   success: boolean;
   message?: string | null;
   meta?: {
      page: number;
      limit: number;
      total: number;
   } | null;
   data?: any;
};

type IErrorMessage = {
   path: string | number;
   message: string;
};

type IErrorResponse = {
   statusCode: number;
   message: string;
   errorMessages: IErrorMessage[];
};

//create
export const createDonor = createAsyncThunk<any, any>('donors/createDonor', async (data) => {
   await axios
      .post(`${config.apiUrl}/user/create-donor`, data)
      .then((res: { data: IResponseData }) => {
         if (res.data.success === true) {
            toast.success(res.data.message);
            return res.data.data;
         }
      })
      .catch((err: { response: { data: IErrorResponse } }) => {
         if (err.response) {
            const errorResponse: IErrorResponse = err.response.data;
            errorResponse.errorMessages.forEach((error) => {
               toast.error(error.message);
            });
         }
      });
});

//fetch all
export const fetchDonors = createAsyncThunk('donors/fetchDonors', async () => {
   const res: { data: IResponseData } = await axios.get(`${config.apiUrl}/donors`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
   });
   return res.data.data;
});

//fetch by id
export const fetchDonorById = createAsyncThunk<any, string>('donors/fetchDonorById', async (id) => {
   const res: { data: IResponseData } = await axios.get(`${config.apiUrl}/donors/${id}`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
   });
   return res.data.data;
});

//update
export const updateDonor = createAsyncThunk<any, any>('donors/updateDonor', async (data: any) => {
   await axios
      .patch(`${config.apiUrl}/donors/${data.id}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
         data,
      })
      .then((res: { data: IResponseData }) => {
         if (res.data.success === true) {
            toast.success(res.data.message);
            return res.data.data;
         }
      })
      .catch((err: { response: { data: IErrorResponse } }) => {
         if (err.response) {
            const errorResponse: IErrorResponse = err.response.data;
            errorResponse.errorMessages.forEach((error) => {
               toast.error(error.message);
            });
         }
      });
});

//delete
export const deleteDonor = createAsyncThunk<any, string>('donors/deleteDonor', async (id) => {
   await axios
      .delete(`${config.apiUrl}/donors/${id}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
      })
      .then((res: { data: IResponseData }) => {
         if (res.data.success === true) {
            toast.success(res.data.message);
            return res.data.data;
         }
      })
      .catch((err: { response: { data: IErrorResponse } }) => {
         if (err.response) {
            const errorResponse: IErrorResponse = err.response.data;
            errorResponse.errorMessages.forEach((error) => {
               toast.error(error.message);
            });
         }
      });
});

type donorType = {
   isLoading: boolean;
   donors: any[];
   singleDonor: object;
   error: null | string;
};

const initialDonorState: donorType = {
   isLoading: false,
   donors: [],
   singleDonor: {},
   error: null,
};

const donorSlice = createSlice({
   name: 'photoFolders',
   initialState: initialDonorState,
   reducers: {},
   extraReducers: (builder) => {
      //add case for create donor
      builder.addCase(createDonor.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(createDonor.fulfilled, (state, action: PayloadAction<any>) => {
         state.isLoading = false;
         state.donors = [...state.donors, action.payload];
         state.error = null;
      });

      //add case for fetch all donors
      builder.addCase(fetchDonors.pending, (state) => {
         state.isLoading = true;
      });

      builder.addCase(fetchDonors.fulfilled, (state, action: PayloadAction<any[]>) => {
         state.isLoading = false;
         state.donors = action.payload;
         state.error = null;
      });

      builder.addCase(fetchDonors.rejected, (state, action) => {
         state.isLoading = false;
         state.donors = [];
         state.error = action.error.message || 'Something Went Wrong';
      });

      //add case for fetch donor by id
      builder.addCase(fetchDonorById.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(fetchDonorById.fulfilled, (state, action: PayloadAction<any>) => {
         state.isLoading = false;
         state.singleDonor = action.payload;
         state.error = null;
      });
      builder.addCase(fetchDonorById.rejected, (state, action) => {
         state.isLoading = false;
         state.singleDonor = {};
         state.error = action.error.message || 'Something Went Wrong';
      });

      //add case for update donor
      builder.addCase(updateDonor.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(updateDonor.fulfilled, (state, action: PayloadAction<any>) => {
         state.isLoading = false;
         state.donors = [...state.donors, action.payload];
         state.error = null;
      });

      //add case for delete donor
      builder.addCase(deleteDonor.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(deleteDonor.fulfilled, (state, action: PayloadAction<any>) => {
         state.isLoading = false;
         state.donors = [...state.donors, action.payload];
         state.error = null;
      });
   },
});

export default donorSlice.reducer;
