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
export const createDonations = createAsyncThunk<any, any>(
   'donations/createDonations',
   async (data) => {
      await axios
         .post(`${config.apiUrl}/donations/create-donation`, {
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
   },
);

//fetch all
export const fetchDonations = createAsyncThunk<any, any>('donations/fetchDonations', async () => {
   const res: { data: IResponseData } = await axios.get(`${config.apiUrl}/donations`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
   });
   return res.data.data;
});

//fetch by id
export const fetchDonationById = createAsyncThunk<any, string>(
   'donations/fetchDonationById',
   async (id) => {
      const res: { data: IResponseData } = await axios.get(`${config.apiUrl}/donations/${id}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
      });
      return res.data.data;
   },
);

//update
export const updateDonations = createAsyncThunk<any, any>(
   'donations/updateDonations',
   async (data: any) => {
      await axios
         .patch(`${config.apiUrl}/donations/${data.id}`, {
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
   },
);

//delete
export const deleteDonations = createAsyncThunk<any, string>(
   'donations/deleteDonations',
   async (id) => {
      await axios
         .delete(`${config.apiUrl}/donations/${id}`, {
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
   },
);

type donationType = {
   isLoading: boolean;
   donations: any[];
   singleDonations: object;
   error: null | string;
};

const initialDonationState: donationType = {
   isLoading: false,
   donations: [],
   singleDonations: {},
   error: null,
};

const donationSlice = createSlice({
   name: 'photoFolders',
   initialState: initialDonationState,
   reducers: {},
   extraReducers: (builder) => {
      //add case for create donor
      builder.addCase(createDonations.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(createDonations.fulfilled, (state, action: PayloadAction<any>) => {
         state.isLoading = false;
         state.donations = [...state.donations, action.payload];
         state.error = null;
      });

      //add case for fetch all donations
      builder.addCase(fetchDonations.pending, (state) => {
         state.isLoading = true;
      });

      builder.addCase(fetchDonations.fulfilled, (state, action: PayloadAction<any[]>) => {
         state.isLoading = false;
         state.donations = action.payload;
         state.error = null;
      });

      builder.addCase(fetchDonations.rejected, (state, action) => {
         state.isLoading = false;
         state.donations = [];
         state.error = action.error.message || 'Something Went Wrong';
      });

      //add case for fetch donor by id
      builder.addCase(fetchDonationById.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(fetchDonationById.fulfilled, (state, action: PayloadAction<any>) => {
         state.isLoading = false;
         state.singleDonations = action.payload;
         state.error = null;
      });
      builder.addCase(fetchDonationById.rejected, (state, action) => {
         state.isLoading = false;
         state.singleDonations = {};
         state.error = action.error.message || 'Something Went Wrong';
      });

      //add case for update donor
      builder.addCase(updateDonations.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(updateDonations.fulfilled, (state, action: PayloadAction<any>) => {
         state.isLoading = false;
         state.donations = [...state.donations, action.payload];
         state.error = null;
      });

      //add case for delete donor
      builder.addCase(deleteDonations.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(deleteDonations.fulfilled, (state, action: PayloadAction<any>) => {
         state.isLoading = false;
         state.donations = [...state.donations, action.payload];
         state.error = null;
      });
   },
});

export default donationSlice.reducer;
