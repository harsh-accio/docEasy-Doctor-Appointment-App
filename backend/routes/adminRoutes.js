import express from 'express'
import { addDoctor ,adminDashboard,adminLogin, allDoctor, appointmentCancel, appointmentsAdmin} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js';
import authAdmin  from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';

const adminRoutes = express.Router();

adminRoutes.post('/add-doctor',authAdmin ,upload.single('image'),addDoctor);
adminRoutes.post('/login',adminLogin)
adminRoutes.post('/all-doctor',authAdmin,allDoctor)
adminRoutes.post('/change-availability',authAdmin,changeAvailablity) 
adminRoutes.get('/appointments',authAdmin,appointmentsAdmin);
adminRoutes.post('/cancel-appointment',authAdmin,appointmentCancel);
adminRoutes.get('/dashboard',authAdmin,adminDashboard); 

export {adminRoutes};
